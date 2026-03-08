import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="BlueVult Lighting | Permanent Lighting, Fencing & Landscape" description="Professional permanent LED lighting, fencing, artificial turf, and landscape services by BlueVult." />
      <Navbar />
      <Hero />
      <Services />
      <Footer />
    </div>
  );
};

export default Index;
