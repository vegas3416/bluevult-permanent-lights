import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BallparkEstimator from "@/components/estimate/BallparkEstimator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_ITEMS, faqPageSchema } from "@/data/faqContent";

const FaqPage = () => {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash, location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="FAQ & Ballpark Pricing | BlueVult Lighting"
        description="Answers about permanent roofline LED lighting in Central Texas, plus a ballpark pricing tool for residential installs. Commercial projects schedule an on-site visit."
        path="/faq"
        schema={faqPageSchema(FAQ_ITEMS)}
      />
      <Navbar />
      <main className="container mx-auto px-4 pb-20 pt-24 md:pt-28">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">Help center</p>
          <h1 className="font-display text-4xl text-gradient-vibrant sm:text-5xl md:text-6xl">FAQ & pricing</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Straight answers about installs and pricing — plus a quick residential ballpark tool below.
          </p>
        </header>

        <section id="ballpark" className="mx-auto mb-20 max-w-3xl scroll-mt-28">
          <BallparkEstimator />
        </section>

        <section id="faq" className="mx-auto max-w-3xl scroll-mt-28">
          <h2 className="mb-6 font-display text-3xl text-gradient-silver sm:text-4xl">Common questions</h2>
          <Accordion type="single" collapsible className="w-full rounded-2xl border border-border bg-card/40 px-4">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={item.question} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FaqPage;
