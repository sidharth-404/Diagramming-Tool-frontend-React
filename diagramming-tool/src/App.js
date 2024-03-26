import './App.css';
import Registration from './Component/Register/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/Login';

import ResetPasswordPage from './Component/Login/ResetPasswordPage';
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
         
        </header>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
        </Routes>
      </div>
    </Router>
  );
}
 
export default App;