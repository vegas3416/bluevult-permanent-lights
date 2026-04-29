import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Building2, Home, MapPin, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
} from "@/lib/seo/siteConfig";
import {
  type HouseScope,
  formatUsdRange,
  getHouseBallparkRange,
} from "@/lib/pricing/ballparkHouseRanges";

type StoriesKind = "single" | "multi";

function ChoiceCard({
  selected,
  onClick,
  icon: Icon,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition-all sm:p-5 ${
        selected
          ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
          : "border-border bg-card/60 hover:border-primary/40 hover:bg-card"
      }`}
    >
      <Icon className={`h-7 w-7 ${selected ? "text-primary" : "text-muted-foreground"}`} aria-hidden />
      <span className="font-display text-lg tracking-wide text-foreground">{title}</span>
      <span className="text-sm text-muted-foreground">{description}</span>
    </button>
  );
}

const BallparkEstimator = () => {
  const [propertyType, setPropertyType] = useState<PropertyKind | null>(null);
  const [stories, setStories] = useState<StoriesKind | null>(null);
  const [scope, setScope] = useState<HouseScope | null>(null);
  const [address, setAddress] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [callbackWindow, setCallbackWindow] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [houseDone, setHouseDone] = useState(false);
  const [businessDone, setBusinessDone] = useState(false);

  const houseRange = useMemo(() => {
    if (!scope) return null;
    return getHouseBallparkRange(scope);
  }, [scope]);

  function reset() {
    setPropertyType(null);
    setStories(null);
    setScope(null);
    setAddress("");
    setBusinessAddress("");
    setCallbackWindow("");
    setError(null);
    setHouseDone(false);
    setBusinessDone(false);
  }

  function validateHouseSubmit() {
    setError(null);
    if (!stories || !scope) {
      setError("Please complete the steps above.");
      return;
    }
    if (address.trim().length < 8) {
      setError("Please enter a full street address so we can contextualize your estimate.");
      return;
    }
    setHouseDone(true);
  }

  function validateBusinessSubmit() {
    setError(null);
    if (businessAddress.trim().length < 8) {
      setError("Please enter the property or business address.");
      return;
    }
    if (callbackWindow.trim().length < 12) {
      setError(
        "Please add a preferred time window for a call or on-site visit (for example: weekday mornings, or Tue 3/4 after 2pm).",
      );
      return;
    }
    setBusinessDone(true);
  }

  return (
    <div className="rounded-3xl border border-primary/20 bg-gradient-to-b from-card/90 to-background p-6 shadow-xl shadow-black/20 sm:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-3xl tracking-wide text-gradient-vibrant sm:text-4xl">
            Ballpark pricing
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Quick estimator for <strong className="text-foreground">residential</strong> roofline lighting.
            Commercial projects need a walkthrough—we collect your details and follow up to schedule in person.
          </p>
        </div>
        {(propertyType || houseDone || businessDone) && (
          <Button type="button" variant="outline" size="sm" className="shrink-0 gap-2" onClick={reset}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            Start over
          </Button>
        )}
      </div>

      {error ? (
        <p className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {/* Step 1: property type */}
      {propertyType === null ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <ChoiceCard
            selected={false}
            onClick={() => {
              setError(null);
              setPropertyType("house");
            }}
            icon={Home}
            title="House / residential"
            description="Single or multi-story home — we’ll suggest a typical budget range after a few questions."
          />
          <ChoiceCard
            selected={false}
            onClick={() => {
              setError(null);
              setPropertyType("business");
            }}
            icon={Building2}
            title="Business / commercial"
            description="We’ll ask for an address and the best time to meet on site. No automated price."
          />
        </div>
      ) : null}

      {/* House flow */}
      {propertyType === "house" && !houseDone ? (
        <div className="space-y-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Step 2</p>
            <p className="mb-3 font-medium text-foreground">How many stories on the main lit section?</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <ChoiceCard
                selected={stories === "single"}
                onClick={() => setStories("single")}
                icon={Home}
                title="Single story"
                description="Typical one-level home or main roofline is a single level."
              />
              <ChoiceCard
                selected={stories === "multi"}
                onClick={() => setStories("multi")}
                icon={Home}
                title="Two stories or more"
                description="Multi-level rooflines often need extra access planning."
              />
            </div>
          </div>

          {stories ? (
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Step 3</p>
              <p className="mb-3 font-medium text-foreground">How much roofline are we lighting?</p>
              <div className="grid gap-3 md:grid-cols-3">
                {(
                  [
                    { id: "front" as const, t: "Front only", d: "Street-facing roofline." },
                    { id: "front_sides" as const, t: "Front + sides", d: "Front plus visible side rooflines." },
                    { id: "full" as const, t: "Full wrap", d: "Around the full perimeter where it applies." },
                  ] as const
                ).map((row) => (
                  <ChoiceCard
                    key={row.id}
                    selected={scope === row.id}
                    onClick={() => setScope(row.id)}
                    icon={MapPin}
                    title={row.t}
                    description={row.d}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {stories && scope ? (
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Step 4</p>
              <Label htmlFor="home-address" className="text-foreground">
                Property address
              </Label>
              <Input
                id="home-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street, city, ZIP"
                className="mt-2"
                autoComplete="street-address"
              />
              <Button type="button" className="btn-vibrant-primary mt-4 font-bold" onClick={validateHouseSubmit}>
                Show my ballpark range
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}

      {propertyType === "house" && houseDone && stories && scope && houseRange ? (
        <div className="space-y-4 rounded-2xl border border-primary/25 bg-primary/5 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Your ballpark range</p>
          <p className="font-display text-3xl text-foreground sm:text-4xl">{formatUsdRange(houseRange[0], houseRange[1])}</p>
          <p className="text-sm text-muted-foreground">
            Based on <strong className="text-foreground">{scope === "front" ? "front only" : scope === "front_sides" ? "front and sides" : "full wrap"}</strong> for a{" "}
            <strong className="text-foreground">{stories === "single" ? "single-story" : "multi-story"}</strong> home. Final pricing depends on roof access, electrical
            details, and exact linear footage—we confirm everything on site before work begins.
          </p>
          {stories === "multi" ? (
            <p className="rounded-lg border border-border/80 bg-background/60 p-3 text-sm text-muted-foreground">
              <strong className="text-foreground">Multi-level homes:</strong> eave depth, roof pitch, and the lift
              or ladder setup we need for safe installs can shift the job meaningfully. The range above is still a
              ballpark—walkthroughs are especially important when multiple levels are in play.
            </p>
          ) : null}
          <p className="text-xs text-muted-foreground">Address on file: {address.trim()}</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button asChild className="btn-vibrant-primary font-bold">
              <Link to="/contact">Lock in a free estimate</Link>
            </Button>
            <Button asChild variant="outline">
              <a href={BUSINESS_PHONE_TEL}>Call {BUSINESS_PHONE_DISPLAY}</a>
            </Button>
          </div>
        </div>
      ) : null}

      {/* Business flow */}
      {propertyType === "business" && !businessDone ? (
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Commercial follow-up</p>
          <p className="text-sm text-muted-foreground">
            We don’t ballpark commercial installs from a form—roof access, signage rules, and electrical service vary
            too much. Tell us where to meet and when to call, and we’ll follow up to schedule an on-site visit.
          </p>
          <div>
            <Label htmlFor="biz-address">Business / property address</Label>
            <Input
              id="biz-address"
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              className="mt-2"
              placeholder="Street, suite if any, city, ZIP"
              autoComplete="street-address"
            />
          </div>
          <div>
            <Label htmlFor="biz-callback">Preferred call or on-site visit times</Label>
            <Textarea
              id="biz-callback"
              value={callbackWindow}
              onChange={(e) => setCallbackWindow(e.target.value)}
              className="mt-2 min-h-[100px]"
              placeholder="Example: Weekday mornings after 9am, or Thu 4/17 between 1–4pm for a walkthrough."
            />
          </div>
          <Button type="button" className="btn-vibrant-primary font-bold" onClick={validateBusinessSubmit}>
            See next steps
          </Button>
        </div>
      ) : null}

      {propertyType === "business" && businessDone ? (
        <div className="space-y-4 rounded-2xl border border-primary/25 bg-primary/5 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Next steps</p>
          <p className="text-sm text-muted-foreground">
            Thanks—we’ll use your address and availability to schedule an in-person walkthrough. Mention{" "}
            <strong className="text-foreground">commercial ballpark</strong> when you reach out so we can match this
            request to you quickly.
          </p>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            <li>
              <span className="text-foreground">Address:</span> {businessAddress.trim()}
            </li>
            <li>
              <span className="text-foreground">Your timing notes:</span> {callbackWindow.trim()}
            </li>
          </ul>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button asChild className="btn-vibrant-primary font-bold">
              <Link to="/contact">Go to contact form</Link>
            </Button>
            <Button asChild variant="outline">
              <a href={BUSINESS_PHONE_TEL}>Call {BUSINESS_PHONE_DISPLAY}</a>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BallparkEstimator;
