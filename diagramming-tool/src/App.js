import './App.css';
import Registration from './Component/Register/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/LoginPage.jsx';
import Home from './Component/HomePage/HomePage.js';
import LoginForm from './Component/Login/LoginForm.jsx';
import LogoutPage from './Component/Login/LogoutPage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
         
        </header>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
