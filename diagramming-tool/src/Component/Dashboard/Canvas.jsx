import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Canvas.css";
import { Rectangle, Circle, Square, Diamond, Connector } from "./NewShapes"; // Import Connector component
import { IoArrowUndo, IoArrowRedo } from "react-icons/io5";
import { MdFileOpen } from "react-icons/md"; // Removed MdDeleteForever
import { TfiSave } from "react-icons/tfi";
import ShapeTypes from "./ShapeTypes";
import { MdColorLens } from "react-icons/md";
import { ChromePicker } from "react-color";



const CanvasComponent = () => {
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState("");
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [lines, setLines] = useState([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
      ctx.fillStyle = shape.color;
      ctx.lineWidth = 2;
  
      if (selectedShapes.includes(shape.id)) {
        ctx.strokeStyle = "blue";
      } else {
        ctx.strokeStyle = "black";
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
  }, [shapes, selectedShapeId, dragging, startPoint, endPoint,lines]);
  

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
      color: "white",
      targetX: 100, // Initial target X position
      targetY: 100, // Initial target Y position
    };
    const newShapes = [...shapes, newShape];
    setShapes(newShapes);
    setHistory([...history, newShapes]);
    setHistoryIndex(history.length);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setShapes(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setShapes(history[historyIndex + 1]);
    }
  };

  const handleSave = () => {};

  const handleOpen = () => {};

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    switch (button) {
      case "open":
        handleOpen();
        break;
      case "undo":
        undo();
        break;
      case "redo":
        redo();
        break;
      case "save":
        handleSave();
        break;
      default:
        break;
    }
  };

  const handleColor = (color) => {
    setSelectedColor(color);
  };

  const handleChangeColor = (color) => {
    setSelectedColor(color.hex);
    const updatedShapes = shapes.map((shape) => {
      if (selectedShapes.includes(shape.id)) {
        return { ...shape, color: color.hex };
      }
      return shape;
    });
    setShapes(updatedShapes);
    draw();
    setHistory([...history, updatedShapes]);
    setHistoryIndex(history.length);
  };

  const handleMouseDown = (e, id) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const selectedShapeIndex = shapes.findIndex((shape) => shape.id === id);
    const selectedShape = shapes[selectedShapeIndex];

    // Check if the mouse down event occurs on the resize handles of the selected shape
    if (
      selectedShape &&
      x >= selectedShape.x + selectedShape.width - 10 &&
      x <= selectedShape.x + selectedShape.width &&
      y >= selectedShape.y + selectedShape.height - 10 &&
      y <= selectedShape.y + selectedShape.height
    ) {
      // Set the resizing shape ID and handle index
      setResizingShapeId(id);
      setResizingHandleIndex(0); // In this case, let's assume the handle index for resizing the shape from the bottom-right corner
      setResizeStartPos({ x, y }); // Set the initial position for resizing
      return;
    }

    // If the Shift key is pressed, toggle selection of the clicked shape
    if (e.shiftKey) {
      if (selectedShapes.includes(id)) {
        setSelectedShapes(selectedShapes.filter((shapeId) => shapeId !== id));
      } else {
        setSelectedShapes([...selectedShapes, id]);
      }
      return;
    }

    // If the mouse down event is not on resize handles and Shift key is not pressed,
    // handle it as dragging or selecting a single shape
    if (selectedShape) {
      // Select only the clicked shape
      setSelectedShapes([id]);
      setIsDragging(true);
      setDragStartPos({ x, y });
      setDragOffset({ x: x - selectedShape.x, y: y - selectedShape.y });
    } else {
      // Clear selected shapes if clicked outside any shape
      setSelectedShapes([]);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && selectedShapes.length > 0) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - dragStartPos.x;
      const dy = y - dragStartPos.y;

      const updatedShapes = shapes.map((shape) => {
        if (selectedShapes.includes(shape.id)) {
          return { ...shape, x: shape.x + dx - dragOffset.x, y: shape.y + dy - dragOffset.y };
        }
        return shape;
      });
      setShapes(updatedShapes);
      draw();
      setHistory([...history, updatedShapes]);
      setHistoryIndex(history.length);
    }

    if (resizingShapeId !== null && resizingHandleIndex !== -1) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const shape = shapes.find((shape) => shape.id === resizingShapeId);
      if (shape) {
        let newWidth = shape.width;
        let newHeight = shape.height;
        let newRadius = shape.radius;
        let newSize = shape.size;

        switch (resizingHandleIndex) {
          case 0: // bottom-right corner
            if (
              shape.type === ShapeTypes.RECTANGLE ||
              shape.type === ShapeTypes.DIAMOND
            ) {
              newWidth = x - shape.x;
              newHeight = y - shape.y;
            } else if (shape.type === ShapeTypes.CIRCLE) {
              const dx = x - resizeStartPos.x;
              const dy = y - resizeStartPos.y;
              newRadius = Math.sqrt(dx ** 2 + dy ** 2);
            } else if (shape.type === ShapeTypes.SQUARE) {
              newSize = Math.max(x - shape.x, y - shape.y);
            }
            break;
          // Handle other corners if necessary
          default:
            break;
        }

        const updatedShapes = shapes.map((s) => {
          if (s.id === resizingShapeId) {
            return {
              ...s,
              width: newWidth,
              height: newHeight,
              radius: newRadius,
              size: newSize,
            };
          }
          return s;
        });
        setShapes(updatedShapes);
        draw();
        setHistory([...history, updatedShapes]);
        setHistoryIndex(history.length);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizingShapeId(null);
    setResizingHandleIndex(-1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, resizingShapeId, resizingHandleIndex]);

  useEffect(() => {
    const animateMovement = () => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) => {
          const dx = shape.targetX - shape.x;
          const dy = shape.targetY - shape.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const speed = 2; // Adjust this for the desired speed of movement
          const easingFactor = 0.05; // Adjust this for the smoothness of movement

          if (distance < speed) {
            // If the distance is less than the speed, move directly to the target position
            return { ...shape, x: shape.targetX, y: shape.targetY };
          } else {
            // Calculate the next position using quadratic easing
            const easeX = dx * easingFactor;
            const easeY = dy * easingFactor;
            const newX = shape.x + easeX;
            const newY = shape.y + easeY;
            return { ...shape, x: newX, y: newY };
          }
        })
      );
      animationRef.current = requestAnimationFrame(animateMovement);
    };

    if (animationRef.current === null) {
      animationRef.current = requestAnimationFrame(animateMovement);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [shapes]);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Shapes</h2>
        <div className="sidebar">
          <button
            data-testid="rectangleButton"
            onClick={() => addShape(ShapeTypes.RECTANGLE)}
          >
            <Rectangle width={100} height={60} />
          </button>
          <button
            data-testid="circleButton"
            onClick={() => addShape(ShapeTypes.CIRCLE)}
          >
            <Circle radius={50} />
          </button>
          <button
            data-testid="squareButton"
            onClick={() => addShape(ShapeTypes.SQUARE)}
          >
            <Square size={80} />
          </button>
          <button
            data-testid="diamondButton"
            onClick={() => addShape(ShapeTypes.DIAMOND)}
          >
            <Diamond width={100} height={100} />
          </button>
        </div>
      </div>
      <div className="main">
        <div className="button-container">
          <button
            data-testid="openButton"
            onClick={() => handleButtonClick("open")}
            className={selectedButton === "open" ? "selected" : ""}
          >
            <MdFileOpen />
            {hoveredButton === "open" && <span className="tooltip">Open</span>}
          </button>
          <button
            data-testid="saveButton"
            onClick={() => handleButtonClick("save")}
            className={selectedButton === "save" ? "selected" : ""}
          >
            <TfiSave />
            {hoveredButton === "save" && <span className="tooltip">Save</span>}
          </button>
          <button
            data-testid="undoButton"
            onClick={() => handleButtonClick("undo")}
            className={selectedButton === "undo" ? "selected" : ""}
          >
            <IoArrowUndo />
            {hoveredButton === "undo" && <span className="tooltip">Undo</span>}
          </button>
          <button
            data-testid="redoButton"
            onClick={() => handleButtonClick("redo")}
            className={selectedButton === "redo" ? "selected" : ""}
          >
            <IoArrowRedo />
            {hoveredButton === "redo" && <span className="tooltip">Redo</span>}
          </button>
          {/* Removed delete button */}
          <div className="button-container">
            <button
              data-testid="colorButton"
              onClick={() => handleButtonClick("color")}
              className={selectedButton === "color" ? "selected" : ""}
            >
              <MdColorLens />
              {hoveredButton === "color" && <span className="tooltip">Color</span>}
            </button>
            {selectedButton === "color" && (
              <ChromePicker
                color={selectedColor}
                onChange={handleChangeColor}
              />
            )}
          </div>
        </div>
        <div>
          <h1>Draw Here!!</h1>
          <canvas
            data-testid="canvas"
            ref={canvasRef}
            aria-label="Canvas"
            width={800}
            height={600}
            style={{ border: "1px solid black" }}
            onClick={handleCanvasClick}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default CanvasComponent;
