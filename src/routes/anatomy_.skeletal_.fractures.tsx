import { createFileRoute } from "@tanstack/react-router";
import { SkeletalLesson } from "@/components/bio/SkeletalLesson";
import { skeletalHead } from "@/data/skeletal";

export const Route = createFileRoute("/anatomy_/skeletal_/fractures")({
  head: () => skeletalHead("Fracture Types", "The four main ways a bone can break, and what causes each one."),
  component: () => <SkeletalLesson section="fractures" />,
});
