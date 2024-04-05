import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Canvas.css";
import { Rectangle, Circle, Square, Diamond } from "./NewShapes";
import ShapeTypes from "./ShapeTypes";

const CanvasComponent = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);
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
  }, [shapes, textInputs]);


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
          </div>
        </div>

      </div>
    </div>
  );
};

export default CanvasComponent;
