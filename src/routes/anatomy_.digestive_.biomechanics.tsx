import { createFileRoute } from "@tanstack/react-router";
import { DigestiveLesson } from "@/components/bio/DigestiveLesson";
import { digestiveHead } from "@/data/digestive";

export const Route = createFileRoute("/anatomy_/digestive_/biomechanics")({
  head: () => digestiveHead("Digestive Biomechanics", "Explore peristalsis, segmentation, stomach stretch and sphincter control with simple interactive gut mechanics."),
  component: () => <DigestiveLesson section="biomechanics" />,
});