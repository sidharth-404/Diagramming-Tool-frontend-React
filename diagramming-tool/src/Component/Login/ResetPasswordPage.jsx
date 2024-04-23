import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendResetPasswordEmail, verifyResetPasswordOTP } from '../../ApiService/ApiService'; 
import MsgBoxComponent from '../ConfirmMsg/MsgBoxComponent'; 
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [showResponseBox, setShowResponseBox] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false); 
  const history = useNavigate();

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  const handleNewPasswordChange = (e) => {
    const newPasswordValue = e.target.value;

    if (!passwordRegex.test(newPasswordValue)) {
      setNewPasswordError('Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character.');
    } else {
      setNewPasswordError('');
    }

    setNewPassword(newPasswordValue);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;

    if (newPassword !== confirmPasswordValue) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }

    setConfirmPassword(confirmPasswordValue);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendResetPasswordEmail(email);
    
        setOtpSent(true);
        setResponseMessage('OTP sent to your email.');
        setShowResponseBox(true);
      
    } catch (error) {
      console.error(error);
      alert(error);
      setResponseMessage(error);
      setShowResponseBox(true);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await verifyResetPasswordOTP(email, newPassword, otp);
      setOtpVerified(true);
      setResponseMessage('Password reset successfully.');
      setShowResponseBox(true);
      clearFormFields();
    } catch (error) {
      console.error('Error verifying OTP and resetting password:', error);
      setResponseMessage(error);
      setShowResponseBox(true);
    }
  };

  const clearFormFields = () => {
    setEmail('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleOkClick = () => {
    setShowResponseBox(false);
    
    if (responseMessage === 'Password reset successfully.') {
      history('/login');
    } else if (responseMessage === 'OTP sent to your email.') {
      setShowOtpForm(true);
    } else if (responseMessage === 'User not found') {
     console.log("resetting",otpVerified)
    }
    setResponseMessage('');
  };

  const handleCloseMsgBox = () => {
    setShowResponseBox(false);
    setResponseMessage('');
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {!otpSent ? (
        <form onSubmit={handleEmailSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <div>
          <MsgBoxComponent showMsgBox={showResponseBox} closeMsgBox={handleCloseMsgBox} msg={responseMessage} handleClick={handleOkClick} />
          {showOtpForm && (
            <form onSubmit={handleResetPassword}>
              <div>
                <label>OTP:</label>
                <input type="text" value={otp} onChange={handleOtpChange} required />
              </div>
              <div>
                <label>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                />
                {newPasswordError && <div className="error">{newPasswordError}</div>}
              </div>
              <div>
                <label>Confirm New Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
              </div>
              <button type="submit">Reset Password</button>
            </form>
          )}
        </div>
      )}
      <div className="back-to-login">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;