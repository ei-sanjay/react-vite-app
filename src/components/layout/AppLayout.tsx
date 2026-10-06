import { NavLink, Outlet } from 'react-router-dom';

import { ROUTES } from '@/config/routes';

const links = [
  { to: ROUTES.HOME, label: 'Home', end: true },
  { to: ROUTES.COUNTER, label: 'Counter' },
  { to: ROUTES.POSTS, label: 'Posts' },
  { to: ROUTES.FEEDBACK, label: 'Feedback' },
  { to: ROUTES.ABOUT, label: 'About' },
] as const;

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="brand-name">react-vite-vitest-cypress</p>
            <p className="brand-tagline">Production React starter</p>
          </div>
        </div>
        <nav className="app-nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={'end' in link ? link.end : false}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>Scaffolded with create-react-starter-kit · Vite · TypeScript</p>
      </footer>
    </div>
  );
}
