import heroImg from "@/assets/hero-lighting.jpg";
import logo from "@/assets/bluevult-logo.png";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "@/lib/seo/siteConfig";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -left-[20%] top-1/4 h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full bg-primary/25 blur-[100px] animate-float-slow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[15%] bottom-[15%] h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full blur-[90px] animate-float-slow-delayed opacity-80"
        style={{ background: "hsl(var(--vibrant) / 0.28)" }}
        aria-hidden
      />

      <div className="absolute inset-0">
        <img src={heroImg} alt="Permanent home lighting" className="h-full w-full object-cover scale-105" />
        <div className="absolute inset-0 bg-hero-vignette" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/45 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="BlueVult Lighting"
            className="w-[320px] md:w-[400px] lg:w-[480px] object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
          />
        </div>

        <p className="-mt-1 mb-2 text-xs font-bold uppercase tracking-[0.35em] text-primary drop-shadow-sm">
          Permanent roofline lighting · Central Texas
        </p>

        <h1 className="text-[2.65rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl font-display mb-4 md:mb-5">
          <span className="text-gradient-silver drop-shadow-sm">Celebrate every</span>
          <br />
          <span className="text-gradient-vibrant drop-shadow-md">occasion in color</span>
        </h1>

        <p className="mx-auto max-w-2xl text-base text-foreground/90 sm:text-lg md:text-xl font-medium leading-snug mb-8 md:mb-10">
          Holidays, game days, and everyday curb appeal — custom LED along your roofline, app-controlled, with no
          ladders and no tangled strings.
        </p>

        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <Link
            to="/contact"
            className="btn-vibrant-primary inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-base font-bold text-primary-foreground"
          >
            Free estimate
          </Link>

          <Link
            to="/services/permanent-lighting"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary/50 bg-background/40 px-8 py-3.5 text-base font-bold text-foreground backdrop-blur-md transition-all hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_28px_-6px_hsl(207_90%_54%/0.5)]"
          >
            Explore permanent lighting
          </Link>
        </div>

        <a
          href={BUSINESS_PHONE_TEL}
          className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary/90"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          <span className="tracking-wide">Talk to us · {BUSINESS_PHONE_DISPLAY}</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
