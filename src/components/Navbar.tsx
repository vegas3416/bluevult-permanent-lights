import logo from "@/assets/bluevult-logo.png";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
    <div className="flex w-full items-center justify-between py-2 px-6">
      <Link to="/" aria-label="BlueVult Lighting Home">
       <img src={logo} alt="BlueVult Lighting" className="h-16 w-auto object-contain" />
      </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          <a href="/#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
          <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
        </div>
        <Link
          to="/contact"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:glow-blue"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">Get a Quote</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
