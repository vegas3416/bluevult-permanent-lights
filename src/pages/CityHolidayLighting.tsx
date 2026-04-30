import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import {
  holidayLightingMicroPath,
  permanentLightingMicroPath,
  serviceAreaCityBySlug,
  SITE_URL,
  type ServiceAreaCity,
} from "@/lib/seo/siteConfig";
import { nearbyCitiesResolved } from "@/lib/seo/cityNearby";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";

const CityHolidayLighting = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const cityEntry = serviceAreaCityBySlug(citySlug);

  if (!cityEntry) {
    return <NotFound />;
  }

  const cityName = cityEntry.name;
  const slug = cityEntry.slug;
  const canonicalPath = holidayLightingMicroPath(slug);
  const nearbyCities = nearbyCitiesResolved(slug);

  const pageTitle = `Holiday Lighting & Christmas Roofline Lights in ${cityName}, TX | BlueVult`;
  const pageDescription = `Holiday lighting and permanent Christmas-style roofline LEDs in ${cityName}, Texas — no ladders, app-controlled colors for Halloween, Thanksgiving, Christmas, and more. Free estimate from BlueVult.`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={pageTitle}
        description={pageDescription}
        path={canonicalPath}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Holiday Roofline Lighting in ${cityName}, TX`,
          serviceType: "Holiday and Permanent LED Roofline Lighting Installation",
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

      <main className="container mx-auto px-6 pb-24 pt-28 md:pt-32">
        <section className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card/80 via-background to-[hsl(265_40%_12%/0.35)] px-6 py-10 shadow-xl shadow-black/20 sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-[hsl(330_60%_40%/0.2)] blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
              Holiday & seasonal · {cityName}, Texas
            </p>
            <h1 className="mb-5 text-4xl font-display text-gradient-vibrant sm:text-5xl md:text-6xl leading-[0.95]">
              Holiday lighting & Christmas roofline lights in {cityName}
            </h1>
            <p className="mb-6 text-lg text-muted-foreground md:text-xl">
              Homeowners in {cityName} search for <strong className="text-foreground">holiday lighting</strong>,{" "}
              <strong className="text-foreground">Christmas lights</strong>, and{" "}
              <strong className="text-foreground">roofline installs</strong> — BlueVult installs{" "}
              <strong className="text-foreground">permanent LED channels</strong> so you get bright seasonal displays
              without annual hang-and-take-down, tangled strings, or risky ladder work.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm">
                <h2 className="mb-2 text-xl font-semibold">Why this beats traditional holiday lights in {cityName}</h2>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Presets for Christmas, Halloween, Fourth of July, game day, and more</li>
                  <li>Millions of colors and motion effects from your phone</li>
                  <li>Low-profile hardware that looks intentional year-round</li>
                  <li>Professional install sized to your roofline — not a one-size kit</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm">
                <h2 className="mb-2 text-xl font-semibold">Popular seasons in {cityName}</h2>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Christmas & winter holidays — classic warm white or full color</li>
                  <li>Halloween — oranges, purples, and spooky chase effects</li>
                  <li>Independence Day — red, white, and blue scenes</li>
                  <li>Valentine’s, Easter, local celebrations — swap looks in minutes</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h2 className="mb-3 text-2xl font-semibold">FAQ: Holiday lighting in {cityName}</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground">Is this the same as string lights from the store?</h3>
                  <p>
                    No — we install a permanent, concealed-track LED system made for your roofline. It replaces
                    throwaway string lights for most homeowners who want a polished look and less maintenance.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Can I still use warm white after the holidays?</h3>
                  <p>
                    Yes. After Christmas or Halloween, switch to subtle architectural white or soft accent colors for
                    everyday curb appeal in {cityName}.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Prefer the <strong className="text-foreground">year-round “permanent lighting”</strong> angle? View our{" "}
              <Link
                to={permanentLightingMicroPath(slug)}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                permanent roofline lighting page for {cityName}
              </Link>
              .
            </p>

            {nearbyCities.length > 0 ? (
              <div className="mt-8">
                <h2 className="mb-3 text-xl font-semibold">Nearby holiday lighting pages</h2>
                <div className="flex flex-wrap gap-2">
                  {nearbyCities.map((nearby) => (
                    <Link
                      key={nearby.slug}
                      to={holidayLightingMicroPath(nearby.slug)}
                      className="rounded-full border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                    >
                      {nearby.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/contact"
                className="btn-vibrant-primary inline-flex items-center justify-center rounded-xl px-6 py-3 text-center text-base font-bold text-primary-foreground"
              >
                Free holiday lighting estimate — {cityName}
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary/35 bg-background/60 px-6 py-3 text-center text-base font-bold backdrop-blur-sm transition-colors hover:border-primary/60 hover:bg-primary/10"
              >
                FAQ & ballpark pricing
              </Link>
              <Link
                to="/service-areas"
                className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 text-center text-base font-semibold transition-colors hover:border-primary/40"
              >
                All service areas
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CityHolidayLighting;
