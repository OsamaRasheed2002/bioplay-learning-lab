export const ENDOCRINE_SECTIONS = [
  { id: "anatomy", to: "/anatomy/endocrine/anatomy", title: "Simple Anatomy", description: "Meet the main glands and the hormones they release." },
  { id: "hormones", to: "/anatomy/endocrine/hormones", title: "How Hormones Work", description: "Chemical messages, target cells and simple feedback." },
] as const;
export type EndocrineSection = typeof ENDOCRINE_SECTIONS[number]["id"];
export const ENDOCRINE_GLANDS = [
  { name: "Pituitary gland", text: "A pea-sized gland beneath the brain. Guided by the hypothalamus, it releases hormones involved in growth and control of several other glands.", hormone: "Example: growth hormone", points: [[182,123],[720,124]] },
  { name: "Thyroid & parathyroids", text: "The thyroid in the neck releases hormones that help regulate metabolism. The small parathyroid glands behind it help regulate blood calcium.", hormone: "Examples: thyroid hormones and parathyroid hormone", points: [[182,193],[720,193]] },
  { name: "Adrenal glands", text: "Sit above the kidneys. Their outer layer makes hormones such as cortisol and aldosterone; their inner region releases adrenaline for a rapid stress response.", hormone: "Example: adrenaline", points: [[170,318],[208,305],[699,305],[740,318]] },
  { name: "Pancreas", text: "Its endocrine cells release insulin and glucagon to help keep blood glucose balanced. It also has a separate digestive role, making enzymes.", hormone: "Examples: insulin and glucagon", points: [[190,343],[715,341]] },
  { name: "Ovaries & testes", text: "These reproductive glands release sex hormones involved in reproduction and development. Testes are shown here; ovaries lie within the pelvis.", hormone: "Examples: testosterone, oestrogens and progesterone", points: [[182,503],[195,500],[718,500],[729,502]] },
] as const;
export const HORMONE_STEPS = [
  { title: "A gland releases a hormone", text: "A change in the body triggers a gland to release a chemical messenger into the blood. After a meal, rising blood glucose stimulates pancreatic beta cells to release insulin." },
  { title: "The message reaches target cells", text: "Hormones travel in the bloodstream, but only cells with suitable receptors respond. Insulin helps muscle and fat cells take up glucose and encourages storage." },
  { title: "Feedback reduces the signal", text: "As glucose returns towards its usual range, insulin release decreases. This negative feedback helps avoid over-correction. When glucose falls, glucagon helps the liver release glucose." },
] as const;
export function endocrineHead(title: string, description: string) {
  return { meta: [{ title: `${title} · BEPlay` }, { name: "description", content: description }, { property: "og:title", content: `${title} · BEPlay` }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" }] };
}