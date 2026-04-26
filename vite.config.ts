import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function escapeHtmlAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const googleSiteVerification = env.VITE_GOOGLE_SITE_VERIFICATION?.trim();

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      {
        name: "inject-google-site-verification",
        transformIndexHtml(html) {
          if (!googleSiteVerification) return html;
          const meta = `    <meta name="google-site-verification" content="${escapeHtmlAttribute(googleSiteVerification)}" />\n`;
          return html.replace(/(\s*)<\/head>/i, (_, indent) => `${indent}${meta}${indent}</head>`);
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
