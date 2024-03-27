import React from 'react';
import './App.css';
import Registration from './Component/Register/Registration.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/LoginPage.jsx';
import HomePage from './Component/HomePage/HomePage.jsx';
import ResetPasswordPage from './Component/Login/ResetPasswordPage.jsx'
import Home from './Component/Home/Home.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
         
        </header>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path='/reset' element={<ResetPasswordPage/>}/>
          <Route path='/dashboard' element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
