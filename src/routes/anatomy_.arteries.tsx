import { createFileRoute } from "@tanstack/react-router";

import { VesselLesson } from "@/components/bio/VesselLesson";
import { ARTERY } from "@/data/cardio";

const T = "Arteries — Wall Layers & Function · BEPlay";
const D = "Explore the three layers of an artery wall, what each is made of and what it does.";

export const Route = createFileRoute("/anatomy_/arteries")({
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
  component: () => <VesselLesson vessel={ARTERY} unit="Cardiovascular system · Section 3" />,
});
