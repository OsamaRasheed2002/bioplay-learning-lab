export const SKELETAL_SECTIONS = [
  { id: "anatomy", to: "/anatomy/skeletal/anatomy", title: "Simple Anatomy", description: "The main bones and where they sit.", tone: "mint" },
  { id: "bones", to: "/anatomy/skeletal/bones", title: "How Bones Work", description: "Inside a bone, and how joints let you move.", tone: "sky" },
  { id: "biomechanics", to: "/anatomy/skeletal/biomechanics", title: "Bone Biomechanics", description: "Loads, strength and adaptation, kept light.", tone: "lavender" },
] as const;

export type SkeletalSection = typeof SKELETAL_SECTIONS[number]["id"];

export const SKELETAL_PARTS = [
  { name: "Skull", text: "Protects the brain and forms the face. Most skull bones are locked together by fixed joints called sutures." },
  { name: "Spine", text: "33 stacked vertebrae protect the spinal cord. Discs between them absorb shock and let you bend and twist." },
  { name: "Rib cage", text: "12 pairs of ribs join the spine and sternum, shielding the heart and lungs while moving as you breathe." },
  { name: "Pelvis", text: "A strong bony ring that carries body weight from the spine into the legs and supports organs below the abdomen." },
  { name: "Long bones", text: "Arm and leg bones such as the femur and humerus act as levers. The femur is the longest, strongest bone in the body." },
] as const;

export const JOINT_TYPES = [
  { name: "Hinge", where: "Elbow, knee", text: "Bends in one direction, like a door hinge." },
  { name: "Ball & socket", where: "Shoulder, hip", text: "A rounded head in a cup — moves in almost every direction." },
  { name: "Pivot", where: "Top of the neck", text: "One bone rotates around another, letting you turn your head." },
  { name: "Fixed", where: "Skull sutures", text: "Bones locked together with no real movement, for protection." },
] as const;

export const LOADS = [
  { id: "compression", name: "Compression", text: "Squeezing forces, like standing. Bone is strongest against compression." },
  { id: "tension", name: "Tension", text: "Pulling forces, like a tendon tugging on bone. Bone handles this well, but less than compression." },
  { id: "bending", name: "Bending", text: "One side is squeezed, the other stretched. Many fractures start on the stretched side." },
  { id: "torsion", name: "Torsion", text: "Twisting, like planting a foot and turning. Can cause spiral fractures." },
] as const;

export type LoadId = typeof LOADS[number]["id"];

export function skeletalHead(title: string, description: string) {
  return { meta: [
    { title: `${title} · BEPlay` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} · BEPlay` },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] };
}
