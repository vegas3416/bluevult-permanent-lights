import logo from "@/assets/bluevult-logo.png";
import { FACEBOOK_PAGE_URL, GOOGLE_BUSINESS_URL } from "@/lib/seo/siteConfig";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
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
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              Facebook
              <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </a>
          ) : null}
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <img src={logo} alt="BlueVult Lighting" className="h-10 w-auto opacity-70" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BlueVult Lighting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
