import { createFileRoute } from "@tanstack/react-router";
import { SkeletalLesson } from "@/components/bio/SkeletalLesson";
import { skeletalHead } from "@/data/skeletal";

export const Route = createFileRoute("/anatomy_/skeletal_/bones")({
  head: () => skeletalHead("How Bones Work", "See what is inside a bone and how different joints let you move."),
  component: () => <SkeletalLesson section="bones" />,
});
