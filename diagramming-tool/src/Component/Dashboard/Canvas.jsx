import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Canvas.css";
import { Rectangle, Circle, Square, Diamond } from "./NewShapes";
import { IoArrowUndo, IoArrowRedo } from "react-icons/io5";
import { MdDeleteForever, MdFileOpen } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import ShapeTypes from "./ShapeTypes";
import SavePopup from "../SavePopup/SavePopup";
import { saveCanvasImageToDB,getUserByEmail } from '../../ApiService/ApiService'; 
import MsgBoxComponent from "../ConfirmMsg/MsgBoxComponent";
import Cookies from 'js-cookie';





const CanvasComponent = () => {
  const [msg, setMsg] = useState("");
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showMsgBox, setShowMsgBox] = useState(false); 
  
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [selectedShape,setSelectedShape] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton] = useState("");
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const draggedShape = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [editingShapeId, setEditingShapeId] = useState(null);
  const [textInputs, setTextInputs] = useState({});

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
      switch (shape.type) {
        case ShapeTypes.RECTANGLE:
          ctx.fillStyle = "white";
          ctx.lineWidth = 2;
          ctx.fillRect(shape.x, shape.y, shape.width * 2, shape.height);
          ctx.strokeRect(shape.x, shape.y, shape.width * 2, shape.height);
          break;
        case ShapeTypes.CIRCLE:
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.stroke();
          break;
        case ShapeTypes.SQUARE:
          ctx.fillStyle = "white";
          ctx.lineWidth = 2;
          ctx.fillRect(shape.x, shape.y, shape.size, shape.size);
          ctx.strokeRect(shape.x, shape.y, shape.size, shape.size);
          break;
        case ShapeTypes.DIAMOND:
          ctx.beginPath();
          ctx.moveTo(shape.x + shape.width / 2, shape.y);
          ctx.lineTo(shape.x + shape.width, shape.y + shape.height / 2);
          ctx.lineTo(shape.x + shape.width / 2, shape.y + shape.height);
          ctx.lineTo(shape.x, shape.y + shape.height / 2);
          ctx.closePath();
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.stroke();
          break;
        default:
          break;
      }
      if (textInputs[shape.id]) {
        let centerX, centerY;
        switch (shape.type) {
          case ShapeTypes.RECTANGLE:
            centerX = shape.x + (shape.width * 2) / 2;
            centerY = shape.y + shape.height / 2;
            break;
          case ShapeTypes.SQUARE:
            centerX = shape.x + shape.width / 2;
            centerY = shape.y + shape.height / 2;
            break;
          case ShapeTypes.CIRCLE:
            centerX = shape.x;
            centerY = shape.y;
            break;
          case ShapeTypes.DIAMOND:
            centerX = shape.x + shape.width / 2;
            centerY = shape.y + shape.height / 2;
            break;
          default:
            break;
        }

        let fontSize = 14;
        ctx.font = `${fontSize}px Arial`;
        let text = textInputs[shape.id];


        let textWidth = ctx.measureText(text).width;

        while (textWidth > shape.width) {
          fontSize -= 1;
          ctx.font = `${fontSize}px Arial`;
          textWidth = ctx.measureText(text).width;
        }

        ctx.fillStyle = "black";
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, centerX, centerY);
      }
    });
  
  
    lines.forEach((line) => {
     
      ctx.beginPath();
      ctx.moveTo(line.startPoint.x, line.startPoint.y);
      ctx.lineTo(line.endPoint.x, line.endPoint.y);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    lines.forEach((line) => {
     
      ctx.beginPath();
      ctx.moveTo(line.startPoint.x, line.startPoint.y);
      ctx.lineTo(line.endPoint.x, line.endPoint.y);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    if (selectedShapeId) {
      const selectedShape = shapes.find((shape) => shape.id === selectedShapeId);
      if (selectedShape) {
        drawSelectionPoints(ctx, selectedShape);
      }
    }if (dragging) {
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [shapes, selectedShapeId, dragging, startPoint, endPoint,lines,textInputs]);
  
  useEffect(() => {
    draw();
  }, [draw]);
  
  



  const drawSelectionPoints = (ctx, shape) => {
    const pointSize = 5;
    const halfPointSize = pointSize / 2;
    ctx.fillStyle = "blue";

    switch (shape.type) {
      case ShapeTypes.RECTANGLE:
        ctx.fillRect(shape.x - halfPointSize, shape.y - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.width * 2 - halfPointSize, shape.y - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x - halfPointSize, shape.y + shape.height - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.width * 2 - halfPointSize, shape.y + shape.height - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.width - halfPointSize, shape.y - halfPointSize, pointSize, pointSize); 
        ctx.fillRect(shape.x - halfPointSize, shape.y + shape.height / 2 - halfPointSize, pointSize, pointSize); 
        ctx.fillRect(shape.x + shape.width * 2 - halfPointSize, shape.y + shape.height / 2 - halfPointSize, pointSize, pointSize); 
        ctx.fillRect(shape.x + shape.width - halfPointSize, shape.y + shape.height - halfPointSize, pointSize, pointSize);
        break;
      case ShapeTypes.CIRCLE:
        ctx.fillRect(shape.x - halfPointSize, shape.y - shape.radius - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x - halfPointSize, shape.y + shape.radius - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x - shape.radius - halfPointSize, shape.y - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.radius - halfPointSize, shape.y - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x - shape.radius / Math.sqrt(2) - halfPointSize, shape.y - shape.radius / Math.sqrt(2) - halfPointSize, pointSize, pointSize); 
        ctx.fillRect(shape.x + shape.radius / Math.sqrt(2) - halfPointSize, shape.y - shape.radius / Math.sqrt(2) - halfPointSize, pointSize, pointSize); 
        ctx.fillRect(shape.x - shape.radius / Math.sqrt(2) - halfPointSize, shape.y + shape.radius / Math.sqrt(2) - halfPointSize, pointSize, pointSize); 
        ctx.fillRect(shape.x + shape.radius / Math.sqrt(2) - halfPointSize, shape.y + shape.radius / Math.sqrt(2) - halfPointSize, pointSize, pointSize);
        break;
      case ShapeTypes.SQUARE:
        ctx.fillRect(shape.x - halfPointSize, shape.y - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.size - halfPointSize, shape.y - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x - halfPointSize, shape.y + shape.size - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.size - halfPointSize, shape.y + shape.size - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.size / 2 - halfPointSize, shape.y - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.size / 2 - halfPointSize, shape.y + shape.size - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x - halfPointSize, shape.y + shape.size / 2 - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.size - halfPointSize, shape.y + shape.size / 2 - halfPointSize, pointSize, pointSize);
        break;
      case ShapeTypes.DIAMOND:
        ctx.fillRect(shape.x - halfPointSize, shape.y + shape.height / 2 - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.width - halfPointSize, shape.y + shape.height / 2 - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.width / 2 - halfPointSize, shape.y - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.width / 2 - halfPointSize, shape.y + shape.height - halfPointSize, pointSize, pointSize);
        break;
      default:
        break;
    }
  };
  const handleCanvasMouseDown = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;
  
    
    if (selectedShapeId) {
      setDragging(true);
      setStartPoint({ x: offsetX, y: offsetY });
      setEndPoint({ x: offsetX, y: offsetY });
    }
  };
  
  const handleCanvasMouseMove = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;
  
  
    if (dragging) {
      setEndPoint({ x: offsetX, y: offsetY });
    }
  };
  
  const handleCanvasMouseUp = (event) => {
    if (dragging) {
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      const offsetX = event.nativeEvent.offsetX;
      const offsetY = event.nativeEvent.offsetY;
      setLines([...lines, { startPoint, endPoint }]);
   
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(offsetX, offsetY);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
  
      setDragging(false);
    }
  };
  
  
  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    let clickedShapeId = null;

    shapes.forEach((shape) => {
      switch (shape.type) {
        case ShapeTypes.RECTANGLE:
          if (
            offsetX >= shape.x &&
            offsetX <= shape.x + shape.width * 2 &&
            offsetY >= shape.y &&
            offsetY <= shape.y + shape.height
          ) {
            clickedShapeId = shape.id;
          }
          break;
        case ShapeTypes.CIRCLE:
          const distance = Math.sqrt(Math.pow(offsetX - shape.x, 2) + Math.pow(offsetY - shape.y, 2));
          if (distance <= shape.radius) {
            clickedShapeId = shape.id;
          }
          break;
        case ShapeTypes.SQUARE:
          if (
            offsetX >= shape.x &&
            offsetX <= shape.x + shape.size &&
            offsetY >= shape.y &&
            offsetY <= shape.y + shape.size
          ) {
            clickedShapeId = shape.id;
          }
          break;
        case ShapeTypes.DIAMOND:
          if (isPointInsideDiamond(offsetX, offsetY, shape)) {
            clickedShapeId = shape.id;
          }
          break;
        default:
          break;
      }
    });

    setSelectedShapeId((prevId) =>
      prevId === clickedShapeId ? null : clickedShapeId
    );
  };

  const isPointInsideDiamond = (pointX, pointY, diamond) => {
    const deltaX = pointX - (diamond.x + diamond.width / 2);
    const deltaY = pointY - (diamond.y + diamond.height / 2);
    return Math.abs(deltaX / (diamond.width / 2)) + Math.abs(deltaY / (diamond.height / 2)) <= 1;
  };

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
  const getClickedShapeDouble = (x, y) => {
    return shapes.find((shape) => {
      if (shape.type === ShapeTypes.RECTANGLE) {
        return (
          x >= shape.x &&
          x <= shape.x + shape.width * 2 &&
          y >= shape.y &&
          y <= shape.y + shape.height
        );
      } else if (shape.type === ShapeTypes.SQUARE) {
        return (
          x >= shape.x &&
          x <= shape.x + shape.width &&
          y >= shape.y &&
          y <= shape.y + shape.height
        );
      } else if (shape.type === ShapeTypes.CIRCLE) {
        return (
          Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2) <= shape.radius
        );
      } else if (shape.type === ShapeTypes.DIAMOND) {
        const centerX = shape.x + shape.width / 2;
        const centerY = shape.y + shape.height / 2;
        const dx = Math.abs(x - centerX);
        const dy = Math.abs(y - centerY);
        return dx / (shape.width / 2) + dy / (shape.height / 2) <= 1;
      }
      return false;
    });
  };


  const handleDoubleClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const clickedShape = getClickedShapeDouble(mouseX, mouseY);

    if (clickedShape) {
      setEditingShapeId(clickedShape.id);
      setTextInputs({
        ...textInputs,
        [clickedShape.id]: textInputs[clickedShape.id] || "Add text",
      });
    }
  };

  const handleInputChange = (event, shapeId) => {
    setTextInputs({
      ...textInputs,
      [shapeId]: event.target.value,
    });
  };

  const handleUndo = () => {};
  const handleRedo = () => {};
  const handleDelete = () => {
    if (selectedShapeId) {
      setShapes(shapes.filter((shape) => shape.id !== selectedShapeId));
      setSelectedShapeId(null); 
    }
  };


 
  const handleSave = async (fileName, format, saveToDatabase) => {
    const jwtToken = Cookies.get('token');
    if (!jwtToken) {
      console.error('JWT token not found in localStorage.');
      //return;
    }
  
    try {
      // const userResponse = await getUserByEmail(jwtToken);
      // const userId = userResponse.userId;
  
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
  
     
      tempCtx.drawImage(canvas, 0, 0);
  
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
              saveCanvasImageToDB(base64String)
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
    } catch (error) {
      console.error('Error in fetching user data:', error);
    }
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
        <div className="shapebutton-container">
          <button data-testid="rectangleButton" onClick={() => addShape(ShapeTypes.RECTANGLE)}>
            <Rectangle width={100} height={60} />
          </button>
          <button data-testid="circleButton" onClick={() => addShape(ShapeTypes.CIRCLE)}>
            <Circle radius={50} />
          </button>
          <button data-testid="squareButton" onClick={() => addShape(ShapeTypes.SQUARE)}>
            <Square size={80} />
          </button>
          <button data-testid="diamondButton" onClick={() => addShape(ShapeTypes.DIAMOND)}>
            <Diamond width={100} height={100} />
          </button>
        </div>
      </div>
      <div className="main">
        <div className="button-container">
          <button data-testid="openButton"
            onClick={() => handleButtonClick("open")}
            className={selectedButton === "open" ? "selected" : ""}
          >
            <MdFileOpen />
            {hoveredButton === "open" && <span className="tooltip">Open</span>}
          </button>
          <button data-testid="saveButton"
            onClick={() => handleButtonClick("save")}
            className={selectedButton === "save" ? "selected" : ""}
          >
            <TfiSave />
            {hoveredButton === "save" && <span className="tooltip">Save</span>}
          </button>
          <button data-testid="undoButton1"
            onClick={() => handleButtonClick("undo")}
            className={selectedButton === "undo" ? "selected" : ""}
          >
            <IoArrowUndo />
            {hoveredButton === "undo" && <span className="tooltip">Undo</span>}
          </button>
          <button data-testid="redoButton"
            onClick={() => handleButtonClick("redo")}
            className={selectedButton === "redo" ? "selected" : ""}
          >
            <IoArrowRedo />
            {hoveredButton === "redo" && <span className="tooltip">Redo</span>}
          </button>
          <button data-testid="deleteButton"
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
          <div style={{ position: "relative", width: "800px", height: "600px" }}>
          <canvas
            data-testid="canvas"
            ref={canvasRef}
            aria-label="Canvas"
            width={800}
            height={600}
            style={{ border: "1px solid black" }}
            onDoubleClick={handleDoubleClick}
            onClick={handleCanvasClick}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
          ></canvas>
          {editingShapeId && (
              <input
                data-testid="editingtextinput"
                type="text"
                className="add-text-input"
                value={textInputs[editingShapeId]}
                onChange={(event) => handleInputChange(event, editingShapeId)}
                onBlur={() => setEditingShapeId(null)}
                style={{
                  position: "absolute",
                  left: shapes.find((shape) => shape.id === editingShapeId).x + shapes.find((shape) => shape.id === editingShapeId).width / 2,
                  top: shapes.find((shape) => shape.id === editingShapeId).y + shapes.find((shape) => shape.id === editingShapeId).height / 2,
                  textAlign: "center",
                }}
              />
            )}
          </div>
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
          handleClick={() => setShowMsgBox(false)}
        />
      )}
    </div>
  );

}
export default CanvasComponent;