export const SKIN_SECTIONS = [
  { id: "anatomy", to: "/anatomy/integumentary/anatomy", title: "Simple Anatomy", description: "Skin layers, hair and glands in a detailed cross-section." },
  { id: "functions", to: "/anatomy/integumentary/functions", title: "How Skin Works", description: "Protection, sensation and keeping your temperature balanced." },
] as const;
export type SkinSection = typeof SKIN_SECTIONS[number]["id"];
export const SKIN_PARTS = [
  { name: "Epidermis", text: "The outer skin layer forms a protective barrier. Keratin-rich cells help limit water loss, while melanin contributes to skin colour and protection from ultraviolet light. This layer has no blood vessels.", highlight: "M155 170 Q270 164 380 183 Q475 174 594 188 L592 246 Q555 208 530 241 Q506 265 478 229 Q453 257 430 227 Q403 260 380 232 Q354 255 329 224 Q307 251 277 220 Q254 248 228 218 Q202 239 183 210 L155 214 Z" },
  { name: "Dermis", text: "The deeper skin layer contains collagen and elastin for strength and flexibility. Blood vessels, sensory nerves, hair follicles and many glands lie here.", highlight: "M162 241 L590 250 L583 395 Q380 368 165 355 Z" },
  { name: "Hypodermis", text: "The fatty tissue beneath the skin cushions the body, stores energy and provides insulation. It anchors skin to deeper tissues; it is not part of the skin proper.", highlight: "M166 355 Q384 373 582 399 L565 446 Q373 411 167 398 Z" },
  { name: "Hair & sebaceous glands", text: "Hair grows from follicles and helps with protection and sensing light touch. Sebaceous glands release sebum into follicles, lubricating the skin and hair. Nails also belong to this system and protect the tips of fingers and toes.", highlight: "M192 86 L220 86 L229 291 L205 305 L193 276 Z M374 188 L397 188 L412 305 L372 312 Z" },
  { name: "Sweat glands", text: "Coiled glands produce sweat, which travels up ducts to the surface. Evaporation of sweat removes heat; sweat that simply drips away provides less cooling.", highlight: "M244 294 Q267 283 280 310 Q282 345 254 346 Q234 328 244 294 Z M426 325 Q453 316 454 346 Q450 373 428 362 Z M568 350 Q592 341 595 370 L579 394 L563 376 Z" },
] as const;
export const SKIN_FUNCTIONS = [
  { name: "Protect", title: "A living barrier", part: 0, text: "The epidermis helps keep microbes and harmful substances out and water in. When skin is damaged, clotting and immune responses begin repair, followed by new tissue formation." },
  { name: "Feel", title: "Sensing the surroundings", part: 1, text: "Receptors and nerve endings detect touch, pressure, temperature and pain. Their signals help the nervous system respond to the environment and avoid injury." },
  { name: "Cool down", title: "Release excess heat", part: 4, text: "When you are hot, sweating increases and skin blood vessels widen. Sweat evaporation removes heat, while increased skin blood flow helps transfer heat towards the surface." },
  { name: "Keep warm", title: "Conserve body heat", part: 2, text: "In the cold, skin blood vessels narrow to reduce heat loss. Fat beneath the skin provides insulation. Shivering produces extra heat in skeletal muscles, rather than in the skin itself." },
] as const;
export function skinHead(title: string, description: string) {
  return { meta: [{ title: `${title} · BEPlay` }, { name: "description", content: description }, { property: "og:title", content: `${title} · BEPlay` }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" }] };
}