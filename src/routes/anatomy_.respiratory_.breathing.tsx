import { createFileRoute } from "@tanstack/react-router";
import { RespiratoryLesson } from "@/components/bio/RespiratoryLesson";
import { respiratoryHead } from "@/data/respiratory";

export const Route = createFileRoute("/anatomy_/respiratory_/breathing")({
  head: () => respiratoryHead("How Breathing Works", "Explore inhalation, quiet exhalation and gas exchange in the alveoli."),
  component: () => <RespiratoryLesson section="breathing" />,
});