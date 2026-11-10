export const SKELETAL_SECTIONS = [
  { id: "anatomy", to: "/anatomy/skeletal/anatomy", title: "Simple Anatomy", description: "The main bones and where they sit.", tone: "mint" },
  { id: "bones", to: "/anatomy/skeletal/bones", title: "How Bones Work", description: "Inside a bone, and how joints let you move.", tone: "sky" },
  { id: "biomechanics", to: "/anatomy/skeletal/biomechanics", title: "Bone Biomechanics", description: "Loads, strength and adaptation, kept light.", tone: "lavender" },
  { id: "fractures", to: "/anatomy/skeletal/fractures", title: "Fracture Types", description: "The four main ways a bone can break.", tone: "peach" },
] as const;

export type SkeletalSection = typeof SKELETAL_SECTIONS[number]["id"];

export const SKELETAL_PARTS = [
  { name: "Skull", text: "Protects the brain and forms the face. Most skull bones are locked together by fixed joints called sutures." },
  { name: "Spine", text: "33 stacked vertebrae protect the spinal cord. Discs between them absorb shock and let you bend and twist." },
  { name: "Rib cage", text: "12 pairs of ribs join the spine and sternum, shielding the heart and lungs while moving as you breathe." },
  { name: "Pelvis", text: "A strong bony ring that carries body weight from the spine into the legs and supports organs below the abdomen." },
  { name: "Long bones", text: "Arm and leg bones such as the femur and humerus act as levers. The femur is the longest, strongest bone in the body." },
] as const;

export const SKELETON_LABELS = [
  { name: "Skull", side: "left", x: 340, y: 70, ly: 70, text: "Protects the brain; its bones are joined by fixed sutures." },
  { name: "Clavicle", side: "left", x: 300, y: 252, ly: 230, text: "The collarbone — a strut linking the arm to the trunk. One of the most commonly broken bones." },
  { name: "Humerus", side: "left", x: 222, y: 400, ly: 390, text: "The upper arm bone, from shoulder to elbow." },
  { name: "Vertebral column", side: "left", x: 380, y: 540, ly: 520, text: "33 vertebrae that protect the spinal cord and carry the body's weight." },
  { name: "Pelvis", side: "left", x: 300, y: 615, ly: 610, text: "A bony ring transferring weight from the spine to the legs." },
  { name: "Radius", side: "left", x: 178, y: 640, ly: 700, text: "Forearm bone on the thumb side; rotates around the ulna to turn the palm." },
  { name: "Carpals", side: "left", x: 160, y: 730, ly: 790, text: "Eight small wrist bones arranged in two rows." },
  { name: "Femur", side: "left", x: 298, y: 840, ly: 880, text: "The thigh bone — the longest and strongest bone in the body." },
  { name: "Patella", side: "left", x: 318, y: 995, ly: 995, text: "The kneecap, sitting in a tendon and improving the leverage of the thigh muscles." },
  { name: "Tibia", side: "left", x: 322, y: 1170, ly: 1170, text: "The shinbone — the main weight-bearing bone of the lower leg." },
  { name: "Tarsals", side: "left", x: 310, y: 1395, ly: 1395, text: "Seven ankle bones, including the heel bone (calcaneus)." },
  { name: "Mandible", side: "right", x: 400, y: 150, ly: 150, text: "The lower jaw — the only skull bone that moves." },
  { name: "Scapula", side: "right", x: 515, y: 290, ly: 270, text: "The shoulder blade, forming the socket of the shoulder joint." },
  { name: "Sternum", side: "right", x: 385, y: 330, ly: 350, text: "The breastbone, where most ribs attach at the front." },
  { name: "Ribs", side: "right", x: 470, y: 420, ly: 430, text: "12 pairs that protect the heart and lungs and move with breathing." },
  { name: "Ulna", side: "right", x: 585, y: 640, ly: 640, text: "Forearm bone on the little-finger side; forms the point of the elbow." },
  { name: "Phalanges", side: "right", x: 620, y: 820, ly: 820, text: "Finger (and toe) bones — 14 in each hand." },
  { name: "Fibula", side: "right", x: 482, y: 1170, ly: 1170, text: "The thin outer lower-leg bone; mainly anchors muscles rather than bearing weight." },
] as const;

import jointHinge from "@/assets/joint-hinge.jpg";
import jointBallSocket from "@/assets/joint-ball-socket.jpg";
import jointPivot from "@/assets/joint-pivot.jpg";
import jointFixed from "@/assets/joint-fixed.jpg";

export const JOINT_TYPES = [
  { name: "Hinge", where: "Elbow, knee", text: "Bends in one direction, like a door hinge.", image: jointHinge, alt: "3D render of the elbow hinge joint" },
  { name: "Ball & socket", where: "Shoulder, hip", text: "A rounded head in a cup — moves in almost every direction.", image: jointBallSocket, alt: "3D render of the hip ball-and-socket joint" },
  { name: "Pivot", where: "Top of the neck", text: "One bone rotates around another, letting you turn your head.", image: jointPivot, alt: "3D render of the pivot joint at the top of the neck" },
  { name: "Fixed", where: "Skull sutures", text: "Bones locked together with no real movement, for protection.", image: jointFixed, alt: "3D render of skull sutures, a fixed joint" },
] as const;

import fractureTransverse from "@/assets/fracture-transverse.jpg";
import fractureOblique from "@/assets/fracture-oblique.jpg";
import fractureSpiral from "@/assets/fracture-spiral.jpg";
import fractureComminuted from "@/assets/fracture-comminuted.jpg";

export const FRACTURE_TYPES = [
  { name: "Transverse", cause: "A direct blow or bending force", text: "A clean, straight break straight across the bone.", image: fractureTransverse, alt: "3D render of a transverse fracture across a long bone" },
  { name: "Oblique", cause: "An angled blow or a twisting fall", text: "A diagonal break running across the shaft at an angle.", image: fractureOblique, alt: "3D render of an oblique fracture on a long bone" },
  { name: "Spiral", cause: "A twisting force, like planting a foot and turning", text: "The break winds around the bone like a corkscrew.", image: fractureSpiral, alt: "3D render of a spiral fracture winding around a long bone" },
  { name: "Comminuted", cause: "A high-energy impact, like a car crash", text: "The bone shatters into three or more pieces.", image: fractureComminuted, alt: "3D render of a comminuted fracture with the bone in several pieces" },
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
