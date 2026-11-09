import { createFileRoute } from "@tanstack/react-router";

import { ModulePage } from "@/components/bio/ModulePage";

export const Route = createFileRoute("/signals")({
  head: () => ({
    meta: [
      { title: "Biomedical Signals Lab — BEPlay" },
      { name: "description", content: "Record, filter and decode ECG, EEG and EMG signals in a virtual lab." },
      { property: "og:title", content: "Biomedical Signals Lab — BEPlay" },
      { property: "og:description", content: "Record, filter and decode ECG, EEG and EMG signals in a virtual lab." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePage id="signals" />,
});
