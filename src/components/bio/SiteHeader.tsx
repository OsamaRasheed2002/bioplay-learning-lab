import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BioLogo } from "@/components/bio/BioLogo";
import { Button } from "@/components/ui/button";
import { levelFromXp, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/anatomy", label: "Anatomy Explorer" },
  { to: "/signals", label: "Signals Lab" },
  { to: "/devices", label: "Medical Devices" },
  { to: "/challenges", label: "Challenges" },
  { to: "/progress", label: "My Progress" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { progress } = useProgress();
  const { level } = levelFromXp(progress.xp);

  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("beplay.theme", next ? "dark" : "light");
    } catch {}
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 sm:px-4",
          scrolled ? "glass border-border shadow-soft" : "border-transparent",
        )}
      >
        <Link to="/" className="shrink-0 rounded-full" onClick={() => setOpen(false)}>
          <BioLogo />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-secondary !text-secondary-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/progress"
            className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold shadow-soft transition-colors hover:border-mint sm:inline-flex"
          >
            <Sparkles className="size-3.5 text-mint-deep" />
            <span className="font-mono">{progress.xp.toLocaleString()} XP</span>
            <span className="rounded-full bg-lavender-soft px-2 py-0.5 text-lavender-deep">
              Lv {level}
            </span>
          </Link>
          <Button
            variant="glass"
            size="icon"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Sun /> : <Moon />}
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          className="glass mx-auto mt-2 max-w-7xl animate-fade-up rounded-3xl border border-border p-2 shadow-float xl:hidden"
          aria-label="Mobile"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: item.to === "/" }}
              className="block rounded-2xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
