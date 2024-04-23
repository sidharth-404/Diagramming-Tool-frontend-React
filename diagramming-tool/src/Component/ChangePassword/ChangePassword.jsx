import React, { useState } from 'react';
import './ChangePassword.css';
import { changePasswordApi } from '../../ApiService/ApiService';
import MsgBoxComponent from '../ConfirmMsg/MsgBoxComponent';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const ChangePassword = () => {
  const [showMsgBox, setShowMsgBox] = useState(false);
  const [msg, setMsg] = useState('');
  const navi = useNavigate();
  const [formData, setFormData] = useState({
    userEmail: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    jwtToken: Cookies.get('token')
  });

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
        setMsg('User added successfully! Please login.');
      } else {
        setMsg(response);
      }
      setShowMsgBox(true);
    } catch (error) {
      setMsg(error);
      setShowMsgBox(true);
    }
  };
  const navigateToDAsh = () => {
    navi('/dashboard')

  }

  const closeMsgBox = () => {
    setShowMsgBox(false);
    setMsg('')
  }
  const handleOkClick = () => {
    if (msg === 'Password changed successfully') {
      navigateToDAsh();
    }
    setShowMsgBox(false);
    setMsg('');
  }

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

      <MsgBoxComponent showMsgBox={showMsgBox} msg={msg} closeMsgBox={closeMsgBox} handleClick={handleOkClick} />
    </div>
  );
};
export default ChangePassword;