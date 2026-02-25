import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-3">Get Started</p>
        <h2 className="text-4xl sm:text-5xl font-display text-gradient-silver mb-6">
          Ready to Transform Your Property?
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground mb-12">
          Contact us today for a free consultation and estimate. We'll bring your vision to life.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
          <a href="tel:+5124611926" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
            <Phone className="h-5 w-5 text-primary" />
            <span className="font-medium">(512) 461-1926</span>
          </a>
          <a href="mailto:info@bluevult.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
            <Mail className="h-5 w-5 text-primary" />
            <span className="font-medium">info@bluevultlighting.com</span>
          </a>
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium">Serving Your Area</span>
          </div>
        </div>

        <a
          href="tel:+5124611926"
          className="inline-block rounded-md bg-primary px-10 py-4 text-lg font-semibold text-primary-foreground glow-blue transition-all hover:glow-blue-lg"
        >
          Call Now for a Free Estimate
        </a>
      </div>
    </section>
  );
};

export default Contact;
