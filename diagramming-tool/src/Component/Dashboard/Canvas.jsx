import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Canvas.css";
import { Rectangle, Circle, Square, Diamond } from "./NewShapes";
import ShapeTypes from "./ShapeTypes";

const CanvasComponent = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);
  const isDragging = useRef(false);
  const isSelecting = useRef(false);
  const draggedShape = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [editingShapeId, setEditingShapeId] = useState(null);
  const [textInputs, setTextInputs] = useState({});
  const [selectionArea, setSelectionArea] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

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
      if (selectedShapes.includes(shape.id)) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
      } else {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
      }
    });
  }, [shapes, textInputs, selectedShapes]);

  useEffect(() => {
    draw();
  }, [draw]);

  const getClickedShape = (x, y) => {
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

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedShape = getClickedShape(x, y);
    if (clickedShape) {
      isDragging.current = true;
      draggedShape.current = clickedShape;
      dragOffset.current = { x: x - clickedShape.x, y: y - clickedShape.y };
      setSelectedShape(clickedShape.id);
    } else {
      isSelecting.current = true;
      setSelectionArea({ x1: x, y1: y, x2: x, y2: y });
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging.current) {
      // Move the dragged shape
      draggedShape.current.x = x - dragOffset.current.x;
      draggedShape.current.y = y - dragOffset.current.y;
      draw();
    } else if (isSelecting.current) {
      // Update the selection area
      setSelectionArea({ x1: selectionArea.x1, y1: selectionArea.y1, x2: x, y2: y });
      const selectedShapes = shapes.filter((shape) => {
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
      }).map((shape) => shape.id);
      setSelectedShapes(selectedShapes);
      draw();
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    isSelecting.current = false;
    draggedShape.current = null;
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

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [shapes, draw]);

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
          <div style={{ position: "relative", width: "800px", height: "600px" }}>
            <canvas
              data-testid="canvas"
              ref={canvasRef}
              aria-label="Canvas"
              width={800}
              height={600}
              style={{ border: "1px solid black" }}
              onDoubleClick={handleDoubleClick}
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
            {isSelecting.current && (
              <div
                style={{
                  position: "absolute",
                  border: "1px dashed blue",
                  left: Math.min(selectionArea.x1, selectionArea.x2),
                  top: Math.min(selectionArea.y1, selectionArea.y2),
                  width: Math.abs(selectionArea.x2 - selectionArea.x1),
                  height: Math.abs(selectionArea.y2 - selectionArea.y1),
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasComponent;