import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { SERVICE_AREA_CITIES } from "@/lib/seo/siteConfig";
import { Link } from "react-router-dom";

const featuredCities = SERVICE_AREA_CITIES.filter((city) => city.featured);
const remainingCities = SERVICE_AREA_CITIES.filter((city) => !city.featured);

const ServiceAreas = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Permanent Lighting Service Areas | Central Texas | BlueVult"
        description="See where BlueVult installs permanent outdoor LED lighting in Central Texas, including Austin, Round Rock, Pflugerville, Cedar Park, and Leander."
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
                to={`/service-areas/${city.slug}/permanent-lighting`}
                className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 font-semibold hover:border-primary"
              >
                Permanent Lighting in {city.name}
              </Link>
            ))}
          </div>

          <h2 className="mb-4 text-2xl font-semibold">All Central Texas Areas We Serve</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {remainingCities.map((city) => (
              <p key={city.slug} className="rounded-md border border-border px-4 py-3 text-muted-foreground">
                {city.name}
              </p>
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

