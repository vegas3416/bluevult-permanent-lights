import { Helmet } from "react-helmet-async";

type SEOProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  siteName?: string;
};

const defaultImage = "/favicon.ico";

export default function SEO({ title, description, url, image, siteName }: SEOProps) {
  const fullTitle = title ? `${title}` : "BlueVult Lighting";
  const desc = description ||
    "Professional permanent LED lighting, fencing, artificial turf, and landscape services by BlueVult.";
  const ogImage = image || defaultImage;
  const ogUrl = url || typeof window !== "undefined" ? window.location.href : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName || "BlueVult Lighting",
    url: ogUrl || "https://example.com",
    telephone: "+1-512-461-1926",
    description: desc,
    address: {
      "@type": "PostalAddress",
      addressLocality: "",
      addressRegion: "",
      postalCode: "",
      streetAddress: ""
    }
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
