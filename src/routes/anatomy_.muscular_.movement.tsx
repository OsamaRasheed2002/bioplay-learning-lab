import { createFileRoute } from "@tanstack/react-router";
import { MuscularLesson } from "@/components/bio/MuscularLesson";
import { muscularHead } from "@/data/muscular";
export const Route = createFileRoute("/anatomy_/muscular_/movement")({
  head: () => muscularHead("How Muscles Work", "Explore sliding filaments, opposing muscle pairs and the biomechanics behind movement."),
  component: () => <MuscularLesson section="movement" />,
});