import { render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { AppProviders } from '@/providers';

interface Options {
  route?: string;
}

function Wrapper({ children, route = '/' }: { children: ReactNode; route?: string }) {
  return (
    <AppProviders>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </AppProviders>
  );
}

export function renderWithProviders(ui: ReactElement, options: Options = {}) {
  return render(ui, {
    wrapper: ({ children }) => <Wrapper route={options.route}>{children}</Wrapper>,
  });
}
