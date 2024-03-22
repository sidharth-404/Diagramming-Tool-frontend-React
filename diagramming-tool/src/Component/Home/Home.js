import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import { IoArrowUndo, IoArrowRedo } from 'react-icons/io5';
import { MdDeleteForever, MdFileOpen } from 'react-icons/md';
import { TfiSave } from 'react-icons/tfi';
import { Rectangle, Circle, Square, Diamond } from './NewShapes';


const ShapeTypes = {
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  SQUARE: 'square',
  DIAMOND: 'diamond',
};

const Home = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState("");
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);
  const isDrawing = useRef(false);
  const draggedShape = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach((shape) => {
        if (shape.type === ShapeTypes.RECTANGLE) {
          // Draw a stroked rectangle
          ctx.strokeStyle = "black"; // Border color
          ctx.fillStyle = "white"; // Fill color
          // Draw the rectangle with different width and height
          ctx.fillRect(shape.x, shape.y, shape.width * 2, shape.height);
          ctx.strokeRect(shape.x, shape.y, shape.width * 2, shape.height);
        } else if (shape.type === ShapeTypes.CIRCLE) {
          // Draw a filled circle
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
          ctx.strokeStyle = "black"; // Border color
          ctx.fillStyle = "white"; // Fill color
          ctx.fill(); // Fill the circle with white
          ctx.stroke(); // Stroke the circle's border
        } else if (shape.type === ShapeTypes.SQUARE) {
          // Draw a stroked square
          ctx.strokeStyle = "black"; // Border color
          ctx.fillStyle = "white"; // Fill color
          ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
          ctx.strokeRect(shape.x, shape.y, shape.width, shape.height); // Stroke the square's border
        } else if (shape.type === ShapeTypes.DIAMOND) {
          // Draw a filled diamond
          ctx.beginPath();
          ctx.moveTo(shape.x + shape.width / 2, shape.y); // Top point
          ctx.lineTo(shape.x + shape.width, shape.y + shape.height / 2); // Right point
          ctx.lineTo(shape.x + shape.width / 2, shape.y + shape.height); // Bottom point
          ctx.lineTo(shape.x, shape.y + shape.height / 2); // Left point
          ctx.closePath(); // Close the path
          ctx.strokeStyle = "black"; // Border color
          ctx.fillStyle = "white"; // Fill color
          ctx.fill(); // Fill the diamond with white
          ctx.stroke(); // Stroke the diamond's border
        }
      });
    };

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if the click event occurs within any shape's bounds
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
          // Calculate the center point of the diamond
          const centerX = shape.x + shape.width / 2;
          const centerY = shape.y + shape.height / 2;

          // Calculate the distance from the click point to the center
          const dx = Math.abs(x - centerX);
          const dy = Math.abs(y - centerY);

          // Check if the point is within the diamond's boundaries
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
  }, [shapes]);

  const addShape = (type) => {
    const newShape = {
      id: Date.now(),
      type,
      x: 100, // Initial position
      y: 100,
      width: 100, // Initial size for rectangle (can adjust as needed)
      height: 100,
      radius: 50, // Initial radius for circle (can adjust as needed)
      // Add additional properties for other shapes if needed
    };
    setShapes([...shapes, newShape]);
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
            {hoveredButton === "delete" && (
              <span className="tooltip">Delete</span>
            )}
          </button>
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