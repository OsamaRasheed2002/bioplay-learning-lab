import { createFileRoute } from "@tanstack/react-router";

import { ModulePage } from "@/components/bio/ModulePage";

export const Route = createFileRoute("/concepts")({
  head: () => ({
    meta: [
      { title: "Biomedical Engineering Concepts — BEPlay" },
      { name: "description", content: "Biomechanics, biomaterials and bioinstrumentation explained visually." },
      { property: "og:title", content: "Biomedical Engineering Concepts — BEPlay" },
      { property: "og:description", content: "Biomechanics, biomaterials and bioinstrumentation explained visually." },
    ],
  }),
  component: () => <ModulePage id="concepts" />,
});
