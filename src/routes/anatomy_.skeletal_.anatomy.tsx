import { createFileRoute } from "@tanstack/react-router";
import { SkeletalLesson } from "@/components/bio/SkeletalLesson";
import { skeletalHead } from "@/data/skeletal";

export const Route = createFileRoute("/anatomy_/skeletal_/anatomy")({
  head: () => skeletalHead("Skeletal Anatomy", "Meet the skull, spine, rib cage, pelvis and long bones with a highlighted skeleton."),
  component: () => <SkeletalLesson section="anatomy" />,
});
