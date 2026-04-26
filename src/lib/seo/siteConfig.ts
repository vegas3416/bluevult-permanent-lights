export const SITE_URL = "https://bluevultlighting.com";

/** Default Open Graph / Twitter preview image (absolute URL). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const BUSINESS_NAME = "BlueVult Lighting";
export const BUSINESS_PHONE = "+1-512-461-1926";
export const BUSINESS_EMAIL = "info@bluevultlighting.com";

/** Official Google Business / profile link (share link is fine). Env overrides when set. */
const DEFAULT_GOOGLE_BUSINESS_URL = "https://share.google/4mnKfvIn68KupN73T";
const envGoogleBusiness = (import.meta.env.VITE_GOOGLE_BUSINESS_URL as string | undefined)?.trim();
export const GOOGLE_BUSINESS_URL =
  envGoogleBusiness && envGoogleBusiness.length > 0
    ? envGoogleBusiness
    : DEFAULT_GOOGLE_BUSINESS_URL;

/** Graph API Page id (from `me/accounts`), used by the Facebook gallery sync Edge Function default. */
export const FACEBOOK_GRAPH_PAGE_ID = "1061760347010857";

/** Public Facebook page. Env overrides when set. */
const DEFAULT_FACEBOOK_PAGE_URL = "https://www.facebook.com/profile.php?id=61588490398932";
const envFacebookPage = (import.meta.env.VITE_FACEBOOK_PAGE_URL as string | undefined)?.trim();
export const FACEBOOK_PAGE_URL =
  envFacebookPage && envFacebookPage.length > 0 ? envFacebookPage : DEFAULT_FACEBOOK_PAGE_URL;

/** Optional: Google Maps “Embed a map” iframe `src` URL for the /gallery page. */
export const GOOGLE_MAPS_EMBED_URL =
  (import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL as string | undefined)?.trim() ?? "";

export const CENTRAL_TEXAS_CITIES = [
  "Pflugerville",
  "Austin",
  "Round Rock",
  "Georgetown",
  "Jarrell",
  "Salado",
  "Buda",
  "Kyle",
  "Cedar Park",
  "Leander",
  "Lago Vista",
  "Westlake",
  "Hutto",
  "Manor",
  "Taylor",
  "Lakeway",
  "Bee Cave",
  "Wells Branch",
  "Brushy Creek",
  "Manchaca",
  "Sunset Valley",
] as const;

export type ServiceAreaCity = {
  name: string;
  slug: string;
  featured: boolean;
};

export const SERVICE_AREA_CITIES: ServiceAreaCity[] = CENTRAL_TEXAS_CITIES.map((name) => {
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const featured = ["austin", "round-rock", "pflugerville", "cedar-park", "leander"].includes(slug);
  return { name, slug, featured };
});

