import { createFileRoute } from "@tanstack/react-router";
import { SkeletalLesson } from "@/components/bio/SkeletalLesson";
import { skeletalHead } from "@/data/skeletal";

export const Route = createFileRoute("/anatomy_/skeletal_/biomechanics")({
  head: () => skeletalHead("Bone Biomechanics", "A light introduction to bone loading, Wolff's law and implant design."),
  component: () => <SkeletalLesson section="biomechanics" />,
});
