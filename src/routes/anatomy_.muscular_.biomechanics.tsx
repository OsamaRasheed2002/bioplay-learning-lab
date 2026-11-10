import { createFileRoute } from "@tanstack/react-router";
import { MuscularLesson } from "@/components/bio/MuscularLesson";
import { muscularHead } from "@/data/muscular";

export const Route = createFileRoute("/anatomy_/muscular_/biomechanics")({
  head: () => muscularHead("Muscle Biomechanics", "Explore concentric, eccentric and isometric muscle action with simple lifting examples and a short introduction to joint leverage."),
  component: () => <MuscularLesson section="biomechanics" />,
});