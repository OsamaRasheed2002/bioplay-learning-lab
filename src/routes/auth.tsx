import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LovableMark } from "@lovable.dev/cloud-auth-js/react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — BEPlay" },
      { name: "description", content: "Sign in to BEPlay so your XP and progress follow you on every device." },
      { property: "og:title", content: "Sign in — BEPlay" },
      { property: "og:description", content: "Sign in to BEPlay so your XP and progress follow you on every device." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const GoogleG = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.860c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.130 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
);

function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (user) void navigate({ to: "/progress" });
  }, [user, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin, data: { display_name: name.trim() } },
      });
      if (error) toast.error(error.message);
      else setSent(true);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
    }
    setBusy(false);
  };

  const social = async (provider: "google" | "lovable") => {
    const r = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
    if (r.error) toast.error("Sign-in didn't work, please try again.");
  };

  return (
    <section className="px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-md animate-fade-up rounded-3xl border border-border bg-card p-7 shadow-float sm:p-9">
        <span className="font-mono text-xs uppercase tracking-widest text-mint-deep">Your BEPlay account</span>
        <h1 className="mt-2 text-4xl font-bold">{mode === "signin" ? "Welcome back" : "Create account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your XP, streak and badges follow you on every device.</p>

        {sent ? (
          <p className="mt-6 rounded-2xl bg-mint-soft p-4 text-sm">
            Check your email and click the link to confirm your account, then sign in.
          </p>
        ) : (
          <>
            <div className="mt-6 grid gap-2">
              <Button type="button" variant="outline" className="h-11 border-[#8E918F] bg-[#131314] text-[#E3E3E3] hover:bg-[#131314]/90 hover:text-[#E3E3E3]" onClick={() => social("google")}>
                <GoogleG /> Continue with Google
              </Button>
              <Button type="button" variant="outline" className="h-11" onClick={() => social("lovable")}>
                <LovableMark /> Continue with Lovable
              </Button>
            </div>
            <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or with email <span className="h-px flex-1 bg-border" />
            </div>
            <form onSubmit={submit} className="grid gap-3">
              {mode === "signup" && (
                <Input required placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)} />
              )}
              <Input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input required type="password" minLength={6} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" className="h-11" disabled={busy}>
                {mode === "signin" ? "Sign in" : "Create account"}
              </Button>
            </form>
            <button
              type="button"
              className="mt-4 text-sm text-muted-foreground underline-offset-4 hover:underline"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
