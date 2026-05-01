import certifiedBadge from "@/assets/Certified-Badge.png";
import { cn } from "@/lib/utils";

type CertifiedWattsBadgeProps = {
  /** sm: footer · md: contact / small cards · lg: dense layouts · xl: home & about trust sections */
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

/**
 * Watts certified partner badge — use near CTAs, footer, and about copy for trust.
 */
export function CertifiedWattsBadge({ size = "md", className }: CertifiedWattsBadgeProps) {
  const heightClass =
    size === "sm"
      ? "h-11 sm:h-12"
      : size === "md"
        ? "h-14 sm:h-16"
        : size === "lg"
          ? "h-16 sm:h-[4.25rem] md:h-20"
          : "h-[5.25rem] sm:h-28 md:h-32 lg:h-36";

  const maxWClass =
    size === "sm"
      ? "max-w-[160px]"
      : size === "md"
        ? "max-w-[200px]"
        : size === "lg"
          ? "max-w-[220px] sm:max-w-[260px]"
          : "max-w-[min(100%,280px)] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[440px]";

  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      <img
        src={certifiedBadge}
        alt="Certified Watts lighting professional"
        className={cn("w-auto object-contain object-center", maxWClass, heightClass)}
        width={400}
        height={160}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
