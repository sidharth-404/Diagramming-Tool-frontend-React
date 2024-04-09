import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResetPasswordPage from './ResetPasswordPage';


describe('ResetPasswordPage component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
  });

  it('updates email state correctly', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('updates new password state correctly and validates password', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    const newPasswordInput = screen.getByLabelText('New Password:');
    fireEvent.change(newPasswordInput, { target: { value: 'weakpassword' } });
    const newPasswordError = screen.getByText(
      'Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character.'
    );
    expect(newPasswordError).toBeTruthy();
  });

  it('updates confirm password state correctly and validates matching password', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    const newPasswordInput = screen.getByLabelText('New Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password:');
    fireEvent.change(newPasswordInput, { target: { value: 'strongPassword1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    const confirmPasswordError = screen.getByText('Passwords do not match');
    expect(confirmPasswordError).toBeTruthy();
  });

  it('submits the form correctly', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email:');
    const newPasswordInput = screen.getByLabelText('New Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(newPasswordInput, { target: { value: 'strongPassword1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'strongPassword1!' } });
    const submitButton = screen.getAllByText('Reset Password')[1];
    fireEvent.click(submitButton);
    
  });
});