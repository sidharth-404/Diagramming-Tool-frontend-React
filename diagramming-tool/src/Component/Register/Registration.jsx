import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import { registerUser } from '../../ApiService/ApiService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userEmail: '',
    password: '',
    confirmPassword: ''
  });


  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });


    if (name === 'firstName') {
      if (!/^[a-zA-Z]*$/.test(value)) {
        setErrors({
          ...errors,
          firstName: 'Numbers not allowed in the first name'
        });
      } else {
        setErrors({
          ...errors,
          firstName: value.trim() === '' ? 'First Name is required' : (value.length < 2 || value.length > 20 ? 'First Name must be between 2 and 20 characters' : '')
        });
      }

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
      toast.error("Please fix the form errors!");
      return;
    }

    try {
      const response = await registerUser(formData);
      
      if (response.status ===201) {
        toast.success("User added successfully! Please login.")
        setTimeout(() => {
          navigateToLogin();
        }, 4000);
      }
    } catch (error) {
      toast.error(error)
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };





  return (
    <div className="registration-container">
      <form data-testid ="registration-form" onSubmit={handleSubmit}>
        <div className="form-left">
          <h2 className="registration-heading">Registration</h2>
          <div className="form-group">
            <label htmlFor="firstName" className="red-asterisk">First Name:</label>
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
            <label htmlFor="lastName" className="red-asterisk">Last Name:</label>
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
            <label htmlFor="userEmail">Email:</label>
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
            <label htmlFor="password" className="red-asterisk">Password:</label>
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
            <label htmlFor="confirmPassword" className="red-asterisk">Confirm Password:</label>
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
    </div>
  );
};

export default Registration;