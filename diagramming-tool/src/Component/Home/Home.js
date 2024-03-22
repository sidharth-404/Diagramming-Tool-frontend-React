import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Home.css';
import { iconComponents, iconTooltips } from './IconFunctions';
import { Rectangle, Circle, Square, Diamond } from './NewShapes';
import ShapeTypes from './ShapeTypes';

const Home = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState("");
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);
  const isDrawing = useRef(false);
  const draggedShape = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
      if (shape.type === ShapeTypes.RECTANGLE) {
        ctx.fillStyle = "white";
        ctx.fillRect(shape.x, shape.y, shape.width * 2, shape.height);
        ctx.strokeRect(shape.x, shape.y, shape.width * 2, shape.height);
      } else if (shape.type === ShapeTypes.CIRCLE) {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
      } else if (shape.type === ShapeTypes.SQUARE) {
        ctx.fillStyle = "white";
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === ShapeTypes.DIAMOND) {
        ctx.beginPath();
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
    // Re-render canvas when selectedShape changes
    draw();
  }, [selectedShape, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const clickedShape = shapes.find((shape) => {
        if (
          shape.type === ShapeTypes.RECTANGLE ||
          shape.type === ShapeTypes.SQUARE
        ) {
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

      if (clickedShape) {
        isDrawing.current = true;
        draggedShape.current = clickedShape;
        dragOffset.current = { x: x - clickedShape.x, y: y - clickedShape.y };
        setSelectedShape(clickedShape.id);
      }
    };

    const handleMouseMove = (e) => {
      if (isDrawing.current) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - dragOffset.current.x;
        const y = e.clientY - rect.top - dragOffset.current.y;
        draggedShape.current.x = x;
        draggedShape.current.y = y;
        draw();
      }
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [shapes, draw]);

  useEffect(() => {
    // Re-render canvas when selectedShape changes
    draw();
  }, [selectedShape, draw]);

  const addShape = (type) => {
    const newShape = {
      id: Date.now(),
      type,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      radius: 50,
    };
    setShapes([...shapes, newShape]);
    setSelectedShape(newShape.id); // Set the newly added shape as selected
  };

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
  };

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
          {Object.keys(iconComponents).map((button) => (
            <button
              key={button}
              onMouseOver={() => handleButtonHover(button)}
              onClick={() => handleButtonClick(button)}
              className={selectedButton === button ? "selected" : ""}
            >
              {React.createElement(iconComponents[button])}
              {hoveredButton === button && (
                <span className="tooltip">{iconTooltips[button]}</span>
              )}
            </button>
          ))}
        </div>
        <div>
          <h1>Draw Here!!</h1>
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{ border: "1px solid black" }}
          ></canvas>
        </div>
      </div>
    </div>
  );
  };
  
  export default Home;
  
