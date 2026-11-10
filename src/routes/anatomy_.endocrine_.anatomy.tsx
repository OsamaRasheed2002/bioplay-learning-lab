import { createFileRoute } from "@tanstack/react-router";
import { EndocrineLesson } from "@/components/bio/EndocrineLesson";
import { endocrineHead } from "@/data/endocrine";
export const Route = createFileRoute("/anatomy_/endocrine_/anatomy")({
  head: () => endocrineHead("Endocrine Anatomy", "Select major endocrine glands on a detailed labelled anatomical chart and discover their roles."),
  component: () => <EndocrineLesson section="anatomy" />,
});