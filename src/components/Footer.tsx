import logo from "@/assets/bluevult-logo.png";
import { CertifiedWattsBadge } from "@/components/CertifiedWattsBadge";
import {
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
  FACEBOOK_PAGE_URL,
  GOOGLE_BUSINESS_URL,
} from "@/lib/seo/siteConfig";
import { Link } from "react-router-dom";
import { ExternalLink, Facebook, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/80 bg-gradient-to-b from-background via-card/20 to-background pt-12 pb-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        aria-hidden
      />
      <div className="container mx-auto flex flex-col items-center gap-8 px-4">
        <div className="flex w-full max-w-lg flex-col items-center gap-3 rounded-2xl border border-primary/25 bg-primary/5 px-6 py-5 text-center backdrop-blur-sm sm:flex-row sm:justify-center sm:text-left">
          <Phone className="h-8 w-8 shrink-0 text-primary" aria-hidden />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Ready when you are</p>
            <a href={BUSINESS_PHONE_TEL} className="mt-1 block text-xl font-bold text-foreground hover:text-primary">
              {BUSINESS_PHONE_DISPLAY}
            </a>
            <Link to="/contact" className="mt-2 inline-block text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
              Or send a message — free estimate
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
          <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
          <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
            FAQ & pricing
          </Link>
          <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
            Gallery
          </Link>
          {GOOGLE_BUSINESS_URL ? (
            <a
              href={GOOGLE_BUSINESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              Google
              <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </a>
          ) : null}
          {FACEBOOK_PAGE_URL ? (
            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-[#1877F2] transition-colors hover:border-primary hover:bg-primary/5"
              aria-label="Facebook (opens in a new tab)"
            >
              <Facebook className="h-4 w-4" aria-hidden />
            </a>
          ) : null}
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
            <img src={logo} alt="BlueVult Lighting" className="h-10 w-auto opacity-70" />
            <div className="h-px w-full max-w-[12rem] bg-border/80 sm:hidden" aria-hidden />
            <CertifiedWattsBadge size="sm" className="opacity-95" />
          </div>
          <p className="text-center text-sm text-muted-foreground sm:text-right">
            © {new Date().getFullYear()} BlueVult Lighting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
