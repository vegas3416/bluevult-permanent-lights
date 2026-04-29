import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeMarketing from "@/components/HomeMarketing";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Permanent Lighting in Central Texas | BlueVult Lighting"
        description="Permanent outdoor LED lighting installation in Central Texas. BlueVult delivers clean roofline lighting systems with year-round app control."
        path="/"
      />
      <Navbar />
      <Hero />
      <HomeMarketing />
      <Services />
      <Footer />
    </div>
  );
};

export default Index;
