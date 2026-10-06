import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, beforeEach } from 'vitest';

import { CounterPanel } from '@/features/counter/CounterPanel';
import { setValue, store } from '@/store';

import { renderWithProviders } from './test-utils';

describe('CounterPanel', () => {
  beforeEach(() => {
    store.dispatch(setValue(0));
  });
  it('starts at 0 and updates when increment/decrement are clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CounterPanel />);

    expect(screen.getByTestId('counter-value')).toHaveTextContent('0');

    await user.click(screen.getByTestId('counter-increment'));
    expect(screen.getByTestId('counter-value')).toHaveTextContent('1');

    await user.click(screen.getByTestId('counter-increment'));
    expect(screen.getByTestId('counter-value')).toHaveTextContent('2');

    await user.click(screen.getByTestId('counter-decrement'));
    expect(screen.getByTestId('counter-value')).toHaveTextContent('1');
  });

  it('exposes accessible increment/decrement controls', () => {
    renderWithProviders(<CounterPanel />);
    expect(screen.getByTestId('counter-increment')).toHaveAttribute('aria-label', 'Increment');
    expect(screen.getByTestId('counter-decrement')).toHaveAttribute('aria-label', 'Decrement');
  });
});
