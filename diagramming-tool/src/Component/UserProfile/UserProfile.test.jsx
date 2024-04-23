import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

describe('UserProfile Component', () => {
  test('renders development message', () => {
    render(<UserProfile />);
    const developmentMessage = screen.getByText(/Development is progressing/i);
    expect(developmentMessage).toBeInTheDocument();
  });
});
