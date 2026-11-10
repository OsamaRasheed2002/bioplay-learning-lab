import cellsImage from "@/assets/reproduction-cells.jpg";
import cycleImage from "@/assets/reproduction-cycle.jpg";
import fertilisationImage from "@/assets/reproduction-fertilisation.jpg";
import implantationImage from "@/assets/reproduction-implantation.jpg";

export const REPRODUCTIVE_STAGE_IMAGES = [
  { src: cellsImage, alt: "Pituitary hormone signalling to ovaries and testes, alongside an egg and sperm cells" },
  { src: cycleImage, alt: "Ovarian follicles developing and releasing an egg, with an inset of the thickening uterine lining" },
  { src: fertilisationImage, alt: "Sperm approaching an egg and contacting its protective outer covering during fertilisation" },
  { src: implantationImage, alt: "A blastocyst attaching to and beginning to embed in the uterine lining" },
] as const;

export const REPRODUCTIVE_SECTIONS = [
  { id: "anatomy", to: "/anatomy/reproductive/anatomy", title: "Simple Anatomy", description: "Male and female organs in labelled anatomical cross-sections." },
  { id: "function", to: "/anatomy/reproductive/function", title: "How Reproduction Works", description: "Reproductive cells, hormones and the beginnings of pregnancy." },
] as const;
export type ReproductiveSection = typeof REPRODUCTIVE_SECTIONS[number]["id"];
export const REPRODUCTIVE_PARTS = {
  female: [
    { name: "Ovaries", text: "The ovaries contain egg cells and produce hormones, including oestrogen and progesterone. Usually one ovary releases an egg during ovulation." },
    { name: "Uterine tubes", text: "Also called fallopian tubes, these carry an egg towards the uterus using tiny cilia and muscle contractions. Fertilisation usually occurs in a tube, not in the uterus." },
    { name: "Uterus", text: "A hollow muscular organ where a pregnancy can develop. Its inner lining, the endometrium, changes through the menstrual cycle and is shed during a period if pregnancy does not occur." },
    { name: "Cervix", text: "The lower, narrow part of the uterus opens into the vagina. It produces mucus that changes through the cycle and dilates during childbirth." },
    { name: "Vagina", text: "The vagina is a muscular canal connecting the cervix to the outside. The vulva is the external genital region. The urethra is a separate opening for urine." },
  ],
  male: [
    { name: "Testes", text: "The testes make sperm and testosterone. They sit in the scrotum, which helps keep them slightly cooler than core body temperature for sperm production." },
    { name: "Epididymis", text: "A tightly coiled tube beside each testis where sperm mature and are stored before moving into the vas deferens." },
    { name: "Vas deferens", text: "A muscular duct that transports sperm from the epididymis towards the ejaculatory duct." },
    { name: "Prostate & seminal vesicles", text: "These glands add fluid to sperm to form semen. Seminal vesicle fluid supplies nutrients, while prostate fluid supports sperm function. The prostate sits below the bladder." },
    { name: "Penis & urethra", text: "The urethra runs through the penis and carries semen out during ejaculation. It also carries urine, but the body normally prevents both passing at the same time. Erectile tissue fills with blood during an erection." },
  ],
} as const;
export const REPRODUCTIVE_STEPS = [
  { name: "Cells & hormones", title: "Making reproductive cells", text: "The testes produce sperm, while the ovaries contain egg cells. Brain signals—FSH and LH—help regulate the gonads. Testosterone, oestrogen and progesterone support reproductive function." },
  { name: "Ovulation & cycle", title: "The menstrual cycle", text: "Hormones support egg maturation and prepare the uterine lining. Ovulation releases an egg. If pregnancy does not occur, falling hormone levels trigger shedding of the lining. Cycle timing varies; ovulation is not always on day 14." },
  { name: "Fertilisation", title: "Sperm and egg meet", text: "Sperm travel through the cervix and uterus towards the uterine tubes. If a sperm joins an egg, fertilisation forms a zygote, which begins dividing as it moves towards the uterus." },
  { name: "Implantation", title: "A pregnancy begins developing", text: "Several days after fertilisation, the developing blastocyst can attach to the uterine lining. The placenta then develops to exchange nutrients, oxygen and wastes between maternal and fetal circulations without normally mixing their blood directly." },
] as const;
export function reproductiveHead(title: string, description: string) {
  return { meta: [{ title: `${title} · BEPlay` }, { name: "description", content: description }, { property: "og:title", content: `${title} · BEPlay` }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" }] };
}