import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import ResetPassword from "./pages/ResetPassword";
import PermanentLightingService from "./pages/PermanentLightingService";
import ServiceAreas from "./pages/ServiceAreas";
import CityPermanentLighting from "./pages/CityPermanentLighting";
import Gallery from "./pages/Gallery";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services/permanent-lighting" element={<PermanentLightingService />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route
              path="/service-areas/:city/permanent-lighting"
              element={<CityPermanentLighting />}
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
