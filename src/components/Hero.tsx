import heroImg from "@/assets/hero-lighting.jpg";
import logo from "@/assets/bluevult-logo.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Permanent home lighting"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="BlueVult Lighting"
            className="w-[360px] md:w-[420px] lg:w-[540px] object-contain opacity-90"
          />
        </div>

        <p className="-mt-2 mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Permanent Lighting Solutions
        </p>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display leading-none mb-5">
          <span className="text-gradient-silver">Illuminate Your</span>
          <br />
          <span className="text-gradient-blue">Home Forever</span>
        </h1>

        <p className="mx-auto max-w-xl text-lg text-muted-foreground mb-10">
          Professional permanent LED lighting design and installation for Central Texas homes —
          built for holiday impact and year-round curb appeal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground glow-blue transition-all hover:glow-blue-lg"
          >
            Free Estimate
          </Link>

          <Link
            to="/services/permanent-lighting"
            className="rounded-md border border-border px-8 py-3 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Explore Permanent Lighting
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;