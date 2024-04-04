
import Registration from './Component/Register/Registration.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/LoginPage.jsx';
import Home from './Component/HomePage/HomePage.jsx';
import ResetPasswordPage from './Component/Login/ResetPasswordPage.jsx'


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
         
        </header>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path='/reset' element={<ResetPasswordPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
