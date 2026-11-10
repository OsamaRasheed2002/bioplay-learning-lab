import { createFileRoute } from "@tanstack/react-router";
import { DigestiveLesson } from "@/components/bio/DigestiveLesson";
import { digestiveHead } from "@/data/digestive";

export const Route = createFileRoute("/anatomy_/digestive_/digestion")({
  head: () => digestiveHead("How Digestion Works", "Follow a meal through chewing, stomach mixing, nutrient absorption and waste removal with a step-by-step visual lesson."),
  component: () => <DigestiveLesson section="digestion" />,
});