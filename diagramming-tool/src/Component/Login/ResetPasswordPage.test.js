import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResetPasswordPage from './ResetPasswordPage';

describe('ResetPasswordPage', () => {
  it('should render reset password form with required elements', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Reset Password', { selector: 'h2' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('New Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm New Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset Password' })).toBeInTheDocument();
    expect(screen.getByText('Back to Login')).toBeInTheDocument();
  });

  it('should display error messages when passwords are invalid', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );

    const newPasswordInput = screen.getByLabelText('New Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password:');

    fireEvent.change(newPasswordInput, { target: { value: 'invalid' } });
    fireEvent.blur(newPasswordInput);

    expect(screen.getByText('Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character.')).toBeInTheDocument();

    fireEvent.change(confirmPasswordInput, { target: { value: 'invalid' } });
    fireEvent.blur(confirmPasswordInput);

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('should not display error messages when passwords are valid', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );

    const newPasswordInput = screen.getByLabelText('New Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password:');

    fireEvent.change(newPasswordInput, { target: { value: 'ValidPassword123!' } });
    fireEvent.blur(newPasswordInput);

    expect(screen.queryByText('Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character.')).toBeNull();

    fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPassword123!' } });
    fireEvent.blur(confirmPasswordInput);

    expect(screen.queryByText('Passwords do not match')).toBeNull();
  });

  it('should navigate to login page when "Back to Login" link is clicked', () => {
    const { history } = render(
      <MemoryRouter initialEntries={['/']}>
        <ResetPasswordPage />
      </MemoryRouter>
    );

    const backToLoginLink = screen.getByText('Back to Login');
    fireEvent.click(backToLoginLink);

    expect(history.location.pathname).toBe('/login');
  });
});
