/* eslint-disable no-undef */
/* eslint-disable testing-library/prefer-find-by */



import React from 'react';
import { render, fireEvent, screen ,waitFor} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResetPasswordPage from './ResetPasswordPage';
import { sendResetPasswordEmail, verifyResetPasswordOTP } from '../../ApiService/ApiService';

jest.mock('../../ApiService/ApiService', () => ({
  sendResetPasswordEmail: jest.fn(),
  verifyResetPasswordOTP: jest.fn(),
}));


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
  test('handleEmailSubmit success', async () => {
    sendResetPasswordEmail.mockResolvedValueOnce();
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByTestId('sendOtp'));
    await waitFor(() => expect(sendResetPasswordEmail).toHaveBeenCalledWith('test@example.com'));
    await waitFor(() => expect(screen.getByText('OTP sent to your email.')).toBeInTheDocument());
  });


  test('handleResetPassword failure', async () => {
    const errorMessage = 'Invalid OTP';
    verifyResetPasswordOTP.mockRejectedValueOnce({ message: errorMessage });
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByTestId('sendOtp'));
    fireEvent.change(screen.getByLabelText('OTP:'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('New Password:'), { target: { value: 'NewPass123!' } });
    fireEvent.change(screen.getByLabelText('Confirm New Password:'), { target: { value: 'NewPass123!' } });
    fireEvent.click(screen.getByTestId('resetPwd'));
    await waitFor(() => expect(verifyResetPasswordOTP).toHaveBeenCalledWith('test@example.com', 'NewPass123!'));
    await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
  });
});

describe('handleOkClick', () => {
  test('redirects to login page when password is reset successfully', () => {
    const historyMock = jest.fn();
    useHistory.mockReturnValue(historyMock);
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );    fireEvent.click(screen.getByText('OK')); // Assuming your OK button has the text 'OK'
    expect(historyMock).toHaveBeenCalledWith('/login');
  });

  test('displays OTP form when OTP is sent to email', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );    fireEvent.click(screen.getByText('OK'));
    expect(screen.getByLabelText('OTP:')).toBeInTheDocument();
  });

  test('logs "resetting" when user is not found', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );    fireEvent.click(screen.getByText('OK'));
    expect(consoleSpy).toHaveBeenCalledWith('resetting', false); // Assuming otpVerified is initially false
    consoleSpy.mockRestore();
  });

  test('clears response message', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );    fireEvent.click(screen.getByText('OK'));
    expect(screen.queryByText(/Password reset successfully\.|OTP sent to your email\.|User not found/)).toBeNull();
  });
});