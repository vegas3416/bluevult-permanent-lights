import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const PermanentLightingService = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Permanent & Architectural LED Roofline Lighting | BlueVult"
        description="Central Texas permanent lighting and architectural LED roofline installation: custom house lighting, holiday color themes, and everyday curb appeal—app control without climbing ladders. Free estimates."
        path="/services/permanent-lighting"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Permanent & architectural roofline LED lighting installation",
          description:
            "Design and installation of permanent outdoor LED roofline lighting and custom residential lighting in Central Texas, including holiday and architectural color programs with app-based control.",
          serviceType:
            "Permanent outdoor LED lighting installation; architectural roofline lighting; custom house lighting; holiday roofline lighting",
          areaServed: "Central Texas",
        }}
      />
      <Navbar />

      <main className="container mx-auto px-6 pb-24 pt-28 md:pt-32">
        <section className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card/90 via-background to-primary/5 px-6 py-10 shadow-xl shadow-black/25 sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">Primary service</p>
            <h1 className="mb-5 text-4xl sm:text-5xl md:text-6xl font-display text-gradient-vibrant leading-[0.95]">
              Permanent & architectural roofline lighting
            </h1>
            <p className="mb-6 text-lg text-muted-foreground md:text-xl">
              BlueVult designs and installs low-profile permanent lighting and LED roofline systems for homes across
              Central Texas—custom channels and fixtures that read clean by day and dramatic at night. You get
              architectural-grade accents on peaks and eaves, plus holiday lighting palettes and game-day color without
              seasonal hang-ups.
            </p>
            <p className="mb-8 text-muted-foreground">
              This is true custom house lighting: we map your roofline, choose placement for even coverage, and hand off
              app-based scenes and schedules so you are not climbing ladders with temporary strings each year. Every
              install prioritizes concealed mounting, durable hardware, and long-term performance.
            </p>

            <div className="mb-10 space-y-8 rounded-2xl border border-primary/15 bg-card/60 p-6 backdrop-blur-sm sm:p-8">
              <div>
                <h2 className="mb-3 text-2xl font-semibold text-foreground">Architectural lighting on the roofline</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Architectural lighting is about proportion: grazing roof edges, highlighting gables, and balancing
                  fascia lines so your home looks intentional—not busy. Our permanent LED approach keeps wiring and
                  controllers serviceable while delivering the brightness and color range people expect from modern{" "}
                  <span className="text-foreground/90">roofline lighting</span>.
                </p>
              </div>
              <div>
                <h2 className="mb-3 text-2xl font-semibold text-foreground">
                  Holiday looks and everyday curb appeal, ladder-free
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you want Christmas colors one week and warm white architectural wash the next, you can do it from
                  your phone—no more climbing ladders with custom clips and tangled strands. The same system supports
                  security-minded path and edge lighting where it fits your plan. For city-specific holiday searches,
                  browse our{" "}
                  <Link to="/service-areas" className="font-semibold text-primary underline-offset-4 hover:underline">
                    holiday lighting pages by area
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="grid gap-6 rounded-2xl border border-primary/15 bg-card/80 p-6 backdrop-blur-sm sm:grid-cols-2">
              <div>
                <h2 className="mb-2 text-xl font-semibold">What is included</h2>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Custom roofline layout and architectural placement plan</li>
                  <li>Professional concealed mounting for permanent LED fixtures</li>
                  <li>App-based color, zoning, and schedule controls</li>
                  <li>Holiday, event, and everyday lighting presets</li>
                </ul>
              </div>
              <div>
                <h2 className="mb-2 text-xl font-semibold">Ideal for</h2>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Homeowners who want permanent holiday lighting without ladder work</li>
                  <li>Architectural accent and LED roofline upgrades</li>
                  <li>Custom exterior lighting tied to your roof geometry</li>
                  <li>Long-term curb appeal across seasons</li>
                </ul>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-muted-foreground sm:text-left">
              Questions on pricing, HOA, warranties, or how installs work?{" "}
              <Link to="/faq" className="font-semibold text-primary underline-offset-4 hover:underline">
                FAQ & pricing
              </Link>
              .
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/contact"
                className="btn-vibrant-primary rounded-xl px-6 py-3 text-center text-base font-bold text-primary-foreground"
              >
                Request a free estimate
              </Link>
              <Link
                to="/gallery"
                className="rounded-xl border-2 border-primary/35 bg-background/50 px-6 py-3 text-center text-base font-bold backdrop-blur-sm transition-colors hover:border-primary/60 hover:bg-primary/10"
              >
                Project gallery
              </Link>
              <Link
                to="/service-areas"
                className="rounded-xl border border-border px-6 py-3 text-center text-base font-semibold transition-colors hover:border-primary/40"
              >
                View service areas
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PermanentLightingService;

