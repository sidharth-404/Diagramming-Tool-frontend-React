import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navi=useNavigate();
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
     
        try {
            const response = await fetch('http://localhost:8080/api/diagrammingtool/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
               "userEmail": username,
                "password":password
              }),
            });
            
        const data = await response.text();
        document.cookie = `token=${data}; path=/`;
       navi('/logout');
        console.log(data);
      } catch (error) {
        // Handle error, e.g., display error message to the user
        console.error('Login failed:', error.message);
      }
      
    };
  
    return (
      <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
      <div className='text-center'>
            <p>Not a member? <Link to='/register' className='link'>Register</Link></p>
          </div>

    
      </div>
      
    );
  };
  
  export default LoginForm;