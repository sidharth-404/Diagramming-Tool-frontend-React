import React from 'react';

import { Link } from 'react-router-dom'; 
;

function Login() {


  return (

  
          <div className='text-center'>
            <p>Not a member? <Link to='/register' className='link'>Register</Link></p>
            <p>forgot password? <Link to='/reset' className='link'>Reset Password</Link></p>
          </div>
       
  );
}

export default Login;
