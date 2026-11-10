import { createFileRoute } from "@tanstack/react-router";
import { EndocrineLesson } from "@/components/bio/EndocrineLesson";
import { endocrineHead } from "@/data/endocrine";
export const Route = createFileRoute("/anatomy_/endocrine_/hormones")({
  head: () => endocrineHead("How Hormones Work", "Follow a hormone from gland to target cells and explore negative feedback through blood glucose control."),
  component: () => <EndocrineLesson section="hormones" />,
});