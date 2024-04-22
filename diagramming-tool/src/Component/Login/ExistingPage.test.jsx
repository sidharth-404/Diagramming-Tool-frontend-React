import React from 'react';
import { render, screen } from '@testing-library/react';
import ExistingPage from './ExistingPage';

describe('ExistingPage Component', () => {
  it('renders "Work in Progress" text', () => {
    render(<ExistingPage />);
    const headerElement = screen.getByText(/Work in Progress/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('renders "under development" message', () => {
    render(<ExistingPage />);
    const messageElement = screen.getByText(/This page is under development/i);
    expect(messageElement).toBeInTheDocument();
  });

  it('renders dialogue box with correct class', () => {
    render(<ExistingPage />);
    const dialogueBox = screen.getByRole('dialog');
    expect(dialogueBox).toBeInTheDocument();
  });

  it('renders dialogue content with correct class', () => {
    render(<ExistingPage />);
    const dialogueContent = screen.getByText(/Work in Progress/i);
    expect(dialogueContent).toBeInTheDocument();
  });
});
