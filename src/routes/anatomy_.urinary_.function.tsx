import { createFileRoute } from "@tanstack/react-router";
import { UrinaryLesson } from "@/components/bio/UrinaryLesson";
import { urinaryHead } from "@/data/urinary";
export const Route = createFileRoute("/anatomy_/urinary_/function")({
  head: () => urinaryHead("How the Urinary System Works", "Follow kidney filtration, water recovery, urine storage and release, with a short link to dialysis."),
  component: () => <UrinaryLesson section="function" />,
});