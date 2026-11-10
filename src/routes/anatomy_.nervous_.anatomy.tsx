import { createFileRoute } from "@tanstack/react-router";
import { NervousLesson } from "@/components/bio/NervousLesson";
import { nervousHead } from "@/data/nervous";

export const Route = createFileRoute("/anatomy_/nervous_/anatomy")({
  head: () => nervousHead("Nervous System Anatomy", "Explore the brain, spinal cord and peripheral nerves with a realistic anatomical illustration and selectable highlights."),
  component: () => <NervousLesson section="anatomy" />,
});