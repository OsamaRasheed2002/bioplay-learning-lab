export const NERVOUS_SECTIONS = [
  { id: "anatomy", to: "/anatomy/nervous/anatomy", title: "Simple Anatomy", description: "The brain, spinal cord and nerves that connect the body.", tone: "lavender" },
  { id: "signals", to: "/anatomy/nervous/signals", title: "How Nerves Work", description: "Meet a neuron and follow a message from start to finish.", tone: "sky" },
  { id: "reflexes", to: "/anatomy/nervous/reflexes", title: "Reflexes & Movement", description: "Fast responses, muscle control and a little engineering.", tone: "mint" },
] as const;

export type NervousSection = typeof NERVOUS_SECTIONS[number]["id"];

export const NERVOUS_PARTS = [
  { name: "Brain", text: "Processes sensory information and coordinates thinking, memory and movement. The cerebellum helps with balance and coordination; the brainstem helps control vital functions such as breathing.", group: "Central nervous system · CNS" },
  { name: "Spinal cord", text: "Carries messages between the brain and body and coordinates many reflexes. It lies inside the vertebral column and ends around the upper lumbar region in adults; the nerve roots continue below it.", group: "Central nervous system · CNS" },
  { name: "Peripheral nerves", text: "Connect the brain and spinal cord to the rest of the body. Sensory fibres bring information in; motor fibres carry instructions to muscles and glands.", group: "Peripheral nervous system · PNS" },
] as const;

export const NEURON_STEPS = [
  { name: "Dendrites & cell body", text: "Dendrites receive signals from other cells. The cell body integrates these inputs; if the trigger region reaches threshold, an action potential begins." },
  { name: "Axon", text: "An action potential travels along the axon as ion channels open and close. It is a brief change in membrane voltage, not electricity flowing through a metal wire." },
  { name: "Myelin & nodes", text: "Myelin insulates parts of the axon. The signal is regenerated at the gaps, called nodes of Ranvier, allowing faster conduction along a myelinated nerve fibre." },
  { name: "Axon terminals & synapse", text: "At most synapses, the arriving signal triggers neurotransmitter release. These chemicals cross a tiny gap and affect the next neuron, muscle or gland." },
] as const;

export const REFLEX_STEPS = [
  { name: "Receptor", text: "A painful heat stimulus activates sensory receptors in the skin." },
  { name: "Sensory neuron", text: "A signal travels from the skin toward the spinal cord." },
  { name: "Spinal cord", text: "Interneurons in the spinal cord pass the signal to motor neurons. The brain also receives information, but the withdrawal can begin before conscious awareness." },
  { name: "Motor neuron", text: "A signal travels out from the spinal cord to the muscles that pull the limb away." },
  { name: "Muscle response", text: "Flexor muscles contract while opposing muscles are inhibited, withdrawing the hand. This is a simplified withdrawal reflex, not a test to try with a hot object." },
] as const;

export function nervousHead(title: string, description: string) {
  return { meta: [
    { title: `${title} · BEPlay` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} · BEPlay` },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] };
}