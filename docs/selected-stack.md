# Selected stack

This document explains each choice made when generating **react-vite-vitest-cypress**, how to use it day-to-day, and the practices that keep the codebase maintainable.

## Build — Vite

Vite gives fast HMR and a Rollup-based production build. Config lives in `vite.config.ts`.

**Day-to-day:** `pnpm dev` → http://localhost:5173

**Best practices**

- Lock Node and package manager versions in CI.
- Treat `build` as the source of truth for production issues (not only `dev`).
- Keep path aliases (`@/`) in sync between TS config and the bundler.

## Language — TypeScript

TypeScript is the default (and only) language for scaffolds. Keep `strict` on; avoid `any` except at true boundaries (third-party quirks, gradual migrations).

**Pattern:** model API payloads in `src/types/models.ts`, not inline in components.

## Routing — React Router

Client-side navigation with nested layouts. Keep route modules thin; push data loading into features.

**Best practices**

- Colocate route-level UI under `src/routes/`.
- Avoid fetching in layout components unless every child needs the data.
- Use loading/error UI at the feature boundary.

## Client state — Redux Toolkit

Use for UI state (modals, wizards, ephemeral counters). Do **not** mirror server entities here if you have a server-state library.

**Live demo:** `/counter` → `src/features/counter/`

**Best practices**

- Feature-local state first; promote to global only when multiple distant trees need it.
- Keep stores/slices focused on one domain.
- Prefer selectors/hooks over reading the whole store in components.

## Server state — RTK Query

Caches remote data, handles loading/error, and deduplicates requests.

**Live demo:** `/posts` → `src/features/posts/PostsPanel.tsx`

**How to use**

1. Define endpoints in `src/store/postsApi.ts` (or a new `*Api` slice).
2. Export hooks (`useGetPostsQuery`, `useCreateFeedbackMutation`).
3. Call hooks from features — no manual `useEffect` fetching.

**Best practices**

- Use `tagTypes` + `providesTags` / `invalidatesTags` for cache coherence.
- Put auth headers in `prepareHeaders`, not in every endpoint.
- Prefer mutations for writes; invalidate related query tags after success.

## Forms — None / Validation — None

Schemas define the contract; the form library binds inputs. Share schemas with API payloads when possible.

**Live demo:** `/feedback` → `src/features/feedback/FeedbackForm.tsx`
**Schemas:** `src/lib/validation.ts`

**Best practices**

- Validate on submit (and optionally on blur) — avoid blocking every keystroke unless UX requires it.
- Keep error messages user-facing; log technical details separately.
- Reuse the same schema on the server if you own both sides.

## Styling — Styled Components / UI — MUI

Tokens and primitives establish visual consistency. Prefer composition over one-off CSS.

**Best practices**

- Wrap third-party primitives in thin adapters (`UiButton`) so swapping kits later is cheaper.
- Keep global tokens in `src/styles/`; keep feature-specific styles close to the feature.

## API — RTK Query (fetchBaseQuery)

HTTP is owned by **RTK Query** (`fetchBaseQuery`). There is intentionally **no** separate Axios/Fetch client in this project.

See `docs/examples/data-fetching.md` and `src/store/postsApi.ts`.

## Quality gates

| Area          | Choice                           |
| ------------- | -------------------------------- |
| Unit          | Vitest + React Testing Library   |
| E2E           | Cypress                          |
| Visual        | Storybook                        |
| Lint          | ESLint + Prettier                |
| Lint / format | ESLint + Prettier + Prettier     |
| Git hooks     | Husky + lint-staged + commitlint |
| Structure     | Feature-based + `@/` aliases     |

See `docs/examples/` for focused usage notes with deeper examples.
