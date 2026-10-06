# Architecture

## Why this stack

You selected a coherent default-friendly stack during scaffolding. The generator wires providers, scripts, and demo routes so packages are not orphaned in `package.json`.

| Concern      | Choice                     | Role                          |
| ------------ | -------------------------- | ----------------------------- |
| Bundler      | Vite                       | Dev server + production build |
| Language     | TypeScript                 | Source language / typing      |
| Routing      | React Router               | URL → UI mapping              |
| Client state | Redux Toolkit              | Local interactive state       |
| Server state | RTK Query                  | Remote data cache             |
| Forms        | None                       | Form state & submit           |
| Validation   | None                       | Schema rules                  |
| Styling      | Styled Components          | Visual system                 |
| UI kit       | MUI                        | Components / primitives       |
| API          | RTK Query (fetchBaseQuery) | HTTP transport                |

## Folder organization (feature-based)

```text
src/
  main.tsx       # bootstrap + render
  providers.tsx  # global providers (store, query, theme)
  App.tsx        # route tree
  assets/
  components/            # shared UI (layout/, ui/)
  config/                # env + app config
  features/              # domain modules (counter, posts, feedback)
  hooks/
  lib/                   # validation, monitoring helpers
  routes/                # page-level route components
  services/              # HTTP client + domain API (when selected)
  store/                 # client state + RTK Query APIs (when selected)
  styles/
  types/                 # shared domain models
  utils/
```

**Rules of thumb**

- Put new product work in `src/features/<domain>/`.
- Keep `components/` presentational and reusable.
- Import with the `@/` alias.
- Prefer a feature's public surface over deep cross-feature imports.
- Keep providers thin — wiring belongs in `providers.tsx`, business logic does not.

## Routes

App paths live in `src/config/routes.ts` (`ROUTES`). API paths live in
`src/config/api-routes.ts` (`API_ROUTES`). Prefer those constants over string literals.

| Path                | Purpose            | Primary demo       |
| ------------------- | ------------------ | ------------------ |
| `ROUTES.HOME` (`/`) | Home overview      | Stack orientation  |
| `ROUTES.COUNTER`    | Client state       | Redux Toolkit      |
| `ROUTES.POSTS`      | Server state       | RTK Query          |
| `ROUTES.FEEDBACK`   | Forms + validation | None               |
| `ROUTES.ABOUT`      | Orientation        | Architecture notes |

## Path aliases

`@/*` maps to `src/*` in TypeScript/JS config and in your bundler. Prefer `@/features/...` over long relative paths.

## Runtime composition

```text
main → AppProviders → App (router) → layout → page → feature panels
```

Provider order matters: client store → server cache → UI theme.

## Boundaries

- **HTTP** for remote resources lives in RTK Query APIs (`src/store/*Api.ts`), not in components.
- Use `fetchBaseQuery` + `prepareHeaders` for auth, base URL, and shared headers.
- Do **not** add a parallel Axios/Fetch client unless you have a clear non-RTK integration (uploads to a different host, third-party SDK, etc.).
- **Schemas** live in `lib/validation` and are reused by forms and API payloads.
- **Env access** stays in `config/`, services/store, and `lib/monitoring`.
- **Client state** holds UI/ephemeral state; **server state** caches remote entities.

## Scaling tips

1. Split large features into `components/`, `hooks/`, and `api/` subfolders inside the feature.
2. Promote shared types into `src/types/` once two features need them.
3. Keep route files thin — they compose features, they should not own data logic.
4. Prefer explicit query keys / endpoint names over anonymous fetch calls.
