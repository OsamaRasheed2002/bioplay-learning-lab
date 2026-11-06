import { createFileRoute } from "@tanstack/react-router";

import { VesselLesson } from "@/components/bio/VesselLesson";
import { VEIN } from "@/data/cardio";

const T = "Veins — Wall Layers & Valves · BEPlay";
const D = "Explore the three layers of a vein wall, what each is made of, and how valves keep blood moving.";

export const Route = createFileRoute("/anatomy_/veins")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <VesselLesson vessel={VEIN} unit="Cardiovascular system · Section 4" />,
});
