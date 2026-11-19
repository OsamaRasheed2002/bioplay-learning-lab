export type QuizQ = { q: string; options: string[]; answer: number };

export const SPEED_QUIZ: QuizQ[] = [
  { q: "Which heart chamber pumps blood to the whole body?", options: ["Right atrium", "Left ventricle", "Right ventricle", "Left atrium"], answer: 1 },
  { q: "Stress is force divided by…", options: ["Length", "Time", "Area", "Mass"], answer: 2 },
  { q: "Which metal is most used for hip stems and dental implants?", options: ["Titanium", "Copper", "Aluminium", "Lead"], answer: 0 },
  { q: "Where does gas exchange happen in the lungs?", options: ["Trachea", "Bronchi", "Alveoli", "Diaphragm"], answer: 2 },
  { q: "An ECG records the heart's…", options: ["Sound", "Electrical activity", "Temperature", "Blood pressure"], answer: 1 },
  { q: "Which plane splits the body into left and right?", options: ["Transverse", "Frontal", "Sagittal", "Oblique"], answer: 2 },
  { q: "Myelin on an axon makes signals…", options: ["Slower", "Faster", "Stop", "Reverse"], answer: 1 },
  { q: "A stent is used to treat…", options: ["Broken bones", "Narrowed arteries", "Kidney stones", "Hearing loss"], answer: 1 },
  { q: "Which organ filters blood to make urine?", options: ["Liver", "Bladder", "Kidney", "Spleen"], answer: 2 },
  { q: "Insulin is released by the…", options: ["Thyroid", "Pancreas", "Adrenal gland", "Pituitary"], answer: 1 },
];

export type Puzzle = { patient: string; clues: string[]; options: string[]; answer: number; why: string };

export const DIAGNOSIS_PUZZLES: Puzzle[] = [
  { patient: "Mr A, 72", clues: ["Feels dizzy and faints", "Heart rate 35 beats/min", "ECG: signals blocked between atria and ventricles"], options: ["Stent", "Pacemaker", "Artificial valve", "Dialysis"], answer: 1, why: "A slow, blocked heartbeat needs a pacemaker to send timed pulses." },
  { patient: "Ms B, 58", clues: ["Chest pain when climbing stairs", "Angiogram: coronary artery 80% narrowed", "Valves look normal"], options: ["Pacemaker", "Hip implant", "Stent", "Insulin pump"], answer: 2, why: "Plaque narrowing an artery is opened with a balloon and held open by a stent." },
  { patient: "Mr C, 66", clues: ["Breathless and tired", "Loud heart murmur", "Echo: aortic valve stiff and barely opens"], options: ["Artificial valve", "Stent", "Pacemaker", "Ventilator"], answer: 0, why: "A stiff, calcified aortic valve (aortic stenosis) is replaced with an artificial valve." },
  { patient: "Ms D, 45", clues: ["Swollen ankles, very tired", "Blood tests: waste products very high", "Kidneys working at 8%"], options: ["Pacemaker", "Dialysis", "Stent", "Cochlear implant"], answer: 1, why: "Failing kidneys can't clean the blood, so dialysis filters it instead." },
];

export type Mission = { brief: string; needs: string[]; options: { name: string; note: string }[]; answer: number; why: string };

export const DESIGN_MISSIONS: Mission[] = [
  { brief: "Design a hip stem that sits inside the thigh bone for 20+ years.", needs: ["Strong under load", "Doesn't corrode", "Bone grows onto it"], options: [{ name: "Titanium", note: "Strong, light, bonds with bone" }, { name: "Silicone", note: "Soft and flexible" }, { name: "Glass", note: "Hard but brittle" }], answer: 0, why: "Titanium is strong, corrosion-resistant and lets bone grow onto its surface." },
  { brief: "Design stitches that disappear on their own after healing.", needs: ["Holds for a few weeks", "Breaks down safely", "No second surgery"], options: [{ name: "Stainless steel", note: "Permanent and stiff" }, { name: "Polylactic acid", note: "Slowly dissolves in the body" }, { name: "Alumina", note: "Very hard ceramic" }], answer: 1, why: "Polylactic acid breaks down into harmless products as the wound heals." },
  { brief: "Design a stent that self-expands once released in the artery.", needs: ["Squeezes into a thin tube", "Springs back to shape", "Flexible"], options: [{ name: "Nitinol", note: "Shape-memory metal" }, { name: "Zirconia", note: "Tough ceramic" }, { name: "UHMWPE", note: "Slippery plastic" }], answer: 0, why: "Nitinol 'remembers' its shape and springs open at body temperature." },
];

export const CHALLENGE_XP = 50;
