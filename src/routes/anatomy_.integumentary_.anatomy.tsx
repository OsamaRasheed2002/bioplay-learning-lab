import { createFileRoute } from "@tanstack/react-router";
import { SkinLesson } from "@/components/bio/SkinLesson";
import { skinHead } from "@/data/integumentary";
export const Route = createFileRoute("/anatomy_/integumentary_/anatomy")({
  head: () => skinHead("Skin Anatomy", "Select the skin layers, hair follicles and glands on a detailed cross-section to discover their functions."),
  component: () => <SkinLesson section="anatomy" />,
});