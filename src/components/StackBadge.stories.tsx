import type { Meta, StoryObj } from '@storybook/react';

import { StackBadge } from '@/components/StackBadge';

const meta = {
  title: 'Components/StackBadge',
  component: StackBadge,
  tags: ['autodocs'],
  args: {
    label: 'Build',
    value: 'Vite',
  },
} satisfies Meta<typeof StackBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Language: Story = {
  args: {
    label: 'Language',
    value: 'TypeScript',
  },
};

export const Row: Story = {
  render: () => (
    <div className="stack-row">
      <StackBadge label="Build" value="Vite" />
      <StackBadge label="Router" value="React Router" />
      <StackBadge label="State" value="Redux Toolkit" />
      <StackBadge label="Data" value="RTK Query" />
    </div>
  ),
};
