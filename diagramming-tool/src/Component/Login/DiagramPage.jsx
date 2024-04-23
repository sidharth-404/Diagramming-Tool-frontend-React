import React from 'react';
import './DiagramPage.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';


function DiagramPage({ onClose }) {

  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
 
  const navigate = useNavigate();

  const openCanvas = () => {

    navigate('/dashboard');
  };

  const openExistingDiagrams = () => {

    navigate('/existing');
    ; 
  };
  
  return (
    <div className="popup-container">
      <div className="popup">

        <button className="create-btn" onClick={openCanvas}>Create New Diagram</button>
        <button className="open-btn" onClick={openExistingDiagrams}>Open Existing Diagram
        </button>
      

      </div>
    </div>
  );
}

export default DiagramPage; 
