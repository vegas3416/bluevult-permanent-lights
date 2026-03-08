import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="About — BlueVult Lighting" description="BlueVult Lighting: professional permanent lighting, fencing, turf and landscape services. Learn about our story, values, and service areas." />
      <Navbar />

      <main className="container mx-auto px-6 py-24">
        <section className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-3">About Us</p>
          <h1 className="text-4xl sm:text-5xl font-display mb-6">Built for beautiful, low-maintenance outdoor living</h1>
          <p className="text-lg text-muted-foreground mb-6">
            BlueVult Lighting specializes in permanent LED lighting installations, fencing, artificial turf,
            and landscape services tailored to enhance your property's curb appeal and usability year-round.
          </p>
          <p className="mb-6">
            Our team focuses on long-term value: durable materials, thoughtful design, and professional
            installation backed by clear communication. We serve residential properties and small
            commercial sites in the greater area.
          </p>
          <div className="text-left mt-8">
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
