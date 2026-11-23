import { Link } from "@tanstack/react-router";
import {
  Baby,
  Bone,
  Brain,
  Droplets,
  Dumbbell,
  FlaskConical,
  HeartPulse,
  Layers,
  Scan,
  Utensils,
  Wind,
  type LucideIcon,
} from "lucide-react";

import planesImg from "@/assets/anatomical-planes-portable.jpg";
import heartImg from "@/assets/heart-diagram.jpg";
import respiratoryImg from "@/assets/respiratory-anatomy.jpg";
import nervousImg from "@/assets/nervous-anatomy.jpg";
import skeletonImg from "@/assets/skeleton-front.jpg";
import digestiveImg from "@/assets/digestive-anatomy.jpg";
import muscularImg from "@/assets/muscular-anatomy-portable.jpg";
import endocrineImg from "@/assets/endocrine-anatomy-portable.jpg";
import skinImg from "@/assets/skin-anatomy-portable.jpg";
import urinaryImg from "@/assets/urinary-anatomy-portable.jpg";
import reproductiveImg from "@/assets/reproductive-female-simple.jpg";
import { TONE_CLASSES, type LearningModule, type ModuleTone } from "@/lib/modules";
import { cn } from "@/lib/utils";

type TopicVisual = { image: string; icon: LucideIcon; tone: ModuleTone };

const TOPIC_VISUALS: Record<string, TopicVisual> = {
  "Anatomical planes": { image: planesImg, icon: Scan, tone: "sky" },
  "Cardiovascular system": { image: heartImg, icon: HeartPulse, tone: "peach" },
  "Respiratory system": { image: respiratoryImg, icon: Wind, tone: "sky" },
  "Nervous system": { image: nervousImg, icon: Brain, tone: "lavender" },
  "Skeletal system": { image: skeletonImg, icon: Bone, tone: "mint" },
  "Digestive system": { image: digestiveImg, icon: Utensils, tone: "peach" },
  "Muscular system": { image: muscularImg, icon: Dumbbell, tone: "lavender" },
  "Endocrine system": { image: endocrineImg, icon: FlaskConical, tone: "mint" },
  "Integumentary system": { image: skinImg, icon: Layers, tone: "peach" },
  "Urinary system": { image: urinaryImg, icon: Droplets, tone: "sky" },
  "Reproductive system": { image: reproductiveImg, icon: Baby, tone: "lavender" },
};

export function AnatomyTopicCards({
  topics,
  topicLinks,
}: {
  topics: string[];
  topicLinks: LearningModule["topicLinks"];
}) {
  return (
    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((t, i) => {
        const link = topicLinks?.[t];
        const visual = TOPIC_VISUALS[t];
        const title = t
          .replace(/\bsystem\b/gi, "System")
          .replace(/\bplanes\b/gi, "Planes");
        const tone = TONE_CLASSES[visual?.tone ?? "mint"];
        const Icon = visual?.icon;

        const body = (
          <>
            {visual && (
              <div className="relative h-32 overflow-hidden">
                <img
                  src={visual.image}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-card/80 px-2 py-0.5 font-mono text-[10px] font-bold backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            )}
            <div className={cn("p-5", visual && "-mt-7 relative")}>
              {Icon && (
                <div
                  className={cn(
                    "mb-3 grid size-11 place-items-center rounded-2xl border border-border shadow-soft transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110",
                    tone.soft,
                    tone.text,
                  )}
                >
                  <Icon className="size-5" />
                </div>
              )}
              <div className="font-display text-lg font-semibold">{title}</div>
              <div
                className={cn(
                  "mt-1 text-xs transition-all duration-200",
                  link
                    ? cn("font-semibold group-hover:brightness-125", tone.text)
                    : "text-muted-foreground",
                )}
              >
                Unit {i + 1} ·{" "}
                {link ? (
                  <span className="inline-flex items-center gap-1">
                    Explore now
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                ) : (
                  "coming soon"
                )}
              </div>
            </div>
          </>
        );

        const cls = cn(
          "animate-fade-up group block overflow-hidden rounded-3xl border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float",
          link ? tone.ring : "border-border",
        );

        return link ? (
          <Link
            key={t}
            to={link}
            style={{ animationDelay: `${i * 70}ms` }}
            className={cls}
          >
            {body}
          </Link>
        ) : (
          <div
            key={t}
            style={{ animationDelay: `${i * 70}ms` }}
            className={cls}
          >
            {body}
          </div>
        );
      })}
    </div>
  );
}
