import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { FeedbackForm } from '@/features/feedback/FeedbackForm';

import { renderWithProviders } from './test-utils';

vi.mock('@/store/postsApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/store/postsApi')>();
  return {
    ...actual,
    useCreateFeedbackMutation: () => [
      vi.fn(() => ({
        unwrap: vi.fn(async () => ({ id: 101 })),
      })),
      { isLoading: false },
    ],
  };
});

describe('FeedbackForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows validation errors when submitting empty values', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FeedbackForm />);

    await user.click(screen.getByTestId('feedback-submit'));

    await waitFor(() => {
      expect(document.querySelectorAll('.field-error').length).toBeGreaterThan(0);
    });
  });

  it('submits valid feedback and shows success status', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FeedbackForm />);

    await user.type(screen.getByPlaceholderText('Ada Lovelace'), 'Ada Lovelace');
    await user.type(screen.getByPlaceholderText('ada@example.com'), 'ada@example.com');
    await user.type(
      screen.getByPlaceholderText('What should we improve?'),
      'Please add more routing examples.',
    );
    await user.click(screen.getByTestId('feedback-submit'));

    await waitFor(() => {
      expect(screen.getByTestId('feedback-success')).toHaveTextContent(/submitted successfully/i);
    });
  });
});
