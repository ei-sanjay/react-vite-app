import { useDispatch, useSelector } from 'react-redux';

import { UiButton } from '@/components/ui/UiButton';
import { decrement, increment } from '@/store';
import type { RootState } from '@/store';

export function CounterPanel() {
  const value = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const onInc = () => dispatch(increment());
  const onDec = () => dispatch(decrement());

  return (
    <article className="panel">
      <header className="panel-header">
        <h2>Client state</h2>
        <p>Redux Toolkit example — local interactive counter.</p>
      </header>
      <div className="counter">
        <UiButton
          type="button"
          aria-label="Decrement"
          data-testid="counter-decrement"
          onClick={onDec}
        >
          −
        </UiButton>
        <strong className="counter-value" data-testid="counter-value" aria-live="polite">
          {value}
        </strong>
        <UiButton
          type="button"
          aria-label="Increment"
          data-testid="counter-increment"
          onClick={onInc}
        >
          +
        </UiButton>
      </div>
      <p className="panel-note">
        <strong>When to use:</strong> shared UI state that is not server cache.
        <br />
        <strong>Best practice:</strong> keep slices/stores small and colocated with features.
      </p>
    </article>
  );
}
