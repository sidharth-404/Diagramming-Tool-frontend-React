import React, { useState } from 'react';
import './App.css';
import Registration from './Component/Register/Registration';
import MsgComponent from './Component/ConfirmMsg/MsgComponent';
const App = () => {
const [showModal, setShowModal] = useState(false);

// const openModal = () => {
//   setShowModal(true);
// };

// const closeModal = () => {
//   setShowModal(false);
//   alert("hai");
// };
// const cancelModel=()=>{
//   setShowModal(false);
// }
// const msg="hai hoi"
  
  return (
    <div className="App">
      <header className="App-header">
<Registration/>
      </header>

      
    </div>
  );
};

export default App;
