import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AboutPage } from '@/routes/AboutPage';
import { HomePage } from '@/routes/HomePage';

import { renderWithProviders } from './test-utils';

describe('HomePage', () => {
  it('renders the project hero and demo cards', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole('heading', { name: /react-vite-vitest-cypress/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go to counter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go to posts/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go to feedback/i })).toBeInTheDocument();
  });
});

describe('AboutPage', () => {
  it('explains routes and project layout', () => {
    renderWithProviders(<AboutPage />);

    expect(screen.getByRole('heading', { name: /About this starter/i })).toBeInTheDocument();
    expect(screen.getByText(/\/counter/)).toBeInTheDocument();
    expect(screen.getByText(/feature-based/i)).toBeInTheDocument();
  });
});
