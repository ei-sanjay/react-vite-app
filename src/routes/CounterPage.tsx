import { CounterPanel } from '@/features/counter/CounterPanel';

export function CounterPage() {
  return (
    <div className="page">
      <header className="page-intro">
        <p className="eyebrow">Client state</p>
        <h1>Counter</h1>
        <p className="lede">
          Interactive counter wired to <strong>Redux Toolkit</strong>. Use this pattern for UI state
          that is not server cache.
        </p>
      </header>
      <CounterPanel />
    </div>
  );
}
