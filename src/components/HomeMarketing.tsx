import {
  CalendarClock,
  Home,
  Layers,
  PartyPopper,
  Shield,
  Smartphone,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { Link } from "react-router-dom";

const OCCASIONS = [
  "Christmas",
  "New Year’s",
  "Valentine’s",
  "Game day",
  "Fourth of July",
  "Halloween",
  "Thanksgiving",
  "Everyday curb appeal",
  "Patriotic",
  "Back to school",
  "Birthdays",
  "Neighborhood events",
];

const benefits = [
  {
    icon: PartyPopper,
    title: "Holiday celebrations",
    body: "Go big on color and motion for the season — then dial it back to warm white for the rest of the year.",
  },
  {
    icon: Home,
    title: "Accent your architecture",
    body: "Highlight rooflines, peaks, and details so your home reads crisp and intentional after dark.",
  },
  {
    icon: Shield,
    title: "Visibility & peace of mind",
    body: "Brighter edges and pathways help guests see steps and walkways — and make your home feel lived-in.",
  },
  {
    icon: Smartphone,
    title: "Control from your phone",
    body: "Schedules, presets, and instant changes to your custom roofline lights—no ladders, clips, or tangled seasonal strings.",
  },
];

const controlFeatures = [
  { icon: SunMedium, label: "Brightness you can tune", sub: "Soft glow to full impact" },
  { icon: Layers, label: "Multi-zone layouts", sub: "Front, sides, and accents" },
  { icon: Sparkles, label: "Effects & presets", sub: "Motion, fades, and themes" },
  { icon: CalendarClock, label: "Schedules & timers", sub: "Set it and enjoy it" },
  { icon: Smartphone, label: "App-first control", sub: "Update looks in seconds" },
];

const steps = [
  {
    n: "1",
    title: "Free design consult",
    body: "We walk your property, plan placement, and show how the system fits your roofline.",
  },
  {
    n: "2",
    title: "Professional install",
    body: "Clean, concealed mounting and wiring so the system looks built-in — not bolted on.",
  },
  {
    n: "3",
    title: "Connect & customize",
    body: "We test everything, hand off the app, and help you build your first scenes and schedules.",
  },
];

const HomeMarketing = () => {
  const marqueeItems = [...OCCASIONS, ...OCCASIONS];

  return (
    <>
      {/* Occasion marquee — roofline “every celebration” energy */}
      <section className="relative border-y border-primary/15 bg-background py-5 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--background)) 0%, transparent 8%, transparent 92%, hsl(var(--background)) 100%)",
          }}
          aria-hidden
        />
        <p className="relative z-10 mb-3 text-center text-xs font-bold uppercase tracking-[0.28em] text-primary">
          Light up every occasion
        </p>
        <div className="relative w-full overflow-x-hidden py-1">
          <div className="flex w-max animate-marquee gap-3 pr-3 motion-reduce:animate-none">
            {marqueeItems.map((label, i) => (
              <span
                key={`${label}-${i}`}
                className="inline-flex shrink-0 items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-foreground shadow-sm shadow-primary/5"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-section-aurora py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display leading-[0.95] text-gradient-vibrant">
              One system. One install. Countless looks.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground md:text-xl">
              Millions of hues, crisp whites, and motion-ready effects — tuned for Central Texas homes and the
              way you actually live outside.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border-gradient-card p-6 shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/15 blur-2xl transition-opacity group-hover:opacity-100" />
                <Icon className="relative mb-4 h-10 w-10 text-primary drop-shadow-[0_0_12px_hsl(207_90%_54%/0.45)]" />
                <h3 className="relative font-display text-2xl tracking-wide text-foreground">{title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Smart controls</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display text-gradient-silver">
              Punch in a new vibe from your phone
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {controlFeatures.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-2xl border border-primary/20 bg-card/80 px-3 py-6 text-center backdrop-blur-sm transition-colors hover:border-primary/45 hover:bg-primary/5"
              >
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                </span>
                <span className="text-sm font-bold text-foreground">{label}</span>
                <span className="mt-1 text-xs text-muted-foreground">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-gradient-to-b from-card/40 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">How it works</p>
              <h2 className="mt-2 text-4xl sm:text-5xl font-display leading-none text-gradient-silver">
                Transform your nights in three steps
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Straightforward process, clear expectations, and a crew that respects your property from consult to
                final walkthrough.
              </p>
              <Link
                to="/contact"
                className="btn-vibrant-primary mt-8 inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-base font-bold text-primary-foreground"
              >
                Get a free estimate
              </Link>
            </div>
            <ol className="space-y-5">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="flex gap-5 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-colors hover:border-primary/30"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[hsl(265_90%_50%)] font-display text-2xl text-primary-foreground shadow-lg shadow-primary/25">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-xl tracking-wide text-foreground">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeMarketing;
