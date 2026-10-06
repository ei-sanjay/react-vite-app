# Client state example

**Library:** Redux Toolkit

**Live demo:** `/counter` → `src/features/counter/CounterPanel.tsx`
**Store wiring:** `src/store/`

## When to use

Shared interactive state that is **not** fetched from an API:

- wizard steps, UI toggles, selected tabs
- ephemeral counters / filters that reset often
- cross-route UI that should survive navigation but not a full reload

If the data comes from your backend, prefer **RTK Query** instead.

## How to use in this project

1. Counter slice lives in `src/store/index.ts` (`counterSlice` + `store`).
2. Read/write with `useSelector` / `useDispatch` from the feature panel (or add typed hooks later).

```tsx
import { useDispatch, useSelector } from 'react-redux';
import { increment, type RootState } from '@/store';

const value = useSelector((s: RootState) => s.counter.value);
const dispatch = useDispatch();
dispatch(increment());
```

## Best practices

- **Feature-local first.** Promote to global only when props drilling becomes painful across routes.
- **One concern per store/slice.** Avoid a single “appState” blob.
- **Do not mirror server entities** in client state when you already use RTK Query.
- Prefer selectors/hooks over reading the entire store in leaf components.
- Keep side effects (HTTP, analytics) out of reducers; trigger them from thunks/listeners/components.

## Common pitfalls

- Putting API responses into Redux/Zustand “because we might need them later”
- Updating global state on every keystroke in a form (forms belong to None)
- Forgetting to reset ephemeral UI state when leaving a flow
