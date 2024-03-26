import React from 'react'
import {Link} from 'react-router-dom';

function Login() {
  return (
    <div>
        <h1>Login
            </h1>
            <p>Register<Link to='/register'> register </Link></p>

            <p>Reset password<Link to='/reset'>reset</Link></p>
            </div>
  )
}

export default Login