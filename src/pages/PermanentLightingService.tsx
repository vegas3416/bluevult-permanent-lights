import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const PermanentLightingService = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Permanent Lighting in Central Texas | BlueVult"
        description="Permanent outdoor LED lighting design and installation in Central Texas. Custom roofline lighting with year-round control and professional installation."
        path="/services/permanent-lighting"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Permanent Lighting Installation",
          serviceType: "Permanent Outdoor LED Lighting Installation",
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
              Permanent lighting installation
            </h1>
            <p className="mb-6 text-lg text-muted-foreground md:text-xl">
              BlueVult designs and installs low-profile permanent LED lighting systems for homes across Central Texas.
              Get holiday-ready colors, game-day themes, and everyday curb appeal without climbing ladders each season.
            </p>
            <p className="mb-8 text-muted-foreground">
              Every system is custom-fit to your roofline and controlled from your phone. We focus on clean
              installation, durable hardware, and dependable long-term performance.
            </p>

            <div className="grid gap-6 rounded-2xl border border-primary/15 bg-card/80 p-6 backdrop-blur-sm sm:grid-cols-2">
              <div>
                <h2 className="mb-2 text-xl font-semibold">What is included</h2>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Custom layout and placement plan</li>
                  <li>Professional concealed mounting installation</li>
                  <li>App-based color and schedule controls</li>
                  <li>Year-round event and holiday programming</li>
                </ul>
              </div>
              <div>
                <h2 className="mb-2 text-xl font-semibold">Ideal for</h2>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Permanent holiday lighting convenience</li>
                  <li>Accent lighting for architecture and landscape</li>
                  <li>Neighborhood-safe, ladder-free setup</li>
                  <li>Long-term curb appeal upgrades</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

