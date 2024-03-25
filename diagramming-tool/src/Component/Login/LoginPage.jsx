import React, { useState } from 'react';
import { MDBContainer, MDBInput } from 'mdb-react-ui-kit';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/diagrammingtool/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ); 
      }

      console.log('Login successful');
     
    } catch (error) {
      setError(error.message );
    }
  };

  return (
    <div className='center-container'>
      <div className='box'>
        <MDBContainer className='p-3 my-5 d-flex flex-column w-50'>
          <h1 style={{ textAlign: 'center', color: 'grey', fontSize: '24px', marginBottom: '20px' }}>
            <i><strong>Login Here</strong></i>
          </h1>

          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <MDBInput wrapperClass='mb-4' placeholder='Enter your email here' id='form1' type='email' className='custom-input' value={email} onChange={(e) => setEmail(e.target.value)} />
            <MDBInput wrapperClass='mb-4' placeholder='Enter your password here' id='form2' type='password' className='custom-input' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type='submit' value='Sign In' />
          </form>

          <div className='text-center'>
            <p>Not a member? <a href='#!'>Register</a></p>
          </div>
        </MDBContainer>
      </div>
    </div>
  );
}

export default App;
