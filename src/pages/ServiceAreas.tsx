import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import {
  holidayLightingMicroPath,
  permanentLightingMicroPath,
  SERVICE_AREA_CITIES,
} from "@/lib/seo/siteConfig";
import { Link } from "react-router-dom";

const featuredCities = SERVICE_AREA_CITIES.filter((city) => city.featured);
const remainingCities = SERVICE_AREA_CITIES.filter((city) => !city.featured);

const ServiceAreas = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Permanent Lighting Service Areas | Central Texas | BlueVult"
        description="BlueVult installs permanent and holiday roofline LED lighting across Central Texas. Browse city pages for permanent lighting and holiday lighting keywords in your area."
        path="/service-areas"
      />
      <Navbar />

      <main className="container mx-auto px-6 py-24">
        <section className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Service Areas</p>
          <h1 className="mb-6 text-4xl sm:text-5xl font-display">
            Permanent Lighting Across Central Texas
          </h1>
          <p className="mb-10 text-lg text-muted-foreground">
            We design and install custom permanent LED lighting systems across Central Texas. Start with a
            city page below to view local details and request an estimate.
          </p>

          <h2 className="mb-4 text-2xl font-semibold">Featured Areas</h2>
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                to={permanentLightingMicroPath(city.slug)}
                className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 font-semibold hover:border-primary"
              >
                Permanent Lighting in {city.name}
              </Link>
            ))}
          </div>

          <h2 className="mb-4 text-2xl font-semibold">All Central Texas Areas We Serve</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {remainingCities.map((city) => (
              <Link
                key={city.slug}
                to={permanentLightingMicroPath(city.slug)}
                className="rounded-md border border-border px-4 py-3 font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Permanent lighting — {city.name}
              </Link>
            ))}
          </div>

          <h2 className="mb-3 mt-14 text-2xl font-semibold">Holiday & Christmas roofline lighting (by city)</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Separate landing pages tuned for searches like “holiday lighting,” “Christmas lights,” and “roofline
            install” — each city links to the same professional install offering.
          </p>
          <div className="mb-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_AREA_CITIES.map((city) => (
              <Link
                key={`holiday-${city.slug}`}
                to={holidayLightingMicroPath(city.slug)}
                className="rounded-md border border-border/80 bg-card/40 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                Holiday lighting — {city.name}
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-2 text-xl font-semibold">Don’t see your city listed?</h3>
            <p className="mb-4 text-muted-foreground">
              We serve many neighborhoods surrounding these areas. Contact us and we’ll confirm coverage.
            </p>
            <Link to="/contact" className="font-semibold text-primary hover:underline">
              Check availability and request a quote
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceAreas;

