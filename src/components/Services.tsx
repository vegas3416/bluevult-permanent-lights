import { useEffect, useState } from "react";
import { Lightbulb, Fence, TreePine, Flower2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useGalleryImages } from "@/lib/gallery/useGalleryImages";

const services = [
  {
    icon: Lightbulb,
    title: "Permanent Lighting",
    description: "Year-round programmable LED lighting installed along your roofline. Holiday colors, everyday ambiance — no ladders, no hassle.",
    featured: true,
  },
  {
    icon: Fence,
    title: "Fencing",
    description: "Durable, stylish fencing solutions for privacy, security, and curb appeal. Wood, vinyl, iron, and more.",
  },
  {
    icon: TreePine,
    title: "Artificial Turf",
    description: "Low-maintenance, lush green turf that looks perfect all year. Save water and eliminate mowing.",
  },
  {
    icon: Flower2,
    title: "Landscape Design",
    description: "Complete landscape transformations with hardscaping, planting, drainage, and outdoor living spaces.",
  },
];

const Services = () => {
  const { items: galleryItems } = useGalleryImages();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (galleryItems.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((idx) => (idx + 1) % galleryItems.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [galleryItems.length]);

  useEffect(() => {
    if (activeIndex >= galleryItems.length) setActiveIndex(0);
  }, [activeIndex, galleryItems.length]);

  const activeSlide = galleryItems[activeIndex];

  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" aria-hidden />
      <div className="container relative mx-auto px-4">
        <div className="mb-14 text-center md:mb-16">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">What we do</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-gradient-vibrant">Permanent lighting first</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Roofline LED is our specialty; we bundle other outdoor upgrades when it makes sense for your property.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className={`group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                service.featured
                  ? "border-primary/50 bg-gradient-to-b from-primary/12 to-primary/5 shadow-lg shadow-primary/10 glow-blue"
                  : "border-border bg-card/90 hover:border-primary/35 hover:shadow-lg hover:shadow-black/20"
              }`}
            >
              <service.icon
                className={`mb-4 h-8 w-8 ${
                  service.featured ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                } transition-colors`}
              />
              <h3 className="text-xl font-display mb-2 text-foreground">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              {service.featured && (
                <span className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
                  Most Popular
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Permanent lighting is our primary focus. Additional outdoor services are available based on project scope.
        </p>

        {/* Showcase carousel */}
        {activeSlide ? (
          <div className="mt-16 overflow-hidden rounded-2xl border border-primary/25 shadow-xl shadow-black/30 ring-1 ring-primary/10">
            <Link to="/gallery" aria-label="Open full project gallery">
              <img
                key={activeSlide.rowKey}
                src={activeSlide.src}
                alt={activeSlide.alt}
                className="h-64 w-full object-cover transition-transform duration-700 hover:scale-[1.02] sm:h-80 md:h-96"
                loading="lazy"
                decoding="async"
              />
            </Link>
          </div>
        ) : null}

        {galleryItems.length > 1 ? (
          <div className="mt-3 flex items-center justify-center gap-2">
            {galleryItems.slice(0, 8).map((item, idx) => (
              <button
                key={item.rowKey}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  idx === activeIndex ? "bg-primary" : "bg-muted-foreground/40 hover:bg-primary/60"
                }`}
                aria-label={`Show gallery image ${idx + 1}`}
              />
            ))}
          </div>
        ) : null}

        <p className="mt-6 text-center">
          <Link
            to="/gallery"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View project gallery
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Services;
