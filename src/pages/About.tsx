import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { CertifiedWattsTrustSection } from "@/components/CertifiedWattsTrustSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About BlueVult Lighting | Permanent Lighting in Central Texas"
        description="Learn how BlueVult Lighting designs and installs permanent outdoor LED lighting systems across Central Texas."
        path="/about"
      />
      <Navbar />

      <main className="container mx-auto px-6 py-24">
        <section className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-3">About Us</p>
          <h1 className="text-4xl sm:text-5xl font-display mb-6">Built for permanent lighting done right</h1>
          <p className="text-lg text-muted-foreground mb-6">
            BlueVult Lighting specializes in permanent outdoor LED lighting systems that enhance curb appeal,
            simplify seasonal decorating, and make homes stand out year-round.
          </p>
          <p className="mb-6">
            Our team focuses on long-term value: durable materials, thoughtful design, and professional
            installation backed by clear communication. We serve residential properties and small
            commercial sites in the greater area.
          </p>

          <CertifiedWattsTrustSection context="about" />

          <div className="text-left mt-10">
            <h3 className="font-semibold mb-2">Our approach</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Site-first design that highlights your landscape and architecture</li>
              <li>Energy-efficient LED systems with low-maintenance hardware</li>
              <li>Transparent pricing and clear project timelines</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
