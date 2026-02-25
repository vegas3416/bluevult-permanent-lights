import logo from "@/assets/bluevult-logo.png";
import { Phone } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
     <div className="flex w-full items-center justify-between py-2 px-6">
        <img src={logo} alt="BlueVult Lighting" className="h-16 w-auto object-contain" />
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
          <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
        </div>
        <a
          href="tel:+1234567890"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:glow-blue"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">Get a Quote</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
