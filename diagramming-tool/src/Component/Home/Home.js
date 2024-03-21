import React, { useState } from 'react';
import './Home.css';
import { Rectangle, RoundedRectangle, Square, Circle, Ellipse, Diamond, Parallelogram, Hexagon, Triangle, Line, ConnectorLine, BidirectionalConnector } from "./Shapes";
import { IoArrowUndo, IoArrowRedo } from "react-icons/io5";
import { MdDeleteForever, MdFileOpen } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import * as diagram from 'diagram-js';

const Home = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState("");

  const handleUndo = () => {
    console.log("Undo clicked");
  };

  const handleRedo = () => {
    console.log("Redo clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  const handleSave = () => {
    console.log("Save clicked");
  };

  const handleOpen = () => {
    console.log("File opened");
  }

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    switch (button) {
      case "open":
        handleOpen();
        break;
      case "undo":
        handleUndo();
        break;
      case "redo":
        handleRedo();
        break;
      case "delete":
        handleDelete();
        break;
      case "save":
        handleSave();
        break;
      default:
        break;
    }
  };

  const handleButtonHover = (button) => {
    setHoveredButton(button.toLowerCase());
  };

  return (
    <div className="container"> 
      <div className="sidebar">
        <h2>Shapes</h2>
        <div className="sidebar1" style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
          {/* Add onMouseOver event handler to each shape */}
          <Rectangle 
            onMouseOver={() => setSelectedShape("Rectangle")} 
            onMouseOut={() => setSelectedShape(null)} 
          />
          
          <RoundedRectangle 
            onMouseOver={() => setSelectedShape("RoundedRectangle")} 
            onMouseOut={() => setSelectedShape(null)} 
          />
          <Square 
            onMouseOver={() => setSelectedShape("Square")} 
            onMouseOut={() => setSelectedShape(null)} 
          />
          <Circle 
            onMouseOver={() => setSelectedShape("Circle")} 
            onMouseOut={() => setSelectedShape(null)} 
          />
          <Ellipse 
            onMouseOver={() => setSelectedShape("Ellipse")} 
            onMouseOut={() => setSelectedShape(null)} 
          />
          <Diamond 
            onMouseOver={() => setSelectedShape("Diamond")} 
            onMouseOut={() => setSelectedShape(null)} 
          />
          <Parallelogram 
            onMouseOver={() => setSelectedShape("Parallelogram")} 
            onMouseOut={() => setSelectedShape(null)} 
          />
          <Hexagon 
            onMouseOver={() => setSelectedShape("Hexagon")} 
            onMouseOut={() => setSelectedShape(null)} 
          />
          <Triangle 
            onMouseOver={() => setSelectedShape("Triangle")} 
            onMouseOut={() => setSelectedShape(null)} 
          />
          <Line 
            onMouseOver={() => setSelectedShape("Line")} 
            onMouseOut={() => setSelectedShape(null)} 
          />
          <ConnectorLine 
            onMouseOver={() => setSelectedShape("ConnectorLine")} 
            onMouseOut={() => setSelectedShape(null)} 
          />
          <BidirectionalConnector 
            onMouseOver={() => setSelectedShape("BidirectionalConnector")} 
            onMouseOut={() => setSelectedShape(null)} 
          />
        </div>
      </div>
      <div className="main">
        <div className="button-container">
          <button
            onMouseOver={() => handleButtonHover("open")}
            onClick={() => handleButtonClick("open")}
            className={selectedButton === "open" ? "selected" : ""}
          >
            <MdFileOpen />
            {hoveredButton === "open" && <span className="tooltip">Open</span>}
          </button>
          <button
            onMouseOver={() => handleButtonHover("save")}
            onClick={() => handleButtonClick("save")}
            className={selectedButton === "save" ? "selected" : ""}
          >
            <TfiSave />
            {hoveredButton === "save" && <span className="tooltip">Save</span>}
          </button>
          <button
            onMouseOver={() => handleButtonHover("undo")}
            onClick={() => handleButtonClick("undo")}
            className={selectedButton === "undo" ? "selected" : ""}
          >
            <IoArrowUndo />
            {hoveredButton === "undo" && <span className="tooltip">Undo</span>}
          </button>
          <button
            onMouseOver={() => handleButtonHover("redo")}
            onClick={() => handleButtonClick("redo")}
            className={selectedButton === "redo" ? "selected" : ""}
          >
            <IoArrowRedo />
            {hoveredButton === "redo" && <span className="tooltip">Redo</span>}
          </button>
          <button
            onMouseOver={() => handleButtonHover("delete")}
            onClick={() => handleButtonClick("delete")}
            className={selectedButton === "delete" ? "selected" : ""}
          >
            <MdDeleteForever />
            {hoveredButton === "delete" && <span className="tooltip">Delete</span>}
          </button>
        </div>
        <h2>Draw Here!!</h2>
        <div className="selected-shape">{selectedShape && <selectedShape />}</div>
        
      </div>
    </div>
  );
};

export default Home;
