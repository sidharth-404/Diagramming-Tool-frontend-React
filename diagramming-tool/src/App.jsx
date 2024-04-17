import React from 'react';

import Registration from './Component/Register/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Component/Login/LoginPage';
import './Component/Login/LoginPage.css';
import ResetPasswordPage from './Component/Login/ResetPasswordPage';
import ChangePassword from './Component/ChangePassword/ChangePassword.jsx';
import CanvasComponent from './Component/Dashboard/Canvas';

import HomePage from './Component/HomePage/HomePage';
import ExistingPage from './Component/Login/ExistingPage';
import UserProfile from './Component/UserProfile/UserProfile.jsx';


function App() {
  return (

    <Router>
      <div className="App">
        <header className="App-header"> 
        </header>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
         
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<CanvasComponent/>}/>
          <Route path='/userprofile' element={<UserProfile/>}/>
          <Route path='/changepassword' element={<ChangePassword/>}/>
          <Route path="/existing" element={<ExistingPage/>}/>

        </Routes>
      </div>
      
    </Router>
    
   

  );
}

export default App;

