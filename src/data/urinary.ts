export const URINARY_SECTIONS = [
  { id: "anatomy", to: "/anatomy/urinary/anatomy", title: "Simple Anatomy", description: "Kidneys, ureters, bladder and urethra on a detailed anatomical picture." },
  { id: "function", to: "/anatomy/urinary/function", title: "How the Urinary System Works", description: "From filtering blood to storing and releasing urine." },
] as const;
export type UrinarySection = typeof URINARY_SECTIONS[number]["id"];
export const URINARY_PARTS = [
  { name: "Kidneys", text: "Two bean-shaped organs filter blood and help balance water, salts and acidity. Tiny filtering units called nephrons make urine. The kidneys also release hormones involved in blood pressure and red blood cell production.", highlight: "M435 214 C390 208 344 250 338 291 C326 339 352 378 391 369 Q429 367 436 338 Q434 318 407 310 Q391 287 417 278 Q463 270 452 238 Q452 222 435 214 Z M573 194 C610 195 647 244 652 282 C659 327 638 360 607 359 Q567 360 557 333 Q548 315 574 305 Q595 290 580 273 Q536 268 542 238 Q535 207 573 194 Z" },
  { name: "Ureters", text: "Two narrow muscular tubes carry urine from the kidneys to the bladder. Gentle waves of muscle contraction, called peristalsis, move it along—even when you are lying down.", highlight: "M414 273 Q397 330 409 407 L414 467 Q419 530 409 568 Q404 603 427 605 L424 613 Q394 605 402 570 Q414 530 406 468 L401 407 Q389 330 407 273 Z M548 265 Q532 317 545 395 Q550 446 544 500 Q534 562 548 593 L541 604 Q526 574 536 500 Q544 449 537 395 Q526 317 540 265 Z" },
  { name: "Bladder", text: "A stretchy muscular organ stores urine until you are ready to empty it. Stretch signals tell the nervous system that it is filling. Its detrusor muscle contracts during urination.", highlight: "M450 575 Q491 555 532 581 Q549 600 529 624 Q489 650 454 627 Q427 603 450 575 Z" },
  { name: "Urethra", text: "The tube that carries urine from the bladder out of the body. Sphincter muscles help control release. This picture shows male anatomy; the female urethra is shorter. The labelled prostate belongs to the male reproductive system and surrounds the upper urethra.", highlight: "M484 632 L498 632 L498 765 Q494 782 487 773 Z" },
] as const;
export const URINARY_STEPS = [
  { name: "Filter", title: "Blood is filtered", part: 0, text: "In each nephron, a glomerulus filters water and small dissolved substances out of blood. Blood cells and most proteins stay in the bloodstream." },
  { name: "Reclaim & adjust", title: "Keep what the body needs", part: 0, text: "Nephron tubules return most filtered water, useful salts and glucose to the blood. They also add some wastes to the fluid. Hormones such as ADH adjust water recovery; what remains becomes urine." },
  { name: "Transport & store", title: "Urine collects in the bladder", part: 2, text: "Urine drains from each kidney through a ureter. Muscular waves carry it into the bladder, which stretches as it fills. This is a one-way journey—not blood flowing through the tubes." },
  { name: "Release", title: "Emptying the bladder", part: 3, text: "When urination begins, the bladder muscle contracts and the outlet sphincters relax. Urine leaves through the urethra. The nervous system coordinates this process." },
] as const;
export function urinaryHead(title: string, description: string) {
  return { meta: [{ title: `${title} · BEPlay` }, { name: "description", content: description }, { property: "og:title", content: `${title} · BEPlay` }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" }] };
}