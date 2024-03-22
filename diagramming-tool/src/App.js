import React, { useState } from 'react';
import './App.css';
import MsgComponent from './Component/ConfirmMsg/MsgComponent';
const App = () => {

  const [showModal, setShowModal] = useState(false);

const openModal = () => {
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
  alert("hai");
};
const cancelModel=()=>{
  setShowModal(false);
}
const msg="hai hoi"
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>HAi</h1>
        <button className="btn btn-primary" onClick={openModal}>
Open Modal
</button>
      <MsgComponent showModal={showModal} closeModal={closeModal} cancelModel={cancelModel} msg={msg} /> 

      </header>

      
    </div>
  );
};

export default App;
