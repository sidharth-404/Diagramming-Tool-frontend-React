import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const history = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      // If logged in, redirect to home page
      history('/');
    }
  }, [history]);

  return (
    <div className='text-center'>
      <p>Not a member? <Link to='/register' className='link'>Register</Link></p>
      <p>Forgot password? <Link to='/reset' className='link'>Reset Password</Link></p>
    </div>
  );
}

export default Login;
