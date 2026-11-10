import { createFileRoute } from "@tanstack/react-router";
import { NervousLesson } from "@/components/bio/NervousLesson";
import { nervousHead } from "@/data/nervous";

export const Route = createFileRoute("/anatomy_/nervous_/signals")({
  head: () => nervousHead("How Nerves Work", "Follow a nerve signal through dendrites, the axon, myelin and synapses in a short visual neuron lesson."),
  component: () => <NervousLesson section="signals" />,
});