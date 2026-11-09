import { createFileRoute } from "@tanstack/react-router";

import { ModulePage } from "@/components/bio/ModulePage";

export const Route = createFileRoute("/anatomy")({
  head: () => ({
    meta: [
      { title: "Anatomy Explorer — BEPlay" },
      { name: "description", content: "Explore interactive organ systems and see how human anatomy works." },
      { property: "og:title", content: "Anatomy Explorer — BEPlay" },
      { property: "og:description", content: "Explore interactive organ systems and see how human anatomy works." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePage id="anatomy" />,
});
