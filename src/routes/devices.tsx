import { createFileRoute } from "@tanstack/react-router";

import { ModulePage } from "@/components/bio/ModulePage";

export const Route = createFileRoute("/devices")({
  head: () => ({
    meta: [
      { title: "Medical Devices — BEPlay" },
      { name: "description", content: "Take apart pacemakers, oximeters and MRI scanners to learn the engineering inside." },
      { property: "og:title", content: "Medical Devices — BEPlay" },
      { property: "og:description", content: "Take apart pacemakers, oximeters and MRI scanners to learn the engineering inside." },
    ],
  }),
  component: () => <ModulePage id="devices" />,
});
