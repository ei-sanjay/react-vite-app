# Testing example

| Layer  | Choice                         |
| ------ | ------------------------------ |
| Unit   | Vitest + React Testing Library |
| E2E    | Cypress                        |
| Visual | Storybook                      |

## When to use

| Layer      | Use for                                    | Avoid using for            |
| ---------- | ------------------------------------------ | -------------------------- |
| Unit / RTL | logic, component behavior, form validation | full auth/payment journeys |
| E2E        | critical user journeys across routes       | asserting every CSS class  |
| Visual     | regressions in appearance / states         | business-rule correctness  |

## How to run

```bash
pnpm test
pnpm test:watch
```

```bash
pnpm test:e2e:install   # once (downloads the Cypress app binary)
pnpm test:e2e
pnpm cypress:open
```

The `cypress` npm package is not enough — Cypress also needs the desktop binary under `~/Library/Caches/Cypress`. `pnpm`/`npm install` often skips that download; `test:e2e:install` runs `cypress install`.

```bash
pnpm storybook
```

## Project layout

- Setup: `tests/setup.ts` (when applicable)
- Unit suites: `tests/*.test.tsx`
- E2E: `cypress/e2e/*.cy.ts` (same journeys as Playwright: home, navigation, counter, posts, feedback)
- Stories: `src/**/*.stories.tsx`

## Best practices

- Query the way users do: `getByRole`, label text, placeholder — not implementation details.
- Mock at the **network/domain boundary**:
  - mock RTK hooks/endpoints for unit tests when you are not integration-testing the store
- Keep e2e **thin**: home load, posts happy path, feedback submit.
- Do not let unit tests import Cypress specs (`cypress/`).
- For async UI, prefer `findBy*` / `waitFor` over arbitrary `sleep`.

## Example unit test shape

```tsx
renderWithProviders(<FeedbackForm />);
await user.click(screen.getByRole('button', { name: /Send feedback/i }));
expect(screen.getAllByText(/required|valid email/i).length).toBeGreaterThan(0);
```

## Related

- Strategy & CI: `docs/best-practices.md`
- Forms guide: `docs/examples/forms.md`
