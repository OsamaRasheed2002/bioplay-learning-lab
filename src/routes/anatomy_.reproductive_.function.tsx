import { createFileRoute } from "@tanstack/react-router";
import { ReproductiveLesson } from "@/components/bio/ReproductiveLesson";
import { reproductiveHead } from "@/data/reproductive";
export const Route = createFileRoute("/anatomy_/reproductive_/function")({
  head: () => reproductiveHead("How Reproduction Works", "Follow reproductive cells, the menstrual cycle, fertilisation and implantation with a short engineering connection."),
  component: () => <ReproductiveLesson section="function" />,
});