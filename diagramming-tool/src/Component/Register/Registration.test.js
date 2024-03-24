import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Registration from './Registration';

describe('Registration component', () => {
  it('renders without crashing', () => {
    render(<Registration />);
  });

  it('displays registration heading', () => {
    render(<Registration />);
    const headingElement = screen.getByText('Registration');
    expect(headingElement).toBeInTheDocument();
  });

  it('validates first name input', () => {
    render(<Registration />);
    const firstNameInput = screen.getByLabelText('First Name:');
    fireEvent.change(firstNameInput, { target: { value: 'A' } });
    const errorMessage = screen.getByText('First Name must be between 2 and 20 characters long');
    expect(errorMessage).toBeInTheDocument();
  });

  it('validates email input', () => {
    render(<Registration />);
    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'invalidemail.com' } });
    const errorMessage = screen.getByText('Please enter a valid email address');
    expect(errorMessage).toBeInTheDocument();
  });

  it('validates password input', () => {
    render(<Registration />);
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'weakpassword' } });
    const errorMessage = screen.getByText('Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character');
    expect(errorMessage).toBeInTheDocument();
  });

  it('validates confirm password input', () => {
    render(<Registration />);
    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    const errorMessage = screen.queryByText('Passwords do not match');
    expect(errorMessage).toBeNull();
  });
});

