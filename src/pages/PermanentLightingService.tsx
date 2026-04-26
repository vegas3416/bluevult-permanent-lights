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

      <main className="container mx-auto px-6 py-24">
        <section className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Primary Service</p>
          <h1 className="mb-6 text-4xl sm:text-5xl font-display">Permanent Lighting Installation</h1>
          <p className="mb-6 text-lg text-muted-foreground">
            BlueVult designs and installs low-profile permanent LED lighting systems for homes across
            Central Texas. Get holiday-ready colors, game-day themes, and everyday curb appeal without
            climbing ladders each season.
          </p>
          <p className="mb-8 text-muted-foreground">
            Every system is custom-fit to your roofline and controlled from your phone. We focus on clean
            installation, durable hardware, and dependable long-term performance.
          </p>

          <div className="grid gap-6 rounded-xl border border-border bg-card p-6 sm:grid-cols-2">
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
              className="rounded-md bg-primary px-6 py-3 text-center font-semibold text-primary-foreground"
            >
              Request a Free Estimate
            </Link>
            <Link
              to="/gallery"
              className="rounded-md border border-border px-6 py-3 text-center font-semibold"
            >
              Project gallery
            </Link>
            <Link
              to="/service-areas"
              className="rounded-md border border-border px-6 py-3 text-center font-semibold"
            >
              View Service Areas
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PermanentLightingService;

