import { createFileRoute } from "@tanstack/react-router";
import { NervousLesson } from "@/components/bio/NervousLesson";
import { nervousHead } from "@/data/nervous";

export const Route = createFileRoute("/anatomy_/nervous_/reflexes")({
  head: () => nervousHead("Reflexes & Movement", "Step through a withdrawal reflex and discover how nerve signals, muscle contraction and feedback produce movement."),
  component: () => <NervousLesson section="reflexes" />,
});