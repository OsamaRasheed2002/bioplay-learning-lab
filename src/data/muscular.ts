export const MUSCULAR_SECTIONS = [
  { id: "anatomy", to: "/anatomy/muscular/anatomy", title: "Simple Anatomy", description: "Five major muscle groups and the movements they produce." },
  { id: "movement", to: "/anatomy/muscular/movement", title: "How Muscles Work", description: "Contraction, opposing muscle pairs and a little biomechanics." },
] as const;
export type MuscularSection = typeof MUSCULAR_SECTIONS[number]["id"];

export const MUSCLE_PARTS = [
  { name: "Deltoids", text: "Cover the shoulders and help lift your arms. Different portions move the arm forwards, sideways and backwards.", paths: ["M139 115 Q108 110 99 150 L117 163 Q130 138 145 138 Z", "M221 115 Q252 110 261 150 L243 163 Q230 138 215 138 Z"] },
  { name: "Pectoralis major", text: "The main chest muscles bring the upper arms towards the body and rotate them inwards, as when pushing a door.", paths: ["M145 119 L175 125 L175 174 Q150 182 127 149 Z", "M215 119 L185 125 L185 174 Q210 182 233 149 Z"] },
  { name: "Biceps brachii", text: "On the front of the upper arm, the biceps bend the elbow and turn the forearm palm-up. The triceps on the back straighten the elbow.", paths: ["M108 161 Q125 168 114 195 L99 228 L89 220 Z", "M252 161 Q235 168 246 195 L261 228 L271 220 Z"] },
  { name: "Rectus abdominis", text: "Runs down the front of the abdomen. It bends the trunk forwards and helps stabilise the pelvis, working with other core muscles.", paths: ["M154 182 L175 183 L175 280 L153 273 Q143 225 154 182 Z", "M206 182 L185 183 L185 280 L207 273 Q217 225 206 182 Z"] },
  { name: "Quadriceps", text: "Four muscles on the front of each thigh straighten the knee. They help with standing, walking and climbing stairs; hamstrings at the back bend the knee.", paths: ["M137 302 Q163 291 173 311 L168 406 Q158 429 144 414 L127 336 Z", "M223 302 Q197 291 187 311 L192 406 Q202 429 216 414 L233 336 Z"] },
] as const;

export function muscularHead(title: string, description: string) {
  return { meta: [{ title: `${title} · BEPlay` }, { name: "description", content: description }, { property: "og:title", content: `${title} · BEPlay` }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" }] };
}