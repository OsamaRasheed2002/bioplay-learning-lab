import { createFileRoute } from "@tanstack/react-router";
import { UrinaryLesson } from "@/components/bio/UrinaryLesson";
import { urinaryHead } from "@/data/urinary";
export const Route = createFileRoute("/anatomy_/urinary_/anatomy")({
  head: () => urinaryHead("Urinary Anatomy", "Select kidneys, ureters, bladder and urethra on a detailed anatomical illustration."),
  component: () => <UrinaryLesson section="anatomy" />,
});