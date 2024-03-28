import React from 'react';
import './App.css';
import Registration from './Component/Register/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/HomePage/HomePage.js';
import LoginPage from './Component/Login/LoginPage';
import './Component/Login/LoginPage.css';
import CanvasComponent from './Component/Dashboard/Canvas';

function App() {
  return (

    <Router>
      <div className="App">
        <header className="App-header"> 
        </header>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<CanvasComponent/>}/>
        </Routes>
      </div>
    </Router>
    

  );
}

export default App;
