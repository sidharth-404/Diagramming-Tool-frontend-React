
import React, { useState } from 'react';
import { MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import { login } from '../../ApiService/auth';
import { Link } from 'react-router-dom'
import DiagramPage from './DiagramPage';

function LoginApp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDiagramPopup, setShowDiagramPopup] = useState(false);
  const toggleDiagramPopup = () => {
    setShowDiagramPopup(!showDiagramPopup);
  };

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


      const data = await login(email, password);
      const result = await data.text();
      if (!data.ok) {

        throw new Error(result);
      }
      document.cookie = `token=${result}; path=/`;
      toggleDiagramPopup();


    } catch (error) {
      setError(error.message);

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
            <MDBInput wrapperClass='mb-4' placeholder='Enter your email here' id='form1' type='email' className='custom-input' value={email} onChange={(e) => setEmail(e.target.value)} /><br></br>
            <MDBInput wrapperClass='mb-4' placeholder='Enter your password here' id='form2' type='password' className='custom-input' value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>
            <input type='submit' value='Sign In' />
          </form>

          <div className='text-center'>
            <p>Not a member? <Link to='/register'>Register</Link></p>
            <p>Reset Password?<Link to='/reset-password' className='link'> Reset here.</Link></p>
          </div>
          {showDiagramPopup && <DiagramPage onClose={toggleDiagramPopup} />}
        </MDBContainer>
      </div>


    </div>
  );
}

export default LoginApp;



