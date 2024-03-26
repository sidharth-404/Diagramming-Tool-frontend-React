
import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';



const HomePage = () => {
  const navi=useNavigate();
  const handleGetStarted=()=>{
    const token = Cookies.get('token');
    if (token) {
        // Redirect to logout page
       navi('/logout')
      } else {
        // Redirect to login page
        navi('/login')
      }

  }
   
  return (
    <div>Home Page
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default HomePage;



