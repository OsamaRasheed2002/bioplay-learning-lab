export type DailyQuestion = {
  question: string;
  options: [string, string, string, string];
  answer: number; // index into options
  explanation: string;
};

export const DAILY_QUESTIONS: DailyQuestion[] = [
  { question: "On an ECG trace, which wave represents ventricular depolarization?", options: ["P wave", "QRS complex", "T wave", "U wave"], answer: 1, explanation: "The QRS complex marks the rapid electrical spread through the ventricles just before they contract." },
  { question: "What does the P wave on an ECG represent?", options: ["Ventricular repolarization", "Atrial depolarization", "AV node delay", "Ventricular depolarization"], answer: 1, explanation: "The P wave is the electrical activation of the atria." },
  { question: "Which imaging modality uses no ionizing radiation and relies on strong magnetic fields?", options: ["CT", "X-ray", "MRI", "PET"], answer: 2, explanation: "MRI aligns hydrogen nuclei with a magnetic field and reads radio-frequency signals." },
  { question: "A pulse oximeter estimates SpO₂ by comparing absorption of which two light types?", options: ["Red and infrared", "Blue and green", "UV and visible", "Green and infrared"], answer: 0, explanation: "Oxygenated and deoxygenated haemoglobin absorb red and infrared light differently." },
  { question: "What is the typical resting membrane potential of a neuron?", options: ["+30 mV", "0 mV", "−70 mV", "−150 mV"], answer: 2, explanation: "Ion pumps and leak channels keep the inside of a resting neuron around −70 mV." },
  { question: "By the Nyquist theorem, a signal with max frequency 150 Hz must be sampled at least at:", options: ["75 Hz", "150 Hz", "300 Hz", "600 Hz"], answer: 2, explanation: "Sampling must be at least twice the highest frequency to avoid aliasing." },
  { question: "Which filter would best remove 50/60 Hz mains interference from an ECG?", options: ["Low-pass", "High-pass", "Notch", "All-pass"], answer: 2, explanation: "A notch filter removes a narrow band around the power-line frequency." },
  { question: "Which material property describes a biomaterial's ability to perform without harmful host response?", options: ["Biocompatibility", "Elasticity", "Conductivity", "Porosity"], answer: 0, explanation: "Biocompatibility means the material works in the body without causing harm." },
  { question: "What does a cardiac pacemaker primarily deliver?", options: ["Drugs", "Electrical pulses", "Oxygen", "Ultrasound"], answer: 1, explanation: "Pacemakers send small electrical pulses to keep the heart beating at a proper rate." },
  { question: "Young's modulus measures a material's:", options: ["Hardness", "Stiffness", "Toughness", "Density"], answer: 1, explanation: "It is the ratio of stress to strain in the elastic region — how stiff a material is." },
  { question: "EEG signals record electrical activity from the:", options: ["Heart", "Muscles", "Brain", "Eyes"], answer: 2, explanation: "Electroencephalography measures cortical activity through scalp electrodes." },
  { question: "Which signal records skeletal muscle electrical activity?", options: ["ECG", "EMG", "EOG", "EEG"], answer: 1, explanation: "Electromyography captures the electrical signals of contracting muscles." },
  { question: "Ultrasound imaging creates images using:", options: ["Reflected sound waves", "X-ray absorption", "Magnetic resonance", "Gamma emission"], answer: 0, explanation: "Echoes of high-frequency sound off tissue boundaries form the image." },
  { question: "Which electrode type is most common for surface ECG?", options: ["Platinum needle", "Ag/AgCl", "Copper", "Carbon fibre wire"], answer: 1, explanation: "Silver/silver-chloride electrodes are stable and low-noise on skin." },
  { question: "Normal resting adult heart rate is roughly:", options: ["20–40 bpm", "60–100 bpm", "120–160 bpm", "180–200 bpm"], answer: 1, explanation: "A healthy adult at rest usually beats 60–100 times per minute." },
  { question: "A defibrillator is used mainly to treat:", options: ["Bradycardia", "Ventricular fibrillation", "Hypertension", "Asthma"], answer: 1, explanation: "A strong shock resets chaotic ventricular activity so a normal rhythm can return." },
  { question: "What does CT stand for in medical imaging?", options: ["Cardiac Tomography", "Computed Tomography", "Contrast Testing", "Cellular Tracing"], answer: 1, explanation: "Computed tomography reconstructs cross-sections from many X-ray projections." },
  { question: "Which part of the nephron filters blood first?", options: ["Loop of Henle", "Collecting duct", "Glomerulus", "Distal tubule"], answer: 2, explanation: "The glomerulus filters plasma into Bowman's capsule." },
  { question: "Haemodialysis removes waste from blood mainly by:", options: ["Diffusion across a membrane", "Centrifugation", "Freezing", "Magnetic separation"], answer: 0, explanation: "Solutes diffuse from blood into dialysate across a semipermeable membrane." },
  { question: "Common mode rejection ratio (CMRR) matters most in which amplifier for biosignals?", options: ["Power amplifier", "Instrumentation amplifier", "Audio amplifier", "RF amplifier"], answer: 1, explanation: "Instrumentation amplifiers reject noise common to both electrodes while amplifying the difference." },
  { question: "Which ion rushes in to cause neuron depolarization?", options: ["K⁺", "Cl⁻", "Na⁺", "Ca²⁺ out"], answer: 2, explanation: "Voltage-gated sodium channels open and Na⁺ floods into the cell." },
  { question: "Titanium is popular for orthopaedic implants mostly because it is:", options: ["Magnetic", "Corrosion-resistant and biocompatible", "Cheap and soft", "Radioactive"], answer: 1, explanation: "Titanium resists corrosion and bonds well with bone (osseointegration)." },
  { question: "Systolic blood pressure is the pressure when the heart:", options: ["Relaxes", "Contracts", "Is paused", "Fills with blood"], answer: 1, explanation: "Systole is ventricular contraction, producing peak arterial pressure." },
  { question: "A cochlear implant directly stimulates the:", options: ["Optic nerve", "Auditory nerve", "Eardrum", "Vocal cords"], answer: 1, explanation: "It bypasses damaged hair cells and stimulates the auditory nerve electrically." },
  { question: "Which unit is used for absorbed radiation dose?", options: ["Tesla", "Gray", "Hertz", "Pascal"], answer: 1, explanation: "One gray equals one joule of energy absorbed per kilogram of tissue." },
  { question: "Spirometry measures:", options: ["Blood glucose", "Lung volumes and airflow", "Bone density", "Brain waves"], answer: 1, explanation: "A spirometer records how much and how fast air moves in and out of the lungs." },
  { question: "Tissue engineering scaffolds are mainly designed to:", options: ["Block cell growth", "Support cells to grow into new tissue", "Conduct electricity", "Store drugs forever"], answer: 1, explanation: "Porous scaffolds give cells a 3D structure to attach, grow and form tissue." },
  { question: "Which wave on an ECG shows ventricular repolarization?", options: ["P wave", "Q wave", "T wave", "R wave"], answer: 2, explanation: "The T wave reflects the ventricles electrically resetting after contraction." },
  { question: "A continuous glucose monitor typically senses glucose in:", options: ["Saliva", "Interstitial fluid", "Urine", "Sweat on the scalp"], answer: 1, explanation: "A tiny sensor under the skin measures glucose in interstitial fluid." },
  { question: "In Ohm's law applied to blood flow, flow equals pressure difference divided by:", options: ["Velocity", "Resistance", "Volume", "Heart rate"], answer: 1, explanation: "Q = ΔP / R — higher vascular resistance means less flow for the same pressure." },
];

/** Day 0 of the rotation: 6 November 2025 (local calendar day). */
const START_UTC = Date.UTC(2025, 10, 6);
const DAY_MS = 86_400_000;

/** Whole local calendar days since 6 Nov 2025 (DST-safe). */
export function daysSinceStart(date: Date = new Date()) {
  const local = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((local - START_UTC) / DAY_MS);
}

export function questionIndexFor(date: Date = new Date()) {
  const n = DAILY_QUESTIONS.length;
  return ((daysSinceStart(date) % n) + n) % n;
}

export function questionFor(date: Date = new Date()) {
  return DAILY_QUESTIONS[questionIndexFor(date)];
}
