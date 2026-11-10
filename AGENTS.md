<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Learning modules are defined once in `src/lib/modules.ts`; cards, module pages and progress topics all read from it so a new path only needs one entry plus its route file.
- Learner progress (XP, achievements, topics) lives in `src/lib/progress.ts` via the `useProgress` hook backed by localStorage, read after mount to avoid hydration mismatches; swap its storage for the backend when accounts arrive.
- Respiratory section definitions live in `src/data/respiratory.ts`; separate un-nested leaf routes share `RespiratoryLesson` so section navigation and short interactive lessons remain consistent.
- Nervous section definitions live in `src/data/nervous.ts`; un-nested leaf routes share `NervousLesson` to keep anatomy, signal and reflex navigation consistent.
