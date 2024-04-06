import React from 'react';

import Registration from './Component/Register/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Component/Login/LoginPage';
import './Component/Login/LoginPage.css';
import ResetPasswordPage from './Component/Login/ResetPasswordPage';

import CanvasComponent from './Component/Dashboard/Canvas';
import HomePage from './Component/HomePage/HomePage';
import DiagramPage from './Component/Login/DiagramPage';
import ExistingPage from './Component/Login/ExistingPage';


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
          <Route  path="/diagram" element={<DiagramPage/>} />
          <Route path="/existing" element={<ExistingPage/>}/>
          

        </Routes>
      </div>
    </Router>
    
   

  );
}

export default App;
