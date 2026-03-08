import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import SEO from "@/components/SEO";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const FORMSUBMIT_EMAIL =
    import.meta.env.VITE_FORMSUBMIT_EMAIL || "info@bluevultlighting.com";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        }
      );

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        alert("There was a problem sending the form. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Submission failed.");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact — BlueVult Lighting"
        description="Contact BlueVult Lighting for a free estimate."
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

          {/* Contact Info */}

          <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-6">

            <a
              href="tel:+15124611926"
              className="flex items-center gap-3 hover:text-primary"
            >
              <Phone className="h-5 w-5 text-primary" />
              <span>(512) 461-1926</span>
            </a>

            <a
              href="mailto:info@bluevultlighting.com"
              className="flex items-center gap-3 hover:text-primary"
            >
              <Mail className="h-5 w-5 text-primary" />
              <span>info@bluevultlighting.com</span>
            </a>

            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Serving Central Texas</span>
            </div>

          </div>

          {/* FORM */}

          {!submitted ? (

            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-xl text-left space-y-4"
            >

              <input type="hidden" name="_subject" value="New BlueVult Quote Request" />
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
                  <option>Fence Installation</option>
                  <option>Turf Installation</option>
                  <option>Landscape Work</option>
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
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md"
              >
                Request Quote
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