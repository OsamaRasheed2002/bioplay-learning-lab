export type MiniQ = { q: string; options: string[]; answer: number; why: string };
export const MINI_QUIZ_XP = 15;

export const MINI_QUIZZES: Record<string, MiniQ[]> = {
  planes: [
    { q: "Which plane divides the body into left and right?", options: ["Frontal", "Sagittal", "Transverse"], answer: 1, why: "The sagittal plane splits left from right." },
    { q: "Which plane separates front from back?", options: ["Frontal (coronal)", "Transverse", "Sagittal"], answer: 0, why: "The frontal or coronal plane divides front and back." },
    { q: "A CT scan 'slice' across the belly is in which plane?", options: ["Sagittal", "Frontal", "Transverse"], answer: 2, why: "Transverse slices split upper from lower." },
  ],
  cardiovascular: [
    { q: "Which chamber pumps blood to the whole body?", options: ["Right atrium", "Left ventricle", "Right ventricle"], answer: 1, why: "The thick-walled left ventricle pumps into the aorta." },
    { q: "Which blood component carries oxygen?", options: ["Platelets", "White blood cells", "Red blood cells"], answer: 2, why: "Haemoglobin in red cells binds oxygen." },
    { q: "Why do veins have valves?", options: ["To stop blood flowing backwards", "To raise blood pressure", "To filter blood"], answer: 0, why: "Low-pressure veins rely on valves to keep blood moving to the heart." },
  ],
  respiratory: [
    { q: "Where does gas exchange happen?", options: ["Trachea", "Alveoli", "Bronchi"], answer: 1, why: "Tiny alveoli have thin walls wrapped in capillaries." },
    { q: "What happens when the diaphragm contracts?", options: ["Air is breathed in", "Air is breathed out", "Nothing changes"], answer: 0, why: "It flattens, enlarging the chest so pressure drops and air flows in." },
    { q: "Air flows from…", options: ["Low to high pressure", "High to low pressure", "Only when we cough"], answer: 1, why: "Air always moves down a pressure difference." },
  ],
  nervous: [
    { q: "Which part of a neuron carries the signal away from the cell body?", options: ["Dendrite", "Axon", "Synapse"], answer: 1, why: "The axon carries the impulse onward." },
    { q: "What does the myelin sheath do?", options: ["Speeds up signals", "Stores memories", "Makes hormones"], answer: 0, why: "Myelin insulates the axon so signals jump between nodes." },
    { q: "A reflex is processed mainly in the…", options: ["Spinal cord", "Cerebrum", "Stomach"], answer: 0, why: "Reflex arcs loop through the spinal cord for speed." },
  ],
  skeletal: [
    { q: "What is the longest bone in the body?", options: ["Humerus", "Tibia", "Femur"], answer: 2, why: "The thigh bone, the femur, is the longest." },
    { q: "The shoulder is which type of joint?", options: ["Hinge", "Ball and socket", "Fixed"], answer: 1, why: "It allows movement in many directions." },
    { q: "A fracture that shatters bone into many pieces is…", options: ["Comminuted", "Transverse", "Oblique"], answer: 0, why: "Comminuted means broken into several fragments." },
  ],
  digestive: [
    { q: "Where are most nutrients absorbed?", options: ["Stomach", "Small intestine", "Large intestine"], answer: 1, why: "Villi in the small intestine absorb most nutrients." },
    { q: "Which organ makes bile?", options: ["Gallbladder", "Pancreas", "Liver"], answer: 2, why: "The liver makes bile; the gallbladder stores it." },
    { q: "What moves food along the gut?", options: ["Peristalsis", "Gravity only", "Osmosis"], answer: 0, why: "Waves of muscle contraction push food along." },
  ],
  muscular: [
    { q: "Which muscle bends the elbow?", options: ["Triceps", "Biceps brachii", "Quadriceps"], answer: 1, why: "The biceps contracts to flex the elbow." },
    { q: "Muscle contraction happens as actin and myosin…", options: ["Slide past each other", "Melt together", "Stretch apart"], answer: 0, why: "This is the sliding filament model." },
    { q: "Holding a weight still is which contraction?", options: ["Concentric", "Eccentric", "Isometric"], answer: 2, why: "Isometric means the muscle length stays the same." },
  ],
  endocrine: [
    { q: "Which gland is called the 'master gland'?", options: ["Thyroid", "Pituitary", "Adrenal"], answer: 1, why: "The pituitary controls many other glands." },
    { q: "Which hormone lowers blood sugar?", options: ["Insulin", "Adrenaline", "Glucagon"], answer: 0, why: "Insulin from the pancreas helps cells take up glucose." },
    { q: "How do hormones travel to their targets?", options: ["Through nerves", "In the blood", "Through the air"], answer: 1, why: "Glands release hormones into the bloodstream." },
  ],
  integumentary: [
    { q: "What is the outermost layer of skin?", options: ["Dermis", "Hypodermis", "Epidermis"], answer: 2, why: "The epidermis is the protective top layer." },
    { q: "How does skin help cool you down?", options: ["Sweating", "Making hair", "Storing fat"], answer: 0, why: "Sweat evaporates and removes heat." },
    { q: "Which layer stores fat and insulates?", options: ["Epidermis", "Hypodermis", "Dermis"], answer: 1, why: "The hypodermis holds fat for insulation." },
  ],
  urinary: [
    { q: "Which organs filter the blood?", options: ["Kidneys", "Bladder", "Ureters"], answer: 0, why: "Kidneys filter blood to make urine." },
    { q: "What carries urine from kidneys to bladder?", options: ["Urethra", "Ureters", "Arteries"], answer: 1, why: "Two ureters connect each kidney to the bladder." },
    { q: "Which machine replaces failed kidneys?", options: ["Pacemaker", "Ventilator", "Dialysis machine"], answer: 2, why: "Dialysis filters the blood outside the body." },
  ],
  reproductive: [
    { q: "Where are egg cells produced?", options: ["Uterus", "Ovaries", "Cervix"], answer: 1, why: "The ovaries produce and release eggs." },
    { q: "Where does fertilisation usually happen?", options: ["Fallopian tube", "Uterus", "Vagina"], answer: 0, why: "Sperm usually meets the egg in the fallopian tube." },
    { q: "Where are sperm made?", options: ["Prostate", "Vas deferens", "Testes"], answer: 2, why: "Sperm are produced in the testes." },
  ],
};
