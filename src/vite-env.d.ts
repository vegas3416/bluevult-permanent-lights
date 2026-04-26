/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSUBMIT_EMAIL?: string;
  /** After FormSubmit activation, optional hashed form id (use instead of naked email in the endpoint). */
  readonly VITE_FORMSUBMIT_FORM_ID?: string;
  readonly VITE_SMS_GATEWAY?: string;
  readonly VITE_FORMSPREE_ID?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Paste token from Google Search Console → Settings → Ownership verification (HTML tag). */
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
  /** Google Business Profile or Maps place URL (gallery + footer links). */
  readonly VITE_GOOGLE_BUSINESS_URL?: string;
  /** Public Facebook page URL (gallery embed + footer link). */
  readonly VITE_FACEBOOK_PAGE_URL?: string;
  /** Google Maps embed iframe src from Share → Embed a map (optional). */
  readonly VITE_GOOGLE_MAPS_EMBED_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
