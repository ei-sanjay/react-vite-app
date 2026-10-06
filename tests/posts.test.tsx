import { screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { PostsPanel } from '@/features/posts/PostsPanel';

import { renderWithProviders } from './test-utils';

describe('PostsPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the posts panel chrome', async () => {
    renderWithProviders(<PostsPanel />);
    expect(screen.getByRole('heading', { name: 'Server state' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Refresh/i })).toBeInTheDocument();
  });
});
