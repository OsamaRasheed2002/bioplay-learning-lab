import { createFileRoute } from "@tanstack/react-router";

import { DailyChallenge } from "@/components/bio/DailyChallenge";
import { ModulePage } from "@/components/bio/ModulePage";

export const Route = createFileRoute("/challenges")({
  head: () => ({
    meta: [
      { title: "Interactive Challenges — BEPlay" },
      { name: "description", content: "Quizzes, diagnosis puzzles and design missions that earn you XP." },
      { property: "og:title", content: "Interactive Challenges — BEPlay" },
      { property: "og:description", content: "Quizzes, diagnosis puzzles and design missions that earn you XP." },
    ],
  }),
  component: ChallengesPage,
});

function ChallengesPage() {
  return (
    <>
      <ModulePage id="challenges" />
      <section className="mx-auto max-w-6xl px-5">
        <DailyChallenge />
      </section>
    </>
  );
}
