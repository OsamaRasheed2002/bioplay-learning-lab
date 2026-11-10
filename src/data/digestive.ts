export const DIGESTIVE_SECTIONS = [
  { id: "anatomy", to: "/anatomy/digestive/anatomy", title: "Simple Anatomy", description: "The digestive tract and the organs that help it work.", tone: "peach" },
  { id: "digestion", to: "/anatomy/digestive/digestion", title: "How Digestion Works", description: "Follow food from the first bite to nutrient absorption.", tone: "mint" },
] as const;

export type DigestiveSection = typeof DIGESTIVE_SECTIONS[number]["id"];

export const DIGESTIVE_PARTS = [
  { name: "Mouth", text: "Teeth break food into smaller pieces, while the tongue mixes it with saliva. Salivary amylase starts breaking down starch before swallowing.", highlight: "M455 22 Q510 0 566 22 Q600 86 561 155 Q510 193 463 151 Q429 85 455 22 Z" },
  { name: "Oesophagus", text: "A muscular tube carries swallowed food to the stomach. Coordinated contractions push the food down; gravity is not the only force moving it.", highlight: "M490 170 Q475 285 495 466 Q496 530 529 560 L561 563 Q524 507 521 453 L522 173 Z" },
  { name: "Stomach", text: "Stores food and churns it with acid and enzymes. This forms a semi-liquid mixture called chyme, which is released gradually into the small intestine.", highlight: "M662 581 C731 598 752 680 719 740 C689 796 623 829 554 815 C505 810 481 796 461 780 L438 807 L412 784 Q434 741 498 737 C589 753 617 688 599 645 Z" },
  { name: "Small intestine", text: "Most digestion and nutrient absorption happen here. Folds, villi and microvilli provide a large surface area; nutrients enter the blood or lymph across the intestinal lining.", highlight: "M362 958 Q449 970 535 954 Q618 932 669 964 L670 1150 Q582 1209 492 1198 Q410 1230 352 1161 Z" },
  { name: "Large intestine & rectum", text: "The colon absorbs remaining water and electrolytes and forms stool. The rectum stores stool before it leaves through the anus.", highlight: "M292 865 Q320 899 383 910 Q510 958 656 904 L700 852 M292 865 Q259 989 286 1167 M700 852 Q748 958 715 1135 Q725 1226 620 1220 Q525 1176 500 1235 L500 1380" },
  { name: "Liver", text: "Makes bile, which helps disperse fats in the small intestine. The liver also processes absorbed nutrients, stores glycogen and helps break down many drugs and toxins. Food does not pass through it.", highlight: "M256 622 Q296 498 431 548 Q512 588 653 565 Q606 662 559 695 Q495 743 452 709 Q378 766 274 832 Q214 739 256 622 Z" },
  { name: "Gallbladder", text: "A small sac beneath the liver that stores and concentrates bile. When a meal containing fat reaches the small intestine, the gallbladder contracts and releases bile through the bile ducts. Food does not enter it.", highlight: "M320 752 Q347 709 397 738 Q406 774 355 791 Z" },
  { name: "Pancreas", text: "Supplies digestive enzymes to break down fats, proteins and carbohydrates, plus bicarbonate to neutralise acidic chyme in the small intestine. It also makes hormones such as insulin and glucagon to regulate blood glucose. Food does not pass through it.", highlight: "M423 838 Q509 795 687 787 Q685 828 570 854 Q472 895 423 863 Z" },
] as const;

export const DIGESTION_STEPS = [
  { name: "Chew & swallow", text: "Chewing increases the surface area of food. Saliva moistens it and begins starch digestion; swallowing sends the bolus into the oesophagus.", part: 0 },
  { name: "Move to the stomach", text: "Peristalsis pushes the bolus through the oesophagus. The lower oesophageal sphincter relaxes to let it enter the stomach.", part: 1 },
  { name: "Churn & break down", text: "Stomach muscles mix food with acid and pepsin, beginning protein digestion. The stomach releases chyme into the duodenum a little at a time.", part: 2 },
  { name: "Digest & absorb", text: "Bile helps disperse fats; pancreatic and intestinal enzymes break nutrients into absorbable forms. Most nutrients are absorbed across the small intestinal lining.", part: 3 },
  { name: "Recover water & remove waste", text: "The colon absorbs remaining water and electrolytes. Gut microbes process some material, and the remaining stool moves to the rectum for elimination.", part: 4 },
] as const;

export function digestiveHead(title: string, description: string) {
  return { meta: [
    { title: `${title} · BEPlay` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} · BEPlay` },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] };
}