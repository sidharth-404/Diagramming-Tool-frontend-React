

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders login form with input fields', () => {
  render(<Router>
    <LoginPage />
  </Router>);
  expect(screen.getByPlaceholderText('Enter your email here')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your password here')).toBeInTheDocument();
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});

test('validates email field on form submission with empty email', async () => {
  render(<Router>
    <LoginPage />
  </Router>);
  fireEvent.click(screen.getByText('Sign In'));
  expect(await screen.findByText('Please enter your email.')).toBeInTheDocument();
});

test('validates password field on form submission with empty password', async () => {
  render(<Router>
    <LoginPage />
  </Router>);
  fireEvent.change(screen.getByPlaceholderText('Enter your email here'), { target: { value: 'test@example.com' } });
  fireEvent.click(screen.getByText('Sign In'));
  expect(await screen.findByText('Please enter your password.')).toBeInTheDocument();
});

jest.setTimeout(10000); 



test('submits form successfully with valid email and password', async () => {

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => ({})
  });

  render(<Router>
    <LoginPage />
  </Router>);
  fireEvent.change(screen.getByPlaceholderText('Enter your email here'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Enter your password here'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText('Sign In'));

  await waitFor(() => {
    expect(screen.queryByText('An error occurred.')).not.toBeInTheDocument();
  });
});



