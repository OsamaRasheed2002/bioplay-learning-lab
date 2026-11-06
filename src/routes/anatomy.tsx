import { createFileRoute } from "@tanstack/react-router";

import { ModulePage } from "@/components/bio/ModulePage";

export const Route = createFileRoute("/anatomy")({
  head: () => ({
    meta: [
      { title: "Anatomy Explorer — BioPlay" },
      { name: "description", content: "Explore interactive organ systems and see how human anatomy works." },
      { property: "og:title", content: "Anatomy Explorer — BioPlay" },
      { property: "og:description", content: "Explore interactive organ systems and see how human anatomy works." },
    ],
  }),
  component: () => <ModulePage id="anatomy" />,
});
