import { Link } from 'react-router-dom';

import { StackBadge } from '@/components/StackBadge';
import { ROUTES } from '@/config/routes';

const demos = [
  {
    to: ROUTES.COUNTER,
    title: 'Counter',
    body: 'Client state demo with Redux Toolkit.',
  },
  {
    to: ROUTES.POSTS,
    title: 'Posts',
    body: 'Server state / data fetching with RTK Query.',
  },
  {
    to: ROUTES.FEEDBACK,
    title: 'Feedback',
    body: 'Forms and validation with None.',
  },
] as const;

export function HomePage() {
  return (
    <div className="page home-page">
      <section className="hero">
        <p className="eyebrow">Starter workspace</p>
        <h1>react-vite-vitest-cypress</h1>
        <p className="lede">
          A production-shaped React starter. Open each demo route to explore client state, server
          data, and forms — each page is a real working example for your selected stack.
        </p>
        <div className="hero-actions">
          <Link className="ui-button" to={ROUTES.COUNTER}>
            Open counter demo
          </Link>
          <Link className="text-link" to={ROUTES.ABOUT}>
            About this starter →
          </Link>
        </div>
        <div className="stack-row">
          <StackBadge label="Build" value="Vite" />
          <StackBadge label="Language" value="TypeScript" />
          <StackBadge label="Router" value="React Router" />
          <StackBadge label="State" value="Redux Toolkit" />
          <StackBadge label="Data" value="RTK Query" />
          <StackBadge label="UI" value="MUI" />
        </div>
      </section>

      <section className="panels" aria-label="Demo routes">
        {demos.map((demo) => (
          <article key={demo.to} className="panel">
            <header className="panel-header">
              <h2>{demo.title}</h2>
              <p>{demo.body}</p>
            </header>
            <Link className="text-link" to={demo.to}>
              Go to {demo.title.toLowerCase()} →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
