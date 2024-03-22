import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage'

test('renders login form with input fields', async () => {
  render(<LoginPage />);
  
  
  await waitFor(() => {
    expect(screen.getByText('Login Here')).toBeInTheDocument();
  });



  
  expect(screen.getByPlaceholderText('Enter your email here')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your password here')).toBeInTheDocument();
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});

test('validates email and password on form submission', async () => {
  render(<LoginPage />);
  
  await waitFor(() => {
    expect(screen.getByText('Login Here')).toBeInTheDocument();
  });

  const signInButton = screen.getByText('Sign In');

  
  fireEvent.click(signInButton);

  
  expect(screen.getByText((content, element) => {
    return content.startsWith('Please enter your') && element.tagName.toLowerCase() === 'div';
  })).toBeInTheDocument();

  
  const emailInput = screen.getByPlaceholderText('Enter your email here');
  const passwordInput = screen.getByPlaceholderText('Enter your password here');
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  
  fireEvent.click(signInButton);

  
  expect(screen.queryByText('Please enter your email.')).not.toBeInTheDocument();
  expect(screen.queryByText('Please enter your password.')).not.toBeInTheDocument();
});