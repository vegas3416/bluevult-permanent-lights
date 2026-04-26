import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { SERVICE_AREA_CITIES, SITE_URL } from "@/lib/seo/siteConfig";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";

const nearbyMap: Record<string, string[]> = {
  austin: ["round-rock", "cedar-park", "leander"],
  "round-rock": ["austin", "pflugerville", "cedar-park"],
  pflugerville: ["austin", "round-rock", "hutto"],
  "cedar-park": ["austin", "leander", "round-rock"],
  leander: ["cedar-park", "austin", "georgetown"],
};

const CityPermanentLighting = () => {
  const { city } = useParams<{ city: string }>();
  const cityEntry = SERVICE_AREA_CITIES.find((item) => item.slug === city);

  if (!cityEntry || !cityEntry.featured) {
    return <NotFound />;
  }

  const cityName = cityEntry.name;
  const citySlug = cityEntry.slug;
  const nearbyCitySlugs = nearbyMap[citySlug] ?? [];
  const nearbyCities = nearbyCitySlugs
    .map((slug) => SERVICE_AREA_CITIES.find((item) => item.slug === slug))
    .filter((item): item is { name: string; slug: string; featured: boolean } => Boolean(item));

  const pageTitle = `Permanent Lighting in ${cityName}, TX | BlueVult`;
  const pageDescription = `Custom permanent outdoor LED lighting installation in ${cityName}, Texas. BlueVult designs clean roofline lighting systems with year-round app control and professional install.`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={pageTitle}
        description={pageDescription}
        path={`/service-areas/${citySlug}/permanent-lighting`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Permanent Lighting in ${cityName}, TX`,
          serviceType: "Permanent Outdoor LED Lighting Installation",
          areaServed: {
            "@type": "City",
            name: cityName,
          },
          provider: {
            "@type": "HomeAndConstructionBusiness",
            name: "BlueVult Lighting",
            url: SITE_URL,
          },
        }}
      />
      <Navbar />

      <main className="container mx-auto px-6 py-24">
        <section className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {cityName}, Texas
          </p>
          <h1 className="mb-6 text-4xl sm:text-5xl font-display">
            Permanent Lighting in {cityName}, Texas
          </h1>
          <p className="mb-6 text-lg text-muted-foreground">
            BlueVult installs permanent LED roofline lighting systems for homeowners in {cityName}. Get
            clean daytime appearance, bright nighttime impact, and app-controlled color schedules for
            holidays, game days, and everyday use.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="mb-2 text-xl font-semibold">Why homeowners in {cityName} choose permanent lighting</h2>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>No seasonal hanging or ladder work</li>
                <li>Year-round curb appeal and security accent lighting</li>
                <li>Custom color scenes controlled from your phone</li>
                <li>Professional installation designed for your roofline</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="mb-2 text-xl font-semibold">Our process</h2>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>On-site design consultation and estimate</li>
                <li>Clean, concealed mounting installation</li>
                <li>App setup, scene presets, and schedule walkthrough</li>
                <li>Support after install for seasonal programming</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-2 text-2xl font-semibold">FAQ: Permanent Lighting in {cityName}</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground">Can permanent lighting be used beyond holidays?</h3>
                <p>
                  Yes. Most homeowners in {cityName} use permanent LEDs year-round for accent lighting,
                  parties, events, and neighborhood-safe nighttime visibility.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Does the system require frequent maintenance?</h3>
                <p>
                  No. Systems are designed for low maintenance with durable components and professional
                  installation.
                </p>
              </div>
            </div>
          </div>

          {nearbyCities.length > 0 ? (
            <div className="mt-8">
              <h2 className="mb-3 text-xl font-semibold">Nearby areas we serve</h2>
              <div className="flex flex-wrap gap-2">
                {nearbyCities.map((nearby) => (
                  <Link
                    key={nearby.slug}
                    to={`/service-areas/${nearby.slug}/permanent-lighting`}
                    className="rounded-full border border-border px-3 py-1 text-sm hover:border-primary"
                  >
                    {nearby.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-md bg-primary px-6 py-3 text-center font-semibold text-primary-foreground"
            >
              Get a Free Estimate in {cityName}
            </Link>
            <Link
              to="/service-areas"
              className="rounded-md border border-border px-6 py-3 text-center font-semibold"
            >
              View All Service Areas
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CityPermanentLighting;

