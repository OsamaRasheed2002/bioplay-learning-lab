export const RESPIRATORY_SECTIONS = [
  { id: "anatomy", to: "/anatomy/respiratory/anatomy", title: "Simple Anatomy", description: "The airways, lungs and tiny air sacs.", tone: "mint" },
  { id: "breathing", to: "/anatomy/respiratory/breathing", title: "How Breathing Works", description: "Air in, air out — and gas exchange.", tone: "sky" },
  { id: "biomechanics", to: "/anatomy/respiratory/biomechanics", title: "Breathing Biomechanics", description: "Pressure, stretch and airflow, without the heavy maths.", tone: "lavender" },
] as const;

export type RespiratorySection = typeof RESPIRATORY_SECTIONS[number]["id"];

export const RESPIRATORY_PARTS = [
  { name: "Trachea", text: "The windpipe carries air toward the lungs. Cartilage rings help keep it open." },
  { name: "Bronchi & bronchioles", text: "Two main bronchi enter the lungs, then branch into smaller bronchioles that distribute air." },
  { name: "Lungs", text: "The right lung has three lobes; the left has two, leaving room for the heart. The pleural lining helps them slide against the chest wall." },
  { name: "Alveoli", text: "Tiny air sacs at the ends of the airways. Their thin walls sit next to capillaries, where oxygen and carbon dioxide are exchanged." },
  { name: "Diaphragm", text: "The dome-shaped muscle below the lungs. It contracts and moves down when you breathe in." },
] as const;

export function respiratoryHead(title: string, description: string) {
  return { meta: [
    { title: `${title} · BEPlay` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} · BEPlay` },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] };
}