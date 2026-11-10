import { createFileRoute } from "@tanstack/react-router";
import { SkinLesson } from "@/components/bio/SkinLesson";
import { skinHead } from "@/data/integumentary";
export const Route = createFileRoute("/anatomy_/integumentary_/functions")({
  head: () => skinHead("How Skin Works", "Discover how skin protects the body, senses the environment and helps control temperature."),
  component: () => <SkinLesson section="functions" />,
});