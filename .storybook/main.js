import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const metaEnv = {
  MODE: 'development',
  VITE_API_BASE_URL: process.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  VITE_SENTRY_DSN: process.env.VITE_SENTRY_DSN || '',
  VITE_BUGSNAG_API_KEY: process.env.VITE_BUGSNAG_API_KEY || '',
  VITE_LOGROCKET_APP_ID: process.env.VITE_LOGROCKET_APP_ID || '',
  VITE_DATADOG_APPLICATION_ID: process.env.VITE_DATADOG_APPLICATION_ID || '',
  VITE_DATADOG_CLIENT_TOKEN: process.env.VITE_DATADOG_CLIENT_TOKEN || '',
  VITE_DATADOG_SITE: process.env.VITE_DATADOG_SITE || 'datadoghq.com',
};

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(dirname, '../src'),
        },
      },
      define: {
        'import.meta.env': JSON.stringify(metaEnv),
      },
    });
  },
};

export default config;
