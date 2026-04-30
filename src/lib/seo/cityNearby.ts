import type { ServiceAreaCity } from "./siteConfig";
import { serviceAreaCityBySlug } from "./siteConfig";

/** Adjacent / related service-area slugs for internal linking on city landing pages. */
const nearbyMap: Record<string, string[]> = {
  austin: ["round-rock", "cedar-park", "leander"],
  "round-rock": ["austin", "pflugerville", "cedar-park"],
  pflugerville: ["austin", "round-rock", "hutto"],
  "cedar-park": ["austin", "leander", "round-rock"],
  leander: ["cedar-park", "austin", "georgetown"],
  georgetown: ["leander", "round-rock", "hutto"],
  hutto: ["pflugerville", "round-rock", "georgetown"],
  kyle: ["buda", "austin", "bee-cave"],
  buda: ["kyle", "austin", "bee-cave"],
  "bee-cave": ["austin", "lakeway", "westlake"],
  lakeway: ["bee-cave", "austin", "westlake"],
  "lago-vista": ["leander", "cedar-park", "austin"],
  taylor: ["round-rock", "hutto", "georgetown"],
  manor: ["austin", "pflugerville", "taylor"],
  "wells-branch": ["austin", "pflugerville", "round-rock"],
  "brushy-creek": ["round-rock", "cedar-park", "hutto"],
  manchaca: ["austin", "buda", "sunset-valley"],
  "sunset-valley": ["austin", "manchaca", "westlake"],
  westlake: ["austin", "bee-cave", "lakeway"],
  jarrell: ["georgetown", "salado", "taylor"],
  salado: ["jarrell", "georgetown", "taylor"],
};

const defaultNearbyPool = ["austin", "round-rock", "pflugerville", "cedar-park", "leander"] as const;

export function nearbySlugsFor(citySlug: string): string[] {
  const mapped = nearbyMap[citySlug];
  if (mapped?.length) return mapped;
  return defaultNearbyPool.filter((s) => s !== citySlug).slice(0, 3);
}

export function nearbyCitiesResolved(slug: string): ServiceAreaCity[] {
  return nearbySlugsFor(slug)
    .map((s) => serviceAreaCityBySlug(s))
    .filter((c): c is ServiceAreaCity => Boolean(c));
}
