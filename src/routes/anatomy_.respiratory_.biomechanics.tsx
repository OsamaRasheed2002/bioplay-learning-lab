import { createFileRoute } from "@tanstack/react-router";
import { RespiratoryLesson } from "@/components/bio/RespiratoryLesson";
import { respiratoryHead } from "@/data/respiratory";

export const Route = createFileRoute("/anatomy_/respiratory_/biomechanics")({
  head: () => respiratoryHead("Breathing Biomechanics", "A light introduction to airflow resistance, lung compliance, elastic recoil and surfactant."),
  component: () => <RespiratoryLesson section="biomechanics" />,
});