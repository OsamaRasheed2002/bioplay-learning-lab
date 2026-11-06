import plasmaImg from "@/assets/blood-plasma.jpg";
import redCellsImg from "@/assets/blood-red-cells.jpg";
import whiteCellsImg from "@/assets/blood-white-cells.jpg";
import plateletsImg from "@/assets/blood-platelets.jpg";

export type BloodComponent = {
  name: string;
  share: string;
  tone: "peach" | "sky" | "lavender" | "mint";
  image: string;
  alt: string;
  what: string;
  job: string;
  engineering: string;
};

export const BLOOD_COMPONENTS: BloodComponent[] = [
  {
    name: "Plasma",
    share: "~55% of blood",
    tone: "peach",
    image: plasmaImg,
    alt: "A glass test tube of pale straw-coloured blood plasma",
    what: "A straw-coloured liquid that is about 92% water, plus proteins (albumin, globulins, fibrinogen), salts, glucose, hormones and waste.",
    job: "Carries cells, nutrients, hormones and CO₂ around the body and keeps blood pressure and pH stable.",
    engineering: "Dialysis machines clean plasma by passing it across a semi-permeable membrane.",
  },
  {
    name: "Red blood cells (erythrocytes)",
    share: "~45% of blood",
    tone: "sky",
    image: redCellsImg,
    alt: "Disc-shaped red blood cells floating in plasma",
    what: "Disc-shaped cells with no nucleus, packed with haemoglobin — an iron-containing protein. Each lives about 120 days.",
    job: "Pick up oxygen in the lungs and deliver it to tissues, then help carry CO₂ back.",
    engineering: "Pulse oximeters shine red and infrared light through a finger to measure how much haemoglobin carries oxygen.",
  },
  {
    name: "White blood cells (leukocytes)",
    share: "<1% of blood",
    tone: "lavender",
    image: whiteCellsImg,
    alt: "Large white blood cells with lobed nuclei among smaller red cells",
    what: "Nucleated immune cells: neutrophils, lymphocytes, monocytes, eosinophils and basophils.",
    job: "Find and destroy bacteria, viruses and damaged cells, and produce antibodies.",
    engineering: "Flow cytometers count and sort white cells by scattering laser light off each one.",
  },
  {
    name: "Platelets (thrombocytes)",
    share: "<1% of blood",
    tone: "mint",
    image: plateletsImg,
    alt: "Activated platelets with spiky projections caught in fibrin threads",
    what: "Tiny cell fragments broken off from large bone-marrow cells (megakaryocytes). Live about 7–10 days.",
    job: "Stick to damaged vessel walls and, with fibrin, form a clot that stops bleeding.",
    engineering: "Blood-contacting devices like stents and valves are coated to stop platelets clotting on them.",
  },
];

export type VesselLayer = {
  name: string;
  nickname: string;
  madeOf: string;
  job: string;
};

export type Vessel = {
  kind: "artery" | "vein";
  title: string;
  intro: string;
  layers: VesselLayer[];
  /** Relative ring thickness, outer → inner, for the cross-section drawing. */
  rings: [number, number, number];
  facts: string[];
  engineering: string;
};

export const ARTERY: Vessel = {
  kind: "artery",
  title: "Arteries",
  intro:
    "Arteries carry blood away from the heart under high pressure, so their walls are thick, muscular and elastic. They keep a round shape even when empty.",
  rings: [22, 34, 6],
  layers: [
    {
      name: "Tunica externa (adventitia)",
      nickname: "Outer layer",
      madeOf: "Loose connective tissue rich in collagen fibres, some elastic fibres, nerves and tiny vessels (vasa vasorum).",
      job: "Anchors the artery to surrounding tissue and stops it over-stretching or tearing.",
    },
    {
      name: "Tunica media",
      nickname: "Middle layer — the thickest",
      madeOf: "Many layers of smooth muscle cells with sheets of elastic fibres (elastin) between them.",
      job: "Stretches with each heartbeat and recoils to keep blood moving; the muscle contracts or relaxes to control blood pressure.",
    },
    {
      name: "Tunica intima",
      nickname: "Inner layer",
      madeOf: "A single layer of flat endothelial cells on a basement membrane, plus an internal elastic lamina.",
      job: "Gives a super-smooth surface so blood flows without clotting, and releases signals (like nitric oxide) that widen the vessel.",
    },
  ],
  facts: [
    "Narrow lumen keeps pressure high",
    "No valves needed — the heart's pressure drives flow",
    "Pulse can be felt where arteries run near the skin",
  ],
  engineering:
    "Stents are mesh tubes that hold a narrowed artery open; vascular grafts made of Dacron or PTFE replace damaged sections.",
};

export const VEIN: Vessel = {
  kind: "vein",
  title: "Veins",
  intro:
    "Veins return blood to the heart under low pressure, so their walls are thinner and floppier, with a wide lumen. Many contain one-way valves.",
  rings: [20, 10, 4],
  layers: [
    {
      name: "Tunica externa (adventitia)",
      nickname: "Outer layer — the thickest in veins",
      madeOf: "Collagen fibres and some elastic fibres; in large veins it also contains bundles of smooth muscle.",
      job: "Provides most of the wall's strength and holds the vein in place among muscles and tissue.",
    },
    {
      name: "Tunica media",
      nickname: "Middle layer — thin",
      madeOf: "A thin band of smooth muscle with few elastic fibres.",
      job: "Allows small changes in diameter; veins can stretch to store blood (they hold ~65% of your blood volume).",
    },
    {
      name: "Tunica intima",
      nickname: "Inner layer",
      madeOf: "Smooth endothelial cells on a basement membrane; it folds inward to form the valve flaps.",
      job: "Gives a smooth surface for flow and forms valves that stop blood falling backwards.",
    },
  ],
  facts: [
    "Wide lumen and low pressure",
    "Valves prevent backflow, especially in the legs",
    "Skeletal muscles squeeze veins to push blood upward",
  ],
  engineering:
    "Compression stockings and venous valve implants help when valves fail (varicose veins); veins are also the usual site for IV lines.",
};
