import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CertifiedWattsBadge } from "@/components/CertifiedWattsBadge";
import { Mail, Phone, MapPin } from "lucide-react";
import SEO from "@/components/SEO";
import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
} from "@/lib/seo/siteConfig";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const FORMSUBMIT_EMAIL =
    import.meta.env.VITE_FORMSUBMIT_EMAIL || "info@bluevultlighting.com";
  const FORMSUBMIT_FORM_ID = import.meta.env.VITE_FORMSUBMIT_FORM_ID?.trim();

  /** Prefer hashed id from FormSubmit activation email; otherwise naked email (requires activation). */
  const formsubmitAjaxPath = FORMSUBMIT_FORM_ID || FORMSUBMIT_EMAIL;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const visitorEmail = String(formData.get("email") || "").trim();
    if (visitorEmail) {
      formData.set("_replyto", visitorEmail);
    }
    formData.set("_url", window.location.href);

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(formsubmitAjaxPath)}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const raw = await response.text();
      let data: { success?: string | boolean; message?: string } = {};
      try {
        data = JSON.parse(raw) as typeof data;
      } catch {
        console.error("FormSubmit non-JSON response:", raw.slice(0, 500));
      }
      console.log("FormSubmit response:", response.status, data);

      const success =
        response.ok &&
        (data.success === "true" || data.success === true);

      if (success) {
        setSubmitted(true);
        form.reset();
      } else {
        const hint =
          typeof data.message === "string" && /activate/i.test(data.message)
            ? " Check the inbox for your destination address (and spam) for FormSubmit’s activation link; submissions are not delivered until you activate."
            : "";
        alert(
          (data.message || `Could not send (${response.status}).`) +
            hint +
            ` You can also call ${BUSINESS_PHONE_DISPLAY} or email ${BUSINESS_EMAIL}.`
        );
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact BlueVult Lighting | Permanent Lighting Estimate"
        description="Request a free permanent lighting estimate in Central Texas. Talk with BlueVult about design, installation, and scheduling."
        path="/contact"
      />

      <Navbar />

      <main className="container mx-auto px-6 py-24">
        <section className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-3">
            Get Started
          </p>

          <h1 className="text-3xl sm:text-4xl font-display mb-4">
            Ready to transform your property?
          </h1>

          <p className="text-muted-foreground mb-8">
            Reach out for a free consultation and estimate.
          </p>

          <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href={BUSINESS_PHONE_TEL} className="flex items-center gap-3 hover:text-primary">
              <Phone className="h-5 w-5 text-primary" />
              <span>{BUSINESS_PHONE_DISPLAY}</span>
            </a>

            <a href={`mailto:${BUSINESS_EMAIL}`} className="flex items-center gap-3 hover:text-primary">
              <Mail className="h-5 w-5 text-primary" />
              <span>{BUSINESS_EMAIL}</span>
            </a>

            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Serving Central Texas</span>
            </div>
          </div>

          <div className="mx-auto mb-10 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-primary/20 bg-card/50 px-5 py-5 backdrop-blur-sm">
            <CertifiedWattsBadge size="md" />
            <p className="text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Certified Watts lighting professional — trusted components and installation standards for your project.
            </p>
          </div>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-xl text-left space-y-4"
            >
              <input
                type="hidden"
                name="_subject"
                value="New BlueVult Quote Request"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <label className="block">
                <span className="text-sm font-medium">Full Name</span>
                <input
                  required
                  name="name"
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-input"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-input"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-input"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Project Address</span>
                <input
                  name="address"
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-input"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Project Type</span>
                <select
                  name="project"
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-input"
                >
                  <option>Permanent Lighting</option>
                  <option>Permanent Lighting + Other Outdoor Work</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium">Project Details</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-input"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Request Quote"}
              </button>
            </form>
          ) : (
            <div className="rounded-md border p-8 bg-card">
              <h3 className="text-xl font-semibold mb-2">
                Thanks — we'll be in touch
              </h3>
              <p className="text-muted-foreground">
                Your message was sent successfully. We'll contact you shortly.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;