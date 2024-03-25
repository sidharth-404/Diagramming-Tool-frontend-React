import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Home.css";
import { Rectangle, Circle, Square, Diamond } from "./NewShapes";
import { IoArrowUndo, IoArrowRedo } from "react-icons/io5";
import { MdDeleteForever, MdFileOpen } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import ShapeTypes from "./ShapeTypes";

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
        // ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (shape.type === ShapeTypes.SQUARE) {
        ctx.fillStyle = "white";
        ctx.fillRect(shape.x, shape.y, shape.size, shape.size);
        ctx.strokeRect(shape.x, shape.y, shape.size, shape.size);
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
    draw();
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const clickedShape = shapes.find((shape) => {
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

  const handleSave = () => {};

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
        handleSave();
        break;
      default:
        break;
    }
  };

  // const handleButtonHover = (button) => {
  //   setHoveredButton(button);
  // };

  return (
    <div className="container">
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
          <button
            data-testid="deleteButton"
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
            data-testid="canvas"
            ref={canvasRef}
            aria-label="Canvas"
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
