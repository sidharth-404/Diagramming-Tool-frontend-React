import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Canvas.css";
import { Rectangle, Circle, Square, Diamond } from "./NewShapes";
import { IoArrowUndo, IoArrowRedo } from "react-icons/io5";
import { MdDeleteForever, MdFileOpen } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import ShapeTypes from "./ShapeTypes";

const CanvasComponent = () => {
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState("");
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);

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
    });

    if (selectedShapeId) {
      const selectedShape = shapes.find((shape) => shape.id === selectedShapeId);
      if (selectedShape) {
        drawSelectionPoints(ctx, selectedShape);
      }
    }
  }, [shapes, selectedShapeId]);

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

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Shapes</h2>
        <div>
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
          {/* Buttons for undo, redo, delete, save, open */}
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
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default CanvasComponent;
