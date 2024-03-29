

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';

test('renders login form with input fields', () => {
  render(<LoginPage />);
  expect(screen.getByPlaceholderText('Enter your email here')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your password here')).toBeInTheDocument();
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});

test('validates email field on form submission with empty email', async () => {
  render(<LoginPage />);
  fireEvent.click(screen.getByText('Sign In'));
  expect(await screen.findByText('Please enter your email.')).toBeInTheDocument();
});

test('validates password field on form submission with empty password', async () => {
  render(<LoginPage />);
  fireEvent.change(screen.getByPlaceholderText('Enter your email here'), { target: { value: 'test@example.com' } });
  fireEvent.click(screen.getByText('Sign In'));
  expect(await screen.findByText('Please enter your password.')).toBeInTheDocument();
});

jest.setTimeout(10000); 


test('handles server error', async () => {
  
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: false,
    json: async () => ({ error: 'Server error' })
  });

  render(<LoginPage />);
  fireEvent.change(screen.getByPlaceholderText('Enter your email here'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Enter your password here'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText('Sign In'));
  const expectedErrorMessage='Server error';


  expect(await screen.findByText(expectedErrorMessage)).toBeInTheDocument();

});


test('submits form successfully with valid email and password', async () => {

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => ({})
  });

  render(<LoginPage />);
  fireEvent.change(screen.getByPlaceholderText('Enter your email here'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Enter your password here'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText('Sign In'));

  await waitFor(() => {
    expect(screen.queryByText('An error occurred.')).not.toBeInTheDocument();
  });
});



