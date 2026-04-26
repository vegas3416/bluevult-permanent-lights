import { useCallback, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { GALLERY_ITEMS } from "@/lib/gallery/galleryItems";
import {
  FACEBOOK_PAGE_URL,
  GOOGLE_BUSINESS_URL,
  GOOGLE_MAPS_EMBED_URL,
} from "@/lib/seo/siteConfig";
import { ExternalLink, Facebook, X } from "lucide-react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxSrc, closeLightbox]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Project Gallery | BlueVult Lighting"
        description="Photos of permanent outdoor LED lighting and outdoor projects by BlueVult Lighting in Central Texas. See more on Google and Facebook."
        path="/gallery"
      />
      <Navbar />

      <main className="container mx-auto px-6 pb-24 pt-28">
        <section className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Our work</p>
          <h1 className="mb-4 text-4xl sm:text-5xl font-display">Project gallery</h1>
          <p className="text-lg text-muted-foreground">
            Highlights from permanent roofline lighting and outdoor installs. For the newest photos and
            reviews, visit us on Google and Facebook—those pages update as soon as projects are posted.
          </p>
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            {GOOGLE_BUSINESS_URL ? (
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                Google profile & reviews
                <ExternalLink className="h-4 w-4 opacity-70" aria-hidden />
              </a>
            ) : null}
            {FACEBOOK_PAGE_URL ? (
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-[#1877F2] transition-colors hover:border-primary hover:bg-primary/5"
                aria-label="BlueVult Lighting on Facebook (opens in a new tab)"
              >
                <Facebook className="h-6 w-6" aria-hidden />
              </a>
            ) : null}
          </div>
          {!GOOGLE_BUSINESS_URL && !FACEBOOK_PAGE_URL ? (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              When your Google Business and Facebook page URLs are connected to the site, buttons will
              appear here automatically after the next update.
            </p>
          ) : null}
        </section>

        {GOOGLE_MAPS_EMBED_URL ? (
          <section className="mx-auto mt-14 max-w-4xl">
            <h2 className="mb-3 text-center text-xl font-semibold">Find us on the map</h2>
            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                title="BlueVult Lighting on Google Maps"
                src={GOOGLE_MAPS_EMBED_URL}
                className="aspect-video w-full min-h-[280px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        ) : null}

        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="mb-6 text-center text-2xl font-semibold">Featured photos</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {GALLERY_ITEMS.map((item) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setLightboxSrc(item.src)}
                className="group relative overflow-hidden rounded-xl border border-border text-left transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="border-t border-border bg-card/95 px-3 py-2 text-sm text-muted-foreground backdrop-blur-sm">
                  {item.caption}
                </div>
              </button>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Facebook does not allow reliably copying a Page’s photo feed into a third-party site without
            Meta’s official API and server-side setup. This grid uses images we host; use the Facebook icon
            above for the latest posts and albums on your Page.
          </p>
        </section>

        <div className="mx-auto mt-14 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/contact"
            className="rounded-md bg-primary px-6 py-3 text-center font-semibold text-primary-foreground"
          >
            Request a consultation
          </Link>
          <Link
            to="/services/permanent-lighting"
            className="rounded-md border border-border px-6 py-3 text-center font-semibold"
          >
            Permanent lighting service
          </Link>
        </div>
      </main>

      <Footer />

      {lightboxSrc ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged gallery image"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-background/90 p-2 text-foreground shadow-md transition-opacity hover:opacity-90"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Gallery;
