import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GALLERY_ITEMS, type GalleryItem } from "@/lib/gallery/galleryItems";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type FbGalleryRow = {
  fb_photo_id: string;
  image_url: string;
  created_time: string | null;
};

export type DisplayGalleryItem = GalleryItem & {
  rowKey: string;
};

function formatPhotoCaption(createdTime: string | null) {
  if (!createdTime) return "Project photo";
  try {
    return new Date(createdTime).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Project photo";
  }
}

export function useGalleryImages() {
  const fbQuery = useQuery({
    queryKey: ["gallery", "facebook"],
    queryFn: async (): Promise<FbGalleryRow[]> => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from("gallery_facebook_photos")
        .select("fb_photo_id,image_url,created_time")
        .order("created_time", { ascending: false });
      if (error) throw error;
      return (data ?? []) as FbGalleryRow[];
    },
    enabled: isSupabaseConfigured && supabase !== null,
    staleTime: 60_000,
  });

  const items: DisplayGalleryItem[] = useMemo(() => {
    const rows = fbQuery.data;
    if (!rows || rows.length === 0) {
      return GALLERY_ITEMS.map((item) => ({ ...item, rowKey: item.src }));
    }

    const deduped = new Map<string, DisplayGalleryItem>();
    for (const row of rows) {
      if (!row.image_url || deduped.has(row.image_url)) continue;
      deduped.set(row.image_url, {
        rowKey: row.fb_photo_id,
        src: row.image_url,
        alt: `BlueVult project photo ${formatPhotoCaption(row.created_time)}`,
        caption: formatPhotoCaption(row.created_time),
      });
    }
    return Array.from(deduped.values());
  }, [fbQuery.data]);

  const usingFacebook = Boolean(fbQuery.data && fbQuery.data.length > 0);
  const initialLoad = Boolean(isSupabaseConfigured && fbQuery.isLoading);

  return {
    items,
    usingFacebook,
    initialLoad,
    isError: fbQuery.isError,
  };
}
