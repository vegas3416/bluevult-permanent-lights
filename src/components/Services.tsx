import { Lightbulb, Fence, TreePine, Flower2 } from "lucide-react";
import { Link } from "react-router-dom";
import outdoorImg from "@/assets/services-outdoor.jpg";

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
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-3">What We Do</p>
          <h2 className="text-4xl sm:text-5xl font-display text-gradient-silver">Permanent Lighting First</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`group rounded-lg border p-6 transition-all duration-300 hover:-translate-y-1 ${
                service.featured
                  ? "border-primary/40 bg-primary/5 glow-blue"
                  : "border-border bg-card hover:border-primary/20"
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

        {/* Showcase image */}
        <div className="mt-16 overflow-hidden rounded-xl border border-border">
          <img
            src={outdoorImg}
            alt="Permanent outdoor lighting showcase"
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>

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
