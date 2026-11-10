import { createFileRoute } from "@tanstack/react-router";
import { ReproductiveLesson } from "@/components/bio/ReproductiveLesson";
import { reproductiveHead } from "@/data/reproductive";
export const Route = createFileRoute("/anatomy_/reproductive_/anatomy")({
  head: () => reproductiveHead("Reproductive Anatomy", "Explore labelled male and female reproductive organs with short selectable explanations."),
  component: () => <ReproductiveLesson section="anatomy" />,
});