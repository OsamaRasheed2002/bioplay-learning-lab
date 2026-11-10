import { createFileRoute } from "@tanstack/react-router";
import { MuscularLesson } from "@/components/bio/MuscularLesson";
import { muscularHead } from "@/data/muscular";
export const Route = createFileRoute("/anatomy_/muscular_/anatomy")({
  head: () => muscularHead("Muscular System Anatomy", "Select five major muscle groups to highlight their location and discover their movements."),
  component: () => <MuscularLesson section="anatomy" />,
});