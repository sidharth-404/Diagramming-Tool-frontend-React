import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import axios from 'axios';
import MsgComponent from '../ConfirmMsg/MsgComponent';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userEmail: '',
    password: '',
    confirmPassword: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate input fields
    if (name === 'firstName') {
      setErrors({
        ...errors,
        firstName: value.length < 2 || value.length > 20 ? 'First Name must be between 2 and 20 characters' : ''
      });
    } else if (name === 'lastName') {
      setErrors({
        ...errors,
        lastName: value.length < 2 || value.length > 20 ? 'Last Name must be between 2 and 20 characters' : ''
      });
    } else if (name === 'userEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        userEmail: !emailRegex.test(value) ? 'Please enter a valid email address' : ''
      });
    } else if (name === 'password') {
      setErrors({
        ...errors,
        password: !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
          ? 'Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character'
          : ''
      });
    } else if (name === 'confirmPassword') {
      setErrors({
        ...errors,
        confirmPassword: value !== formData.password ? 'Passwords do not match' : ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error !== '')) {
      setMsg('Please fix the form errors.');
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/diagrammingtool/addUser', formData);
      if (response.status === 201) {
        setMsg('User added successfully! Please login.');
        setShowModal(true);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // If there is a response from the server with error message
        setMsg(error.response.data);
      } else {
        // If there's an error without a response (network error, etc.)
        setMsg('Error adding user. Please try again.');
      }
      setShowModal(true);
    
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const handleOkClick = () => {
    setShowModal(false);
    setMsg('');
  };

  const closeModal = () => {
    setShowModal(false);
    setMsg('');
  };
  const cancelModal = () => {
    setShowModal(false);
    setMsg('');
  };

  useEffect(() => {
    let timer;
    if (msg === 'User added successfully! Please login.') {
      timer = setTimeout(() => {
        navigateToLogin();
      }, 3000); // Redirect to login after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [msg, navigateToLogin]);

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <div className="form-left">
          <h2 className="registration-heading">Registration</h2>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              required
            />
            {errors.userEmail && <span className="error">{errors.userEmail}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <button type="submit">Register</button>
        </div>
      </form>
      <div className="background-right"></div>

      <MsgComponent showModal={showModal} closeModal={closeModal} cancelModel={cancelModal} msg={msg} handleOkClick={handleOkClick} />

    </div>
  );
};

export default Registration;
