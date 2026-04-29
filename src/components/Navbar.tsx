import { useState } from "react";
import logo from "@/assets/bluevult-logo.png";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "@/lib/seo/siteConfig";
import { Menu, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { to: "/services/permanent-lighting", label: "Permanent Lighting" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ & pricing" },
  { to: "/about", label: "About" },
] as const;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-primary/20 bg-background/85 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]">
      <div className="flex w-full items-center justify-between gap-2 py-2 px-4 sm:gap-3 sm:px-6">
        <Link to="/" aria-label="BlueVult Lighting Home">
          <img src={logo} alt="BlueVult Lighting" className="h-14 w-auto object-contain sm:h-16" />
        </Link>
        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex items-center gap-7 text-xs font-bold tracking-[0.12em] uppercase">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="text-muted-foreground transition-colors hover:text-primary">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={BUSINESS_PHONE_TEL}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-lg border border-primary/35 bg-primary/10 px-3 py-2 text-xs font-bold tracking-wide text-primary transition-colors hover:border-primary/60 hover:bg-primary/15"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {BUSINESS_PHONE_DISPLAY}
          </a>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="md:hidden border-primary/30 bg-background/80"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[min(100vw-2rem,20rem)] flex-col border-l border-primary/20">
              <SheetHeader className="text-left">
                <SheetTitle className="font-display text-xl tracking-wide">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-1 flex-col gap-1">
                {navLinks.map(({ to, label }) => (
                  <SheetClose asChild key={to}>
                    <Link
                      to={to}
                      className="rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      {label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/contact"
                    className="rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary/10"
                  >
                    Get a quote
                  </Link>
                </SheetClose>
              </nav>
              <div className="mt-auto border-t border-border pt-4">
                <SheetClose asChild>
                  <a
                    href={BUSINESS_PHONE_TEL}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-primary hover:bg-primary/10"
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden />
                    {BUSINESS_PHONE_DISPLAY}
                  </a>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Link
            to="/contact"
            className="btn-vibrant-primary flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold text-primary-foreground sm:text-sm"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            <span className="whitespace-nowrap">Get a quote</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
