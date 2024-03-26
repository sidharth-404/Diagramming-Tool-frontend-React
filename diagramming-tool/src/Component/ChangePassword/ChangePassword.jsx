// ChangePassword.js

import React from 'react';
import './ChangePassword.css'; // Import the CSS file

const ChangePassword = () => {
  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input type="password" id="oldPassword" name="oldPassword" />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input type="password" id="newPassword" name="newPassword" />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ChangePassword;
