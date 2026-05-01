import { CertifiedWattsBadge } from "@/components/CertifiedWattsBadge";
import { cn } from "@/lib/utils";

type CertifiedWattsTrustSectionProps = {
  /** `home`: full-width band under hero. `about`: inset card under story. */
  context: "home" | "about";
};

/**
 * Prominent Watts certification block — readable badge plus copy that builds trust
 * even when visitors do not already know the brand.
 */
export function CertifiedWattsTrustSection({ context }: CertifiedWattsTrustSectionProps) {
  const isHome = context === "home";

  const inner = (
    <div className={cn("text-center", isHome ? "mx-auto max-w-3xl" : "mx-auto max-w-2xl")}>
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Installer certification</p>
      <h2
        id="certified-watts-trust-heading"
        className="mt-3 font-display text-2xl leading-tight text-foreground sm:text-3xl md:text-4xl"
      >
        Factory-backed training & quality standards
      </h2>
      <div className="mt-8 flex justify-center md:mt-10">
        <div
          className={cn(
            "rounded-3xl border-2 border-primary/35 bg-gradient-to-b from-card/95 to-card/60 shadow-xl shadow-black/20 backdrop-blur-sm",
            isHome ? "px-8 py-8 sm:px-12 sm:py-10 md:px-14 md:py-12" : "px-8 py-8 sm:px-10 sm:py-10 md:px-12 md:py-11",
          )}
        >
          <CertifiedWattsBadge size="xl" />
        </div>
      </div>
      <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg md:mt-9">
        BlueVult is a{" "}
        <span className="font-semibold text-foreground">Certified Watts lighting professional</span>
        —structured training, vetted LED components, and installation practices aligned with an established
        manufacturer. You may not know Watts yet; the takeaway is simple: we invest in doing permanent roofline
        lighting the right way, with credentials to back it up—not a seasonal side hustle.
      </p>
    </div>
  );

  if (isHome) {
    return (
      <section
        className="border-y border-primary/20 bg-gradient-to-b from-primary/[0.06] via-card/25 to-background py-12 md:py-16"
        aria-labelledby="certified-watts-trust-heading"
      >
        <div className="container mx-auto px-4">{inner}</div>
      </section>
    );
  }

  return (
    <section className="mt-10" aria-labelledby="certified-watts-trust-heading">
      <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card/50 px-6 py-8 shadow-lg shadow-black/10 sm:px-8 sm:py-10 md:px-10 md:py-11">
        {inner}
      </div>
    </section>
  );
}
