import React, { useState } from 'react';
import './ChangePassword.css';
import { changePasswordApi } from '../../ApiService/ApiService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert package
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS for react-confirm-alert

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    userEmail: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    jwtToken: Cookies.get('token')
  });
  const navi = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await changePasswordApi(formData);
      if (typeof response === 'object' && response.hasOwnProperty('userEmail')) {
        // Show success message
        showConfirmAlert('User added successfully! Please login.');
      } else {
        // Show success message and navigate to dashboard
        if (response === 'Password changed successfully') {
          showConfirmAlert(response, () => {
            navi('/dashboard');
          });
        }
      }
    } catch (error) {
      console.error(error);
      showerrorAlert(error);
    }
  };

  const showConfirmAlert = (message, callback = () => {}) => {
    confirmAlert({
      title: 'Success',
      message: message,
      buttons: [
        {
          label: 'OK',
          onClick: callback
        }
      ]
    });
  };
  

  const showerrorAlert = (message, callback = () => {}) => {
    confirmAlert({
      title: 'Error',
      message: message,
      buttons: [
        {
          label: 'OK',
          onClick: callback
        }
      ]
    });
  };

  

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userEmail">UserEmail</label>
          <input
            type="text"
            id="userEmail"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentPassword">Old Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ChangePassword;
