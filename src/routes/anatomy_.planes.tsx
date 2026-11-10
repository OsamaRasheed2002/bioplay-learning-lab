import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import diagram from "@/assets/anatomical-planes.png.asset.json";

export const Route = createFileRoute("/anatomy_/planes")({
  head: () => ({ meta: [
    { title: "Anatomical Planes · BEPlay" },
    { name: "description", content: "The sagittal, frontal and transverse planes of the body in one simple labelled diagram." },
    { property: "og:title", content: "Anatomical Planes · BEPlay" },
    { property: "og:description", content: "Explore the three main anatomical planes with a simple diagram and short definitions." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AnatomicalPlanes,
});

function AnatomicalPlanes() {
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-5xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy"><ArrowLeft /> Anatomy Explorer</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-sky-deep">Anatomy Explorer · Unit 11</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Anatomical Planes</h1>
    <p className="mt-3 text-muted-foreground">Three imaginary planes divide the body into different views.</p>
    <figure className="mx-auto mt-8 max-w-xl overflow-hidden rounded-3xl"><img src={diagram.url} alt="Standing human figure showing sagittal, frontal and transverse planes, with longitudinal, frontal and sagittal axes" width={656} height={772} className="block w-full" /></figure>
    <dl className="mt-8 grid gap-6 sm:grid-cols-3">
      <div><dt className="font-bold text-mint-deep">Sagittal plane</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">Divides the body into left and right. The midsagittal plane makes equal halves.</dd></div>
      <div><dt className="font-bold text-sky-deep">Frontal (coronal) plane</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">Divides the body into front and back.</dd></div>
      <div><dt className="font-bold text-lavender-deep">Transverse plane</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">Divides the body into upper and lower parts.</dd></div>
    </dl>
  </div></section>;
}