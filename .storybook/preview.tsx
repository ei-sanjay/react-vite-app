import type { Preview } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { AppProviders } from '../src/providers';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
  },
  decorators: [
    (Story) => (
      <AppProviders>
        <MemoryRouter>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <Story />
          </div>
        </MemoryRouter>
      </AppProviders>
    ),
  ],
};

export default preview;
