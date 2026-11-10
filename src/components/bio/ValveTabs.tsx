import { Link } from "@tanstack/react-router";

const TABS = [
  { to: "/devices/valves", label: "How valves work" },
  { to: "/devices/valves/history", label: "History" },
] as const;

export function ValveTabs() {
  return <nav className="mt-6 flex flex-wrap gap-2" aria-label="Artificial valves sections">
    {TABS.map(t => <Link key={t.to} to={t.to} activeOptions={{ exact: true }}
      className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5"
      activeProps={{ className: "border-mint bg-mint/15" }}>{t.label}</Link>)}
  </nav>;
}
