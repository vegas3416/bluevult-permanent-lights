/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSUBMIT_EMAIL?: string;
  readonly VITE_SMS_GATEWAY?: string;
  readonly VITE_FORMSPREE_ID?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Paste token from Google Search Console → Settings → Ownership verification (HTML tag). */
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
