import type { Meta, StoryObj } from '@storybook/react';

import { AboutPage } from '@/routes/AboutPage';
import { CounterPage } from '@/routes/CounterPage';
import { FeedbackPage } from '@/routes/FeedbackPage';
import { HomePage } from '@/routes/HomePage';
import { PostsPage } from '@/routes/PostsPage';

const meta = {
  title: 'Pages/Routes',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Route-level pages composed from feature panels. Useful for visual review of layout and copy.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Home: Story = {
  render: () => <HomePage />,
};

export const About: Story = {
  render: () => <AboutPage />,
};

export const Counter: Story = {
  render: () => <CounterPage />,
};

export const Posts: Story = {
  render: () => <PostsPage />,
};

export const Feedback: Story = {
  render: () => <FeedbackPage />,
};
