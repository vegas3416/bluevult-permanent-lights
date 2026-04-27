/**
 * POST with header: x-gallery-sync-secret: <GALLERY_SYNC_SECRET>
 *
 * Supabase secrets (Dashboard -> Edge Functions -> Secrets):
 *   GALLERY_SYNC_SECRET          shared secret for this endpoint
 *   FACEBOOK_PAGE_ACCESS_TOKEN   long-lived Page access token from Graph API
 *   FACEBOOK_PAGE_ID             optional; defaults to BlueVult Page id below
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const GRAPH_VERSION = "v25.0";
const DEFAULT_PAGE_ID = "1061760347010857";

type GraphImage = { source: string; width: number; height: number };

type GraphPhoto = {
  id: string;
  created_time?: string;
  images?: GraphImage[];
};

type GraphAttachment = {
  media?: { image?: GraphImage };
  subattachments?: { data?: GraphAttachment[] };
};

type GraphPost = {
  id: string;
  created_time?: string;
  attachments?: { data?: GraphAttachment[] };
};

type GraphAlbum = {
  id: string;
  name?: string;
};

function pickLargestImage(images: GraphImage[] | undefined): GraphImage | null {
  if (!images?.length) return null;
  return images.reduce((best, cur) => (cur.width > best.width ? cur : best));
}


function normalizeImageUrl(raw: string): string {
  try {
    const u = new URL(raw);
    // Facebook image URLs often differ only by signed query params; dedupe by origin+path.
    return `${u.origin}${u.pathname}`;
  } catch {
    return raw;
  }
}

function collectImagesFromAttachment(att: GraphAttachment, sink: GraphImage[]) {
  const img = att.media?.image;
  if (img?.source) sink.push(img);
  for (const child of att.subattachments?.data ?? []) {
    collectImagesFromAttachment(child, sink);
  }
}

async function fetchAllPages<T>(firstUrl: string, maxPages = 10): Promise<T[]> {
  const all: T[] = [];
  let url = firstUrl;

  for (let page = 0; page < maxPages && url; page++) {
    const res = await fetch(url);
    const body = (await res.json()) as {
      data?: T[];
      paging?: { next?: string };
      error?: { message: string };
    };

    if (!res.ok || body.error) {
      throw new Error(body.error?.message ?? `Graph API request failed (${res.status})`);
    }

    if (body.data?.length) all.push(...body.data);
    url = body.paging?.next ?? "";
  }

  return all;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Use POST" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const syncSecret = Deno.env.get("GALLERY_SYNC_SECRET");
  const sent = req.headers.get("x-gallery-sync-secret");
  if (!syncSecret || sent !== syncSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const pageAccessToken = Deno.env.get("FACEBOOK_PAGE_ACCESS_TOKEN")?.trim();
  const pageId = Deno.env.get("FACEBOOK_PAGE_ID")?.trim() || DEFAULT_PAGE_ID;
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!pageAccessToken) {
    return new Response(JSON.stringify({ error: "FACEBOOK_PAGE_ACCESS_TOKEN not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!supabaseUrl || !serviceKey) {
    return new Response(JSON.stringify({ error: "Supabase env missing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const now = new Date().toISOString();

  try {
    // 1) Direct photo objects from the Page
    const photosUrl =
      `https://graph.facebook.com/${GRAPH_VERSION}/${pageId}/photos?fields=id,created_time,images&limit=100&access_token=${encodeURIComponent(pageAccessToken)}`;
    const photos = await fetchAllPages<GraphPhoto>(photosUrl, 10);

    // 2) Images embedded in Page posts (captures multi-photo posts)
    const postsUrl =
      `https://graph.facebook.com/${GRAPH_VERSION}/${pageId}/posts?fields=id,created_time,attachments{media,subattachments{media}}&limit=100&access_token=${encodeURIComponent(pageAccessToken)}`;
    const posts = await fetchAllPages<GraphPost>(postsUrl, 10);

    // 3) Album photos (often where older page images live)
    const albumsUrl =
      `https://graph.facebook.com/${GRAPH_VERSION}/${pageId}/albums?fields=id,name&limit=100&access_token=${encodeURIComponent(pageAccessToken)}`;
    const albums = await fetchAllPages<GraphAlbum>(albumsUrl, 10);

    const payload: Array<{
      fb_photo_id: string;
      image_url: string;
      width: number | null;
      height: number | null;
      created_time: string | null;
      updated_at: string;
    }> = [];

    for (const p of photos) {
      const img = pickLargestImage(p.images);
      if (!img) continue;
      payload.push({
        fb_photo_id: `photo:${p.id}`,
        image_url: img.source,
        width: img.width,
        height: img.height,
        created_time: p.created_time ?? null,
        updated_at: now,
      });
    }

    for (const post of posts) {
      const found: GraphImage[] = [];
      for (const att of post.attachments?.data ?? []) {
        collectImagesFromAttachment(att, found);
      }

      found.forEach((img, idx) => {
        payload.push({
          fb_photo_id: `post:${post.id}:${idx}`,
          image_url: img.source,
          width: img.width ?? null,
          height: img.height ?? null,
          created_time: post.created_time ?? null,
          updated_at: now,
        });
      });
    }



    for (const album of albums) {
      const albumPhotosUrl =
        `https://graph.facebook.com/${GRAPH_VERSION}/${album.id}/photos?fields=id,created_time,images&limit=100&access_token=${encodeURIComponent(pageAccessToken)}`;
      const albumPhotos = await fetchAllPages<GraphPhoto>(albumPhotosUrl, 5);
      for (const p of albumPhotos) {
        const img = pickLargestImage(p.images);
        if (!img) continue;
        payload.push({
          fb_photo_id: `album:${album.id}:photo:${p.id}` ,
          image_url: img.source,
          width: img.width,
          height: img.height,
          created_time: p.created_time ?? null,
          updated_at: now,
        });
      }
    }

    // Dedupe by image URL before writing
    const uniqueByUrl = new Map<string, (typeof payload)[number]>();
    for (const row of payload) {
      const key = normalizeImageUrl(row.image_url);
      const existing = uniqueByUrl.get(key);
      if (!existing) {
        uniqueByUrl.set(key, row);
      } else {
        const existingTime = existing.created_time ? Date.parse(existing.created_time) : 0;
        const rowTime = row.created_time ? Date.parse(row.created_time) : 0;
        if (rowTime > existingTime) uniqueByUrl.set(key, row);
      }
    }

    // Replace rows each run so duplicates from prior strategies do not accumulate.
    const { error: wipeError } = await supabase
      .from("gallery_facebook_photos")
      .delete()
      .neq("fb_photo_id", "");
    if (wipeError) throw new Error(wipeError.message);

    const rows = Array.from(uniqueByUrl.values());
    if (rows.length > 0) {
      const { error: insertError } = await supabase
        .from("gallery_facebook_photos")
        .insert(rows);
      if (insertError) throw new Error(insertError.message);
    }

    return new Response(
      JSON.stringify({
        ok: true,
        page_id: pageId,
        fetched_photos: photos.length,
        fetched_posts: posts.length,
        fetched_albums: albums.length,
        unique_images: uniqueByUrl.size,
        inserted: rows.length,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Sync failed",
        detail: err instanceof Error ? err.message : String(err),
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
});
