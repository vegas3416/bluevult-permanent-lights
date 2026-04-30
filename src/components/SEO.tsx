import { Helmet } from "react-helmet-async";
import {
  BUSINESS_NAME,
  BUSINESS_PHONE,
  CENTRAL_TEXAS_CITIES,
  DEFAULT_OG_IMAGE,
  SITE_URL,
} from "@/lib/seo/siteConfig";

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  siteName?: string;
  noIndex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const defaultImage = DEFAULT_OG_IMAGE;

export default function SEO({
  title,
  description,
  path,
  image,
  siteName,
  noIndex = false,
  schema,
}: SEOProps) {
  const fullTitle = title ? `${title}` : "BlueVult Lighting | Permanent & Architectural Roofline LED";
  const desc = description ||
    "Permanent architectural LED roofline lighting and custom house lighting installation in Central Texas—holiday color programs, app control, professional install.";
  const ogImage = image || defaultImage;
  const canonicalUrl = path
    ? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
    : typeof window !== "undefined"
      ? `${SITE_URL}${window.location.pathname}`
      : SITE_URL;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteName || BUSINESS_NAME,
    url: SITE_URL,
    telephone: BUSINESS_PHONE,
    description: desc,
    email: "info@bluevultlighting.com",
    areaServed: CENTRAL_TEXAS_CITIES.map((city) => ({
      "@type": "City",
      name: city,
    })),
    serviceType: "Permanent Outdoor LED Lighting Installation",
  };
  const extraSchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
  const jsonLdPayload = [localBusinessSchema, ...extraSchemas];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName || BUSINESS_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(jsonLdPayload)}</script>
    </Helmet>
  );
}
