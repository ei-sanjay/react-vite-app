# Styling & UI example

**Styling:** Styled Components
**UI library:** MUI

## When to use

Establish design tokens early; use a component library for complex accessible primitives (dialogs, menus, focus traps).

## How to use in this project

| Piece                  | Location                         |
| ---------------------- | -------------------------------- |
| Global styles / tokens | `src/styles/global.css`          |
| Button adapter         | `src/components/ui/UiButton.tsx` |
| Layout chrome          | `src/components/layout/`         |

### Styled Components

Create styled primitives next to the component. Prefer transient props (`$active`) so DOM attributes stay clean.

## MUI notes

Wrap third-party components in thin adapters (`UiButton`) so swapping kits later is cheaper and theme overrides stay centralized (see `providers.tsx`).

## Best practices

- One visual language: spacing, type scale, and radius should feel intentional.
- Prefer composition over deep CSS specificity wars.
- Ensure focus states are visible for keyboard users.
- Keep marketing/landing flair out of app chrome unless product requires it.

## Related

- Architecture: `docs/architecture.md`
- Accessibility checklist: `docs/best-practices.md`
