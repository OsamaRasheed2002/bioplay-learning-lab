import { createFileRoute } from "@tanstack/react-router";
import { DigestiveLesson } from "@/components/bio/DigestiveLesson";
import { digestiveHead } from "@/data/digestive";

export const Route = createFileRoute("/anatomy_/digestive_/anatomy")({
  head: () => digestiveHead("Digestive System Anatomy", "Select and highlight the mouth, oesophagus, stomach, intestines and accessory digestive organs on a realistic anatomical picture."),
  component: () => <DigestiveLesson section="anatomy" />,
});