





import React, { useState } from 'react';
import './Registration.css'; 

const Registration = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

   
    if (name === 'firstname') {
      const isValidFirstName = value.length >= 2 && value.length <= 20;
      setErrors({
        ...errors,
        firstname: isValidFirstName ? '' : 'First Name must be between 2 and 20 characters long'
      });
    }
    
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(value);
      setErrors({
        ...errors,
        email: isValidEmail ? '' : 'Please enter a valid email address'
      });
    }

    
    if (name === 'password') {
      const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      setErrors({
        ...errors,
        password: isValidPassword ? '' : 'Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character'
      });
    }

    
    if (name === 'confirmPassword') {
      setErrors({
        ...errors,
        confirmPassword: value !== formData.password ? 'Passwords do not match' : ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <div className="form-left">
          <h2 className="registration-heading">Registration</h2>
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input 
              type="text" 
              id="firstname"
              name="firstname" 
              value={formData.firstname} 
              onChange={handleChange} 
              required 
            />
            {errors.firstname && <span className="error">{errors.firstname}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input 
              type="text" 
              id="lastname"
              name="lastname" 
              value={formData.lastname} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            {errors.email && <span className="error">{errors.email}</span>}
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
            {errors.password && <p className="error">{errors.password}</p>}
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
    </div>
  );
};

export default Registration;