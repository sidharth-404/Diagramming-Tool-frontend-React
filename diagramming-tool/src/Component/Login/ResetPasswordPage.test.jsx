/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ResetPasswordPage from './ResetPasswordPage';

describe('ResetPasswordPage', () => {
  it('renders without crashing', () => {
    render(<MemoryRouter><ResetPasswordPage /></MemoryRouter>);
  });

  it('displays email input and send OTP button initially', () => {
    render(<MemoryRouter><ResetPasswordPage /></MemoryRouter>);
    const emailInput = screen.getByText('Email:');
    const sendOtpButton = screen.getByTestId('sendOtp');
    
    expect(emailInput).toBeInTheDocument();
    expect(sendOtpButton).toBeInTheDocument();
  });

  it('displays OTP input and reset password form after sending OTP', async () => {
    render(<MemoryRouter><ResetPasswordPage /></MemoryRouter>);
    const emailInput = screen.getByLabelText('Email:');
    const sendOtpButton = screen.getByTestId('sendOtp');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      const otpInput = screen.getByLabelText('OTP:', { exact: false });
      expect(otpInput).toBeInTheDocument();
    });
  });

  it('displays error message if new password does not meet criteria', async () => {
     render(<MemoryRouter><ResetPasswordPage /></MemoryRouter>);

    const emailInput =screen.getByText('Email:');
    const sendOtpButton = screen.getByTestId('sendOtp');

    emailInput.value = 'test@example.com';
    fireEvent.click(sendOtpButton); fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      const newPasswordInput =screen.getByText('New Password:');
      const resetPwdButton =screen.getByTestId('resetPwd');

      fireEvent.change(newPasswordInput, { target: { value: 'weak' } });
      fireEvent.click(resetPwdButton);

      const errorElement =screen.getByText('Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character.');
      expect(errorElement).toBeInTheDocument();
    });
  });

  it('displays error message if passwords do not match', async () => {
    render(<MemoryRouter><ResetPasswordPage /></MemoryRouter>);
    const emailInput = screen.getByText('Email:');
    const sendOtpButton =screen.getByTestId('sendOtp');

    emailInput.value = 'test@example.com';
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      const newPasswordInput =screen.getByText('New Password:');
      const confirmPasswordInput =screen.getByText('Confirm New Password:');
      const resetPwdButton =screen.getByTestId('resetPwd');

      fireEvent.change(newPasswordInput, { target: { value: 'StrongPassword123!' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPassword123!' } });
      fireEvent.click(resetPwdButton);

      const errorElement = screen.getByText('Passwords do not match');
      expect(errorElement).toBeInTheDocument();
    });
  });

  it('displays success message after resetting password', async () => {
    render(<MemoryRouter><ResetPasswordPage /></MemoryRouter>);
    const emailInput =screen.getByText('Email:');
    const sendOtpButton =screen.getByTestId('sendOtp');

   
    emailInput.value = 'test@example.com';
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      const otpInput =screen.getByText('OTP:');
      const newPasswordInput =screen.getByText('New Password:');
      const confirmPasswordInput =screen.getByText('Confirm New Password:');
      const resetPwdButton =screen.getByTestId('resetPwd');

      fireEvent.change(otpInput, { target: { value: '123456' } });
      fireEvent.change(newPasswordInput, { target: { value: 'StrongPassword123!' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'StrongPassword123!' } });
      fireEvent.click(resetPwdButton);

      const successElement =screen.getByText('Password reset successfully.');
      expect(successElement).toBeInTheDocument();
    });
  });

  it('redirects to login page after resetting password', async () => {
    render(<MemoryRouter><ResetPasswordPage /></MemoryRouter>);
    const emailInput =screen.getByText('Email:');
    const sendOtpButton =screen.getByTestId('sendOtp');

    emailInput.value = 'test@example.com';
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      const otpInput =screen.getByText('OTP:');
      const newPasswordInput =screen.getByext('New Password:');
      const confirmPasswordInput =screen.getByText('Confirm New Password:');
      const resetPwdButton =screen.getByTestId('resetPwd');

      fireEvent.change(otpInput, { target: { value: '123456' } });
      fireEvent.change(newPasswordInput, { target: { value: 'StrongPassword123!' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'StrongPassword123!' } });
      fireEvent.click(resetPwdButton);
    });

    await waitFor(() => {
      const backToLoginLink =screen.getByText('Back to Login');
      fireEvent.click(backToLoginLink);
      expect(window.location.pathname).toBe('/login');
    });
  });

  describe('handleNewPasswordChange', () => {
    it('sets error message if password does not meet criteria', () => {
      render(<MemoryRouter><ResetPasswordPage /></MemoryRouter>);
      const newPasswordInput = screen.getByText('New Password:');

      fireEvent.change(newPasswordInput, { target: { value: 'weak' } });

      const errorElement =screen.getByText('Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character.');
      expect(errorElement).toBeInTheDocument();
    });

    it('does not set error message if password meets criteria', () => {
      render(<MemoryRouter><ResetPasswordPage /></MemoryRouter>);
      const newPasswordInput =screen.getByText('New Password:');

      fireEvent.change(newPasswordInput, { target: { value: 'StrongPassword123!' } });

      const errorElement = screen.queryByText('Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character.');
      expect(errorElement).toBeNull();
    });
  });


});
