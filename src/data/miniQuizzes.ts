import type { Progress } from "@/lib/progress";

export type MiniQ = { q: string; options: string[]; answer: number; why: string };

/** XP banked for each correct mini-quiz answer. */
export const XP_PER_CORRECT = 5;

/** Keys used to remember what a learner has already been paid for. */
export const miniQuizWeekKey = (id: string, week: number) => `quiz:${id}:w${week}`;
export const miniQuizSpentKey = (id: string, week: number, qi: number) => `${miniQuizWeekKey(id, week)}:q${qi}`;
export const miniQuizPaidKey = (id: string, week: number, qi: number) => `${miniQuizWeekKey(id, week)}:c${qi}`;

/**
 * Apply one mini-quiz answer: +XP_PER_CORRECT when correct, and only once per
 * question per week. A wrong answer still spends that question, so "Try again"
 * can never be used to farm XP from answers already seen.
 */
export function awardMiniQuizAnswer(
  p: Progress,
  a: { id: string; week: number; qi: number; correct: boolean },
): Progress {
  const t = p.completedTopics;
  // The flat +15 payout for this week's quiz (before per-answer scoring) also blocks a second payout.
  if (t.includes(miniQuizSpentKey(a.id, a.week, a.qi)) || t.includes(miniQuizWeekKey(a.id, a.week))) return p;
  const spent = [...t, miniQuizSpentKey(a.id, a.week, a.qi)];
  if (!a.correct) return { ...p, completedTopics: spent };
  return { ...p, xp: p.xp + XP_PER_CORRECT, completedTopics: [...spent, miniQuizPaidKey(a.id, a.week, a.qi)] };
}

/** XP already banked from one section's quiz this week. */
export function miniQuizXpEarned(p: Progress, id: string, week: number, count: number) {
  let paid = 0;
  for (let qi = 0; qi < count; qi++) if (p.completedTopics.includes(miniQuizPaidKey(id, week, qi))) paid++;
  return paid * XP_PER_CORRECT;
}

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

const m = (q: string, options: string[], answer: number, why: string): MiniQ => ({ q, options, answer, why });

/** Extra weekly sets; week 0 uses MINI_QUIZZES, then these in order, then repeats. */
export const MORE_QUIZZES: Record<string, MiniQ[][]> = {
  planes: [
    [m("A midsagittal cut makes…", ["Equal left and right halves", "Front and back halves", "Top and bottom halves"], 0, "Midsagittal runs right down the middle."), m("An MRI 'coronal' view shows the body from the…", ["Side", "Front", "Top"], 1, "Coronal is the frontal plane, seen from the front."), m("Which plane is horizontal when standing?", ["Transverse", "Sagittal", "Frontal"], 0, "Transverse planes are horizontal.")],
    [m("Nodding 'yes' happens mostly in which plane?", ["Frontal", "Transverse", "Sagittal"], 2, "Forward–back motion is in the sagittal plane."), m("Turning your head 'no' happens in which plane?", ["Transverse", "Sagittal", "Frontal"], 0, "Rotation is in the transverse plane."), m("Raising your arm out to the side happens in which plane?", ["Sagittal", "Frontal", "Transverse"], 1, "Side-to-side movement is in the frontal plane.")],
  ],
  cardiovascular: [
    [m("Which artery leaves the right ventricle?", ["Aorta", "Pulmonary artery", "Carotid artery"], 1, "It carries deoxygenated blood to the lungs."), m("What do platelets help with?", ["Clotting", "Carrying oxygen", "Fighting infection"], 0, "Platelets plug damaged vessels."), m("Which artery layer is mostly smooth muscle?", ["Tunica intima", "Tunica media", "Tunica externa"], 1, "The media contracts and relaxes to control diameter.")],
    [m("What is the heart's natural pacemaker?", ["AV node", "SA node", "Aortic valve"], 1, "The SA node starts each heartbeat."), m("Plasma is mostly…", ["Water", "Fat", "Protein"], 0, "About 90% of plasma is water."), m("Which vessels have the thinnest walls?", ["Arteries", "Veins", "Capillaries"], 2, "One cell thick, so gases can pass through.")],
  ],
  respiratory: [
    [m("The windpipe is also called the…", ["Oesophagus", "Trachea", "Larynx"], 1, "The trachea carries air to the bronchi."), m("Which gas passes from blood into the alveoli?", ["Oxygen", "Carbon dioxide", "Nitrogen"], 1, "CO₂ leaves the blood to be breathed out."), m("What keeps the trachea open?", ["Cartilage rings", "Muscle only", "Bone"], 0, "C-shaped cartilage rings stop it collapsing.")],
    [m("Quiet breathing out is mainly…", ["Passive", "Very forceful", "Controlled by the stomach"], 0, "The diaphragm relaxes and the lungs recoil."), m("Which muscles between the ribs help breathing?", ["Intercostals", "Biceps", "Deltoids"], 0, "Intercostals lift and lower the ribs."), m("A ventilator helps patients by…", ["Pushing air into the lungs", "Filtering blood", "Pacing the heart"], 0, "It delivers air when breathing fails.")],
  ],
  nervous: [
    [m("The brain and spinal cord form the…", ["Peripheral nervous system", "Central nervous system", "Autonomic system"], 1, "CNS = brain + spinal cord."), m("Which part receives signals from other neurons?", ["Dendrites", "Axon terminal", "Myelin"], 0, "Dendrites pick up incoming signals."), m("Signals cross a synapse using…", ["Neurotransmitters", "Blood cells", "Bone"], 0, "Chemical messengers cross the gap.")],
    [m("Which part of the brain controls balance?", ["Cerebrum", "Cerebellum", "Brainstem"], 1, "The cerebellum coordinates balance and movement."), m("Which test records brain electrical activity?", ["ECG", "EEG", "EMG"], 1, "EEG = electroencephalogram."), m("Which neurons carry signals to muscles?", ["Sensory", "Motor", "Relay"], 1, "Motor neurons trigger muscles.")],
  ],
  skeletal: [
    [m("How many bones does an adult have?", ["206", "150", "300"], 0, "Adults have about 206 bones."), m("The knee is which type of joint?", ["Hinge", "Pivot", "Fixed"], 0, "It mainly bends in one direction."), m("Where is red blood cell production in bones?", ["Compact bone", "Red marrow", "Cartilage"], 1, "Red marrow makes blood cells.")],
    [m("The skull bones are joined by…", ["Sutures", "Ligaments only", "Hinges"], 0, "Sutures are fixed joints."), m("A twisting injury often causes which fracture?", ["Transverse", "Spiral", "Comminuted"], 1, "Twisting forces make spiral breaks."), m("Bone gets stronger when…", ["It is loaded regularly", "It is never used", "You sleep more"], 0, "Bone remodels to handle the loads on it.")],
  ],
  digestive: [
    [m("Where does chemical digestion of protein start?", ["Mouth", "Stomach", "Large intestine"], 1, "Stomach acid and pepsin start breaking down protein."), m("What does the large intestine mainly absorb?", ["Water", "Protein", "Bile"], 0, "It reclaims water from leftovers."), m("Which organ makes insulin and digestive enzymes?", ["Liver", "Pancreas", "Gallbladder"], 1, "The pancreas does both.")],
    [m("Which tube carries food from mouth to stomach?", ["Trachea", "Oesophagus", "Ureter"], 1, "The oesophagus links mouth and stomach."), m("What does the gallbladder do?", ["Stores bile", "Makes insulin", "Absorbs water"], 0, "It stores and releases bile."), m("Villi help absorption by…", ["Increasing surface area", "Making acid", "Blocking food"], 0, "More surface area = faster absorption.")],
  ],
  muscular: [
    [m("Which muscle straightens the elbow?", ["Biceps", "Triceps", "Deltoid"], 1, "The triceps extends the elbow."), m("Which muscle type is found only in the heart?", ["Skeletal", "Smooth", "Cardiac"], 2, "Cardiac muscle never tires."), m("Muscles attach to bones through…", ["Tendons", "Ligaments", "Cartilage"], 0, "Tendons link muscle to bone.")],
    [m("Lowering a weight slowly is which contraction?", ["Concentric", "Eccentric", "Isometric"], 1, "The muscle lengthens under load."), m("Which muscle group is on the front of the thigh?", ["Hamstrings", "Quadriceps", "Calves"], 1, "Quadriceps straighten the knee."), m("Muscles can only…", ["Pull", "Push", "Both push and pull"], 0, "That's why they work in opposing pairs.")],
  ],
  endocrine: [
    [m("Which gland releases adrenaline?", ["Thyroid", "Adrenal", "Pituitary"], 1, "Adrenal glands sit on the kidneys."), m("The thyroid mainly controls…", ["Metabolism", "Digestion", "Vision"], 0, "Thyroid hormones set the body's metabolic rate."), m("Most hormone systems are controlled by…", ["Negative feedback", "Random release", "Muscles"], 0, "Rising levels switch release off.")],
    [m("Which device continuously tracks blood glucose?", ["CGM", "ECG", "Pacemaker"], 0, "A continuous glucose monitor."), m("Which hormone raises blood sugar?", ["Insulin", "Glucagon", "Oestrogen"], 1, "Glucagon releases stored glucose."), m("Testosterone is mainly made in the…", ["Ovaries", "Testes", "Thyroid"], 1, "The testes produce testosterone.")],
  ],
  integumentary: [
    [m("Which layer contains blood vessels and nerves?", ["Epidermis", "Dermis", "Keratin"], 1, "The dermis holds vessels, nerves and glands."), m("Which pigment gives skin its colour?", ["Melanin", "Haemoglobin", "Keratin"], 0, "Melanin also protects from UV."), m("Goosebumps help to…", ["Keep warm", "Cool down", "Fight germs"], 0, "Raised hairs trap a layer of air.")],
    [m("Sebaceous glands release…", ["Sweat", "Oil (sebum)", "Blood"], 1, "Sebum keeps skin and hair soft."), m("Which tough protein is in the epidermis?", ["Keratin", "Insulin", "Myosin"], 0, "Keratin makes skin waterproof and tough."), m("Engineered skin substitutes are used for…", ["Severe burns", "Broken bones", "Heart failure"], 0, "They cover large wounds while skin heals.")],
  ],
  urinary: [
    [m("Where is urine stored?", ["Kidneys", "Bladder", "Urethra"], 1, "The bladder stretches to store urine."), m("The tiny filtering units in kidneys are…", ["Nephrons", "Alveoli", "Neurons"], 0, "Each kidney has about a million nephrons."), m("Which tube carries urine out of the body?", ["Ureter", "Urethra", "Oesophagus"], 1, "The urethra leads outside.")],
    [m("Kidneys help control…", ["Water and salt balance", "Eye colour", "Bone length"], 0, "They adjust what's kept or removed."), m("Healthy urine should not contain…", ["Glucose", "Water", "Urea"], 0, "Glucose in urine can be a sign of diabetes."), m("Dialysis removes waste by…", ["Diffusion across a membrane", "Surgery", "Heating blood"], 0, "Waste diffuses into the dialysis fluid.")],
  ],
  reproductive: [
    [m("Where does a fertilised egg implant?", ["Ovary", "Uterus lining", "Cervix"], 1, "It embeds in the endometrium."), m("Which hormone surge triggers ovulation?", ["LH", "Insulin", "Adrenaline"], 0, "A luteinising hormone surge releases the egg."), m("Which gland adds fluid to semen?", ["Prostate", "Thyroid", "Pancreas"], 0, "The prostate contributes seminal fluid.")],
    [m("The menstrual cycle is about how long?", ["28 days", "7 days", "90 days"], 0, "On average around 28 days."), m("Which imaging is used to check a pregnancy?", ["Ultrasound", "X-ray", "EEG"], 0, "Ultrasound is safe for the baby."), m("IVF means fertilisation happens…", ["In the lab", "In the ovary", "In the cervix"], 0, "Eggs and sperm meet in a dish.")],
  ],
};

/** Weeks start Thursday 19 Nov 2026, 9pm UK time (Europe/London, DST-aware). */
export function quizWeek(now: Date = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", hourCycle: "h23" }).formatToParts(now).map((x) => [x.type, x.value]));
  const local = Date.UTC(+p["year"]!, +p["month"]! - 1, +p["day"]!, +p["hour"]!);
  return Math.max(0, Math.floor((local - Date.UTC(2026, 10, 19, 21)) / (7 * 864e5)));
}

export function weeklyQuiz(id: string, week: number): MiniQ[] {
  const sets = [MINI_QUIZZES[id] ?? [], ...(MORE_QUIZZES[id] ?? [])];
  return sets[week % sets.length]!;
}
