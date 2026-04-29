import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/sonner";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const passwordSchema = z
  .object({
    password: z.string().min(8, "Use at least 8 characters"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

type Phase = "loading" | "ready" | "invalid" | "success" | "noconfig";

/** Password reset, team invite, signup confirmation, etc. — all land here with tokens in the URL. */
function readEmailAuthLinkSignals() {
  const hash = window.location.hash;
  const hashParams = new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : hash);
  const search = new URLSearchParams(window.location.search);

  const type = hashParams.get("type") ?? search.get("type");
  const hasImplicitTokens = hashParams.has("access_token");
  const hintedEmailAuth =
    type === "recovery" ||
    type === "invite" ||
    type === "signup" ||
    type === "magiclink" ||
    hasImplicitTokens;

  const hadPkceCode = search.has("code");
  return { type, hintedEmailAuth, hadPkceCode };
}

const ResetPassword = () => {
  const [phase, setPhase] = useState<Phase>("loading");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const allowResetRef = useRef(false);

  const applyAllowReset = useCallback(() => {
    allowResetRef.current = true;
    setPhase("ready");
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setPhase("noconfig");
      return;
    }

    const signals = readEmailAuthLinkSignals();
    const hintedEmailAuth =
      signals.hintedEmailAuth || signals.hadPkceCode;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        applyAllowReset();
        return;
      }
      // Invites / email confirmations often establish a session as SIGNED_IN (not PASSWORD_RECOVERY).
      if (event === "SIGNED_IN" && hintedEmailAuth) {
        applyAllowReset();
      }
    });

    let cancelled = false;

    const safeSetPhase = (next: Phase) => {
      if (cancelled || allowResetRef.current) return;
      setPhase(next);
    };

    async function getSessionAfterUrlParse() {
      for (let i = 0; i < 6; i++) {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) return { session: null as const, error: sessionError };
        if (session) return { session, error: null };
        await new Promise((r) => setTimeout(r, 120));
      }
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      return { session, error: sessionError };
    }

    (async () => {
      try {
        if (signals.hadPkceCode) {
          const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
          if (cancelled) return;
          if (error) {
            console.error(error);
            safeSetPhase("invalid");
            return;
          }
          allowResetRef.current = true;
          const u = new URL(window.location.href);
          window.history.replaceState({}, "", `${u.pathname}${u.hash}`);
        }

        const { session, error: sessionError } = await getSessionAfterUrlParse();

        if (cancelled || allowResetRef.current) {
          if (allowResetRef.current) setPhase("ready");
          return;
        }

        if (sessionError) {
          console.error(sessionError);
          safeSetPhase("invalid");
          return;
        }

        if (session && (hintedEmailAuth || allowResetRef.current)) {
          setPhase("ready");
          return;
        }

        if (!session && hintedEmailAuth) {
          safeSetPhase("invalid");
          return;
        }

        safeSetPhase("invalid");
      } catch (e) {
        console.error(e);
        if (!cancelled) safeSetPhase("invalid");
      }
    })();

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [applyAllowReset]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || phase !== "ready") return;

    const parsed = passwordSchema.safeParse({ password, confirm });
    if (!parsed.success) {
      const msg = parsed.error.flatten().fieldErrors;
      const first = msg.password?.[0] || msg.confirm?.[0] || "Check your password fields.";
      toast.error(first);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
    setSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setPhase("success");
    toast.success("Password updated");
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Set password — BlueVult Lighting"
        description="Set or reset your BlueVult account password."
        path="/reset-password"
        noIndex
      />
      <Navbar />

      <main className="container mx-auto px-6 py-24">
        <section className="max-w-md mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-3 text-center">
            Account
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Set your password</CardTitle>
              <CardDescription>
                Open this page from the link in your email (password reset or team invitation). Then choose a
                password below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {phase === "loading" && (
                <div className="flex items-center gap-2 text-muted-foreground py-6 justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Verifying link…</span>
                </div>
              )}

              {phase === "noconfig" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Supabase is not configured</AlertTitle>
                  <AlertDescription>
                    Add <code className="text-xs">VITE_SUPABASE_URL</code> and{" "}
                    <code className="text-xs">VITE_SUPABASE_ANON_KEY</code> to your{" "}
                    <code className="text-xs">.env</code>, then restart the dev server.
                  </AlertDescription>
                </Alert>
              )}

              {phase === "invalid" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Link invalid or expired</AlertTitle>
                  <AlertDescription className="space-y-3">
                    <p>
                      Request a new reset or ask your admin to resend the team invite, then open the new link
                      in this browser.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/">Back to home</Link>
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {phase === "ready" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-password">New password</Label>
                    <Input
                      id="reset-password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reset-password-confirm">Confirm password</Label>
                    <Input
                      id="reset-password-confirm"
                      type="password"
                      autoComplete="new-password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Updating…
                      </>
                    ) : (
                      "Update password"
                    )}
                  </Button>
                </form>
              )}

              {phase === "success" && (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Password updated</AlertTitle>
                  <AlertDescription className="space-y-3">
                    <p>You can close this tab and sign in with your new password.</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/">Back to home</Link>
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPassword;
