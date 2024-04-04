import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Canvas.css";
import { Rectangle, Circle, Square, Diamond } from "./NewShapes";
import { IoArrowUndo, IoArrowRedo } from "react-icons/io5";
import { MdDeleteForever, MdFileOpen } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import ShapeTypes from "./ShapeTypes";
import SavePopup from "../SavePopup/SavePopup";
import { saveCanvasImageToDB } from '../../ApiService/ApiService'; 
import MsgBoxComponent from "../ConfirmMsg/MsgBoxComponent";

const CanvasComponent = ({ userId }) => {
  const [showMsgBox, setShowMsgBox] = useState(false); 
  const [msg, setMsg] = useState("");
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState("");
  const [showSavePopup, setShowSavePopup] = useState(false);
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([
    {
      id: 1,
      type: ShapeTypes.RECTANGLE,
      x: 50,
      y: 50,
      width: 100,
      height: 60,
      radius: 0,
      size: 0,
    },
    {
      id: 2,
      type: ShapeTypes.CIRCLE,
      x: 200,
      y: 150,
      width: 0,
      height: 0,
      radius: 50,
      size: 0,
    },
    {
      id: 3,
      type: ShapeTypes.SQUARE,
      x: 350,
      y: 100,
      width: 0,
      height: 0,
      radius: 0,
      size: 80,
    },
    {
      id: 4,
      type: ShapeTypes.DIAMOND,
      x: 500,
      y: 50,
      width: 100,
      height: 100,
      radius: 0,
      size: 0,
    },
  ]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
      if (shape.type === ShapeTypes.RECTANGLE) {
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;
        ctx.fillRect(shape.x, shape.y, shape.width * 2, shape.height);
        ctx.strokeRect(shape.x, shape.y, shape.width * 2, shape.height);
      } else if (shape.type === ShapeTypes.CIRCLE) {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (shape.type === ShapeTypes.SQUARE) {
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;
        ctx.fillRect(shape.x, shape.y, shape.size, shape.size);
        ctx.strokeRect(shape.x, shape.y, shape.size, shape.size);
      } else if (shape.type === ShapeTypes.DIAMOND) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(shape.x + shape.width / 2, shape.y);
        ctx.lineTo(shape.x + shape.width, shape.y + shape.height / 2);
        ctx.lineTo(shape.x + shape.width / 2, shape.y + shape.height);
        ctx.lineTo(shape.x, shape.y + shape.height / 2);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
      }
    });
  }, [shapes]);

  useEffect(() => {
    draw();
  }, [draw]);

  const addShape = (type) => {
    const newShape = {
      id: Date.now(),
      type,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      radius: 50,
      size: 80,
    };
    setShapes([...shapes, newShape]);
    setSelectedShape(newShape.id);
  };

  const handleUndo = () => {};

  const handleRedo = () => {};

  const handleDelete = () => {};

  const handleSave = (fileName, format, saveToDatabase) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
  
  
    if (format === "jpeg") {
      tempCtx.fillStyle = "white";
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    }
  
    shapes.forEach((shape) => {
      if (shape.type === ShapeTypes.RECTANGLE) {
        tempCtx.fillStyle = "white";
        tempCtx.lineWidth = 2;
        tempCtx.fillRect(shape.x, shape.y, shape.width * 2, shape.height);
        tempCtx.strokeRect(shape.x, shape.y, shape.width * 2, shape.height);
      } else if (shape.type === ShapeTypes.CIRCLE) {
        tempCtx.beginPath();
        tempCtx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        tempCtx.fillStyle = "white";
        tempCtx.fill();
        tempCtx.lineWidth = 2;
        tempCtx.stroke();
      } else if (shape.type === ShapeTypes.SQUARE) {
        tempCtx.fillStyle = "white";
        tempCtx.lineWidth = 2;
        tempCtx.fillRect(shape.x, shape.y, shape.size, shape.size);
        tempCtx.strokeRect(shape.x, shape.y, shape.size, shape.size);
      } else if (shape.type === ShapeTypes.DIAMOND) {
        tempCtx.beginPath();
        tempCtx.lineWidth = 2;
        tempCtx.moveTo(shape.x + shape.width / 2, shape.y);
        tempCtx.lineTo(shape.x + shape.width, shape.y + shape.height / 2);
        tempCtx.lineTo(shape.x + shape.width / 2, shape.y + shape.height);
        tempCtx.lineTo(shape.x, shape.y + shape.height / 2);
        tempCtx.closePath();
        tempCtx.fillStyle = "white";
        tempCtx.fill();
        tempCtx.stroke();
      }
    });
  
    tempCanvas.toBlob((blob) => {
      if (!blob) {
        console.error("Failed to convert canvas to blob.");
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        const canvasDataUrl = reader.result;
        if (canvasDataUrl) {
          if (saveToDatabase) {
            const base64String = canvasDataUrl.split(",")[1];
            saveCanvasImageToDB(base64String, userId)
              .then(() => {
                console.log("Canvas image saved to database.");
                setShowMsgBox(true);
                setMsg("Image saved successfully!");
                setShowSavePopup(false);
              })
              .catch((error) => {
                console.error("Error saving canvas image to database:", error);
                setShowSavePopup(false);
                setShowMsgBox(true);
                setMsg("Error in saving");
              });
          } else {
           
            const link = document.createElement("a");
            link.download = fileName + "." + format;
            link.href = canvasDataUrl;
            link.click();
            URL.revokeObjectURL(link.href);
            setShowSavePopup(false);
          }
        }
      };
      reader.readAsDataURL(blob);
    }, "image/" + format);
  };

  const handleOpen = () => {};

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
        setShowSavePopup(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Shapes</h2>
        <div className="sidebar">
          <button onClick={() => addShape(ShapeTypes.RECTANGLE)}>
            <Rectangle width={100} height={60} />
          </button>
          <button onClick={() => addShape(ShapeTypes.CIRCLE)}>
            <Circle radius={50} />
          </button>
          <button onClick={() => addShape(ShapeTypes.SQUARE)}>
            <Square size={80} />
          </button>
          <button onClick={() => addShape(ShapeTypes.DIAMOND)}>
            <Diamond width={100} height={100} />
          </button>
        </div>
      </div>
      <div className="main">
        <div className="button-container">
          <button
            onClick={() => handleButtonClick("open")}
            className={selectedButton === "open" ? "selected" : ""}
          >
            <MdFileOpen />
            {hoveredButton === "open" && <span className="tooltip">Open</span>}
          </button>
          <button
            onClick={() => handleButtonClick("save")}
            className={selectedButton === "save" ? "selected" : ""}
          >
            <TfiSave />
            {hoveredButton === "save" && <span className="tooltip">Save</span>}
          </button>
          <button
            onClick={() => handleButtonClick("undo")}
            className={selectedButton === "undo" ? "selected" : ""}
          >
            <IoArrowUndo />
            {hoveredButton === "undo" && <span className="tooltip">Undo</span>}
          </button>
          <button
            onClick={() => handleButtonClick("redo")}
            className={selectedButton === "redo" ? "selected" : ""}
          >
            <IoArrowRedo />
            {hoveredButton === "redo" && <span className="tooltip">Redo</span>}
          </button>
          <button
            onClick={() => handleButtonClick("delete")}
            className={selectedButton === "delete" ? "selected" : ""}
          >
            <MdDeleteForever />
            {hoveredButton === "delete" && (
              <span className="tooltip">Delete</span>
            )}
          </button>
        </div>
        <div>
          <h1>Draw Here!!</h1>
          <canvas
            ref={canvasRef}
            aria-label="Canvas"
            width={800}
            height={600}
            style={{ border: "1px solid black" }}
          ></canvas>
        </div>
      </div>
      {showSavePopup && (
        <SavePopup
          onSave={handleSave}
          onCancel={() => setShowSavePopup(false)}
        />
      )}

{showMsgBox && (
        <MsgBoxComponent
          showMsgBox={showMsgBox}
          closeMsgBox={() => setShowMsgBox(false)}
          msg={msg}
        />
      )}
    </div>
  );
};

export default CanvasComponent;
