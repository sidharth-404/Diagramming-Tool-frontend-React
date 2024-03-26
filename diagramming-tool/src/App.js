import React from 'react';
import './App.css';

import LoginPage from './Component/Login/LoginPage';
import './Component/Login/LoginPage.css';

import Home from './Component/Home/Home';


function App() {
  return (
    <div className="App">
      <header className="App-header">
         <LoginPage/>

       {/* <HomePage/> */}

       <Home/>
       {/* <ChangePassword/> */}

      </header>
    </div>
  );
}

export default App;
