import { createFileRoute } from "@tanstack/react-router";
import { RespiratoryLesson } from "@/components/bio/RespiratoryLesson";
import { respiratoryHead } from "@/data/respiratory";

export const Route = createFileRoute("/anatomy_/respiratory_/anatomy")({
  head: () => respiratoryHead("Respiratory Anatomy", "Meet the trachea, bronchi, lungs, alveoli and diaphragm with a visual introduction."),
  component: () => <RespiratoryLesson section="anatomy" />,
});