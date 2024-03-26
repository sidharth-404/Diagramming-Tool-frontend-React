import React from 'react';
import Cookies from 'js-cookie';
import {  useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navi=useNavigate();
  const handleLogout = () => {
    
    // Remove the 'token' cookie
    Cookies.remove('token'); 
    navi('/');
  };

  return (
    <div>
      <p>Logging out...</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutPage;