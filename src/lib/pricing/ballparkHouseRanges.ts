/** Residential ballpark ranges (USD). Same brackets for single- and multi-story; multi-story copy adds caveats in UI. */
export type HouseScope = "front" | "front_sides" | "full";

export function getHouseBallparkRange(scope: HouseScope): readonly [number, number] {
  switch (scope) {
    case "front":
      return [1750, 3500];
    case "front_sides":
      return [2200, 5200];
    case "full":
      return [3400, 7500];
  }
}

export function formatUsdRange(low: number, high: number): string {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  return `${fmt(low)} – ${fmt(high)}`;
}
