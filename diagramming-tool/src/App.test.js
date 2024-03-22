
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "Register" text in the application', () => {
  render(<App />);
  const registerText = screen.getByText(/Registration/i);
  expect(registerText).toBeInTheDocument();
});
