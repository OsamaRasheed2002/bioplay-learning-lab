import { Link } from "@tanstack/react-router";

import { BioLogo } from "@/components/bio/BioLogo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <BioLogo />
          <p className="text-sm text-muted-foreground">
            A playful lab for curious minds — learn biomedical engineering by exploring, tinkering
            and playing.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          <Link to="/anatomy" className="text-muted-foreground hover:text-foreground">
            Anatomy Explorer
          </Link>
          <Link to="/concepts" className="text-muted-foreground hover:text-foreground">
            BME Concepts
          </Link>
          <Link to="/signals" className="text-muted-foreground hover:text-foreground">
            Signals Lab
          </Link>
          <Link to="/challenges" className="text-muted-foreground hover:text-foreground">
            Challenges
          </Link>
          <Link to="/devices" className="text-muted-foreground hover:text-foreground">
            Medical Devices
          </Link>
          <Link to="/progress" className="text-muted-foreground hover:text-foreground">
            My Progress
          </Link>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} BioPlay · Made for future biomedical engineers
      </div>
    </footer>
  );
}
