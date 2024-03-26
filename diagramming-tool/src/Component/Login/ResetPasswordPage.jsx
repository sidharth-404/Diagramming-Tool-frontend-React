
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();

   
    console.log('Password reset logic here');
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
      <div className="back-to-login">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
