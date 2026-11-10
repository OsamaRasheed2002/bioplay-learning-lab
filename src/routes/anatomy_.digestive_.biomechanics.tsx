import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/anatomy_/digestive_/biomechanics")({
  beforeLoad: () => { throw redirect({ to: "/anatomy/digestive", replace: true }); },
});