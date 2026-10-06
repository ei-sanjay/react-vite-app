# Forms & validation example

**Forms:** None
**Validation:** None

**Live demo:** `/feedback` → `src/features/feedback/FeedbackForm.tsx`
**Schemas:** `src/lib/validation.ts`

## When to use

Multi-field input with client-side rules and async submit:

- contact / feedback forms
- settings screens
- multi-step wizards (add a stepper on top of the same schema)

## How to use in this project

1. Define the schema once in `src/lib/validation.ts`.
2. Bind inputs with None.
3. On submit, call the API layer:
   - RTK mutation: `useCreateFeedbackMutation()` → `.unwrap()`
4. Show success with `data-testid="feedback-success"` (and `aria-live="polite"`) and reset the form.

### Native form pattern

Keep values in `useState`, run the schema/validator on submit, then call the API helper.

## Best practices

- **Single source of truth for rules** — schemas in `src/lib`, not duplicated `if` checks in JSX.
- Validate **on submit** first; add on-blur validation when users need earlier feedback.
- Map API validation errors (422) back onto fields when the backend returns field paths.
- Disable the submit button while `isSubmitting` to prevent double posts.
- Keep forms accessible: real `<label>`, `aria-invalid`, and visible error text.
- Do not store form drafts in global client state unless the draft must survive across routes.

## Testing tips

- Assert validation messages for empty submit.
- Mock the network boundary (API helper or RTK mutation) and assert `data-testid="feedback-success"`.
- Prefer `userEvent` over `fireEvent` for realistic typing.

## Related

- HTTP / RTK details: `docs/examples/api.md`
- Live UI: `/feedback`
