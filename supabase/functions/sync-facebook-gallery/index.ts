/**
 * POST with header: x-gallery-sync-secret: <GALLERY_SYNC_SECRET>
 *
 * Supabase secrets (Dashboard → Edge Functions → Secrets):
 *   GALLERY_SYNC_SECRET          — shared secret for this endpoint
 *   FACEBOOK_PAGE_ACCESS_TOKEN   — long-lived Page access token from Graph API
 *   FACEBOOK_PAGE_ID            — optional; defaults to BlueVult Page id below
 *
 * SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically in Edge Functions.
 *
 * After deploy: curl -X POST "$SUPABASE_URL/functions/v1/sync-facebook-gallery" \
 *   -H "Authorization: Bearer $ANON_KEY" \
 *   -H "x-gallery-sync-secret: $GALLERY_SYNC_SECRET"
 *
 * Schedule the same request weekly (e.g. GitHub Action, cron) so new Facebook posts appear on the site.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const GRAPH_VERSION = "v25.0";
const DEFAULT_PAGE_ID = "1061760347010857";

type GraphPhoto = {
  id: string;
  created_time?: string;
  images?: { source: string; width: number; height: number }[];
};

function pickLargestImage(images: GraphPhoto["images"]): {
  source: string;
  width: number;
  height: number;
} | null {
  if (!images?.length) return null;
  return images.reduce((best, cur) => (cur.width > best.width ? cur : best));
}

Deno.serve(async (req) => {
  if (req.method !== "POST")
    return new Response(JSON.stringify({ error: "Use POST" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });

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

  const collected: GraphPhoto[] = [];
  let url =
    `https://graph.facebook.com/${GRAPH_VERSION}/${pageId}/photos?fields=id,created_time,images&limit=100&access_token=${encodeURIComponent(pageAccessToken)}`;

  for (let page = 0; page < 5 && url; page++) {
    const res = await fetch(url);
    const body = (await res.json()) as {
      data?: GraphPhoto[];
      paging?: { next?: string };
      error?: { message: string };
    };

    if (!res.ok || body.error) {
      return new Response(
        JSON.stringify({
          error: "Graph API error",
          detail: body.error?.message ?? await res.text(),
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    if (body.data?.length) collected.push(...body.data);
    url = body.paging?.next ?? "";
  }

  let upserted = 0;
  for (const p of collected) {
    const img = pickLargestImage(p.images);
    if (!img) continue;

    const { error } = await supabase.from("gallery_facebook_photos").upsert(
      {
        fb_photo_id: p.id,
        image_url: img.source,
        width: img.width,
        height: img.height,
        created_time: p.created_time ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "fb_photo_id" }
    );

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    upserted += 1;
  }

  return new Response(
    JSON.stringify({
      ok: true,
      page_id: pageId,
      fetched: collected.length,
      upserted,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
});
