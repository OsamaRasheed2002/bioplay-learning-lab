import { Link } from "@tanstack/react-router";

const TABS = [
  { to: "/devices/stenosis", label: "What is stenosis" },
  { to: "/devices/stenosis/stents", label: "Stents" },
] as const;

export function StenosisTabs() {
  return <nav className="mt-6 flex flex-wrap gap-2" aria-label="Stenosis sections">
    {TABS.map(t => <Link key={t.to} to={t.to} activeOptions={{ exact: true }}
      className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5"
      activeProps={{ className: "border-mint bg-mint/15" }}>{t.label}</Link>)}
  </nav>;
}
