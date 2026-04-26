export const SITE_URL = "https://bluevultlighting.com";

/** Default Open Graph / Twitter preview image (absolute URL). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const BUSINESS_NAME = "BlueVult Lighting";
export const BUSINESS_PHONE = "+1-512-461-1926";
export const BUSINESS_EMAIL = "info@bluevultlighting.com";

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

