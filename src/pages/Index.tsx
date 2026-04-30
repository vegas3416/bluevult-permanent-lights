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
        title="Permanent Lighting & LED Roofline Install | BlueVult | Central TX"
        description="BlueVult installs permanent architectural LED roofline lighting in Central Texas: custom house lighting, holiday color programs, and everyday curb appeal—professional install, app control, no ladders."
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
