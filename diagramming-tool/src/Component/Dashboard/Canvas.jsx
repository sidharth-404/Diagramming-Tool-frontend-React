



import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Canvas.css";
import { Rectangle, Circle, Square, Diamond } from "./NewShapes";
import { IoArrowUndo, IoArrowRedo } from "react-icons/io5";
import { MdDeleteForever, MdFileOpen, MdColorLens } from "react-icons/md";
import ShapeTypes from "./ShapeTypes";
import { SketchPicker } from "react-color";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedColor, setSelectedColor] = useState("white");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dragStartPosition, setDragStartPosition] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizePointIndex, setResizePointIndex] = useState(-1);
  const [showColorPicker, setShowColorPicker] = useState(false);
 

  
  const handleColorButtonClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };


  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
      ctx.fillStyle = shape.color;
      ctx.lineWidth = 2;

      if (shape.type === ShapeTypes.RECTANGLE) {
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === ShapeTypes.CIRCLE) {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (shape.type === ShapeTypes.SQUARE) {
        ctx.fillRect(shape.x, shape.y, shape.size, shape.size);
        ctx.strokeRect(shape.x, shape.y, shape.size, shape.size);
      } else if (shape.type === ShapeTypes.DIAMOND) {
        ctx.beginPath();
        ctx.moveTo(shape.x + shape.width / 2, shape.y);
        ctx.lineTo(shape.x + shape.width, shape.y + shape.height / 2);
        ctx.lineTo(shape.x + shape.width / 2, shape.y + shape.height);
        ctx.lineTo(shape.x, shape.y + shape.height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
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

  const handleChangeColor = (color) => {
    setSelectedColor(color.hex);
    if (selectedShapeId !== null) {
      setShapes((prevShapes) =>
        prevShapes.map((shape) =>
          shape.id === selectedShapeId ? { ...shape, color: color.hex } : shape
        )
      );
    }
  };

  const drawSelectionPoints = (ctx, shape) => {
        ctx.fillStyle = "blue";
    const pointSize = 5;
    const halfPointSize = pointSize / 2;

    switch (shape.type) {
      case ShapeTypes.RECTANGLE:
        // Draw selection points for rectangle
        // Draw selection points for rectangle corners
        ctx.fillRect(shape.x - halfPointSize, shape.y - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.width - halfPointSize, shape.y - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x - halfPointSize, shape.y + shape.height - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.x + shape.width - halfPointSize, shape.y + shape.height - halfPointSize, pointSize, pointSize);

        // Draw selection points for midpoints of edges
        ctx.fillRect(shape.x + shape.width / 2 - halfPointSize, shape.y - halfPointSize, pointSize, pointSize); // Top edge
        ctx.fillRect(shape.x + shape.width / 2 - halfPointSize, shape.y + shape.height - halfPointSize, pointSize, pointSize); // Bottom edge
        ctx.fillRect(shape.x - halfPointSize, shape.y + shape.height / 2 - halfPointSize, pointSize, pointSize); // Left edge
        ctx.fillRect(shape.x + shape.width - halfPointSize, shape.y + shape.height / 2 - halfPointSize, pointSize, pointSize); // Right edge
        break;
      case ShapeTypes.CIRCLE:
        // Draw selection points for circle
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
        // Draw selection points for square
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
        // Draw selection points for diamond
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
            offsetX <= shape.x + shape.width &&
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

  const handleMouseDown = (event) => {
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    // Check if the mouse is over a selection point for resizing
    shapes.forEach((shape) => {
      // Check for each shape's selection points
      // If the mouse is over a selection point, set isResizing to true and handle resizing logic
      // For simplicity, let's assume the first point is for resizing
      if (shape.id === selectedShapeId) {
        const halfPointSize = 5 / 2; // Half of the selection point size
        const points = getSelectionPoints(shape);
        points.forEach((point, index) => {
          if (
            offsetX >= point.x - halfPointSize &&
            offsetX <= point.x + halfPointSize &&
            offsetY >= point.y - halfPointSize &&
            offsetY <= point.y + halfPointSize
          ) {
            setIsResizing(true);
            setResizePointIndex(index);
          }
        });
      }
    });

    if (!isResizing) {
      // Handle shape movement logic
      setDragStartPosition({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseMove = (event) => {
    if (selectedShapeId && (dragStartPosition || isResizing)) {
      const offsetX = event.nativeEvent.offsetX;
      const offsetY = event.nativeEvent.offsetY;

      if (isResizing) {
        // Handle resizing logic based on mouse movement
        const deltaX = offsetX - dragStartPosition.x;
        const deltaY = offsetY - dragStartPosition.y;

        setShapes((prevShapes) =>
          prevShapes.map((shape) =>
            shape.id === selectedShapeId
              ? resizeShape(shape, deltaX, deltaY)
              : shape
          )
        );

        setDragStartPosition({ x: offsetX, y: offsetY });
      } else {
        // Handle shape movement logic as before
        const dx = offsetX - dragStartPosition.x;
        const dy = offsetY - dragStartPosition.y;

        setShapes((prevShapes) =>
          prevShapes.map((shape) =>
            shape.id === selectedShapeId
              ? { ...shape, x: shape.x + dx, y: shape.y + dy }
              : shape
          )
        );

        setDragStartPosition({ x: offsetX, y: offsetY });
      }
    }
  };

  const handleMouseUp = () => {
    setDragStartPosition(null);
    setIsResizing(false);
    setResizePointIndex(-1);
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
    };
    const newShapes = [...shapes, newShape];
    setShapes(newShapes);
    // Update history only if the shape is added
    if (historyIndex === history.length - 1) {
      setHistory([...history, newShapes]);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setShapes(history[newIndex]);
      setHistoryIndex(newIndex);
    }
  };
  
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setShapes(history[newIndex]);
      setHistoryIndex(newIndex);
    }
  };
  
  



 
  const getSelectionPoints = (shape) => {
    switch (shape.type) {
      case ShapeTypes.RECTANGLE:
        return [
          { x: shape.x, y: shape.y }, // Top-left
          { x: shape.x + shape.width / 2, y: shape.y }, // Top-middle
          { x: shape.x + shape.width, y: shape.y }, // Top-right
          { x: shape.x, y: shape.y + shape.height / 2 }, // Left-middle
          { x: shape.x + shape.width, y: shape.y + shape.height / 2 }, // Right-middle
          { x: shape.x, y: shape.y + shape.height }, // Bottom-left
          { x: shape.x + shape.width / 2, y: shape.y + shape.height }, // Bottom-middle
          { x: shape.x + shape.width, y: shape.y + shape.height }, // Bottom-right
        ];
      case ShapeTypes.CIRCLE:
        const numPoints = 8; // You can adjust this number based on preference
      const selectionPoints = [];
      for (let i = 0; i < numPoints; i++) {
        const angle = (Math.PI / 4) * i; // Divide the circle into 8 equal parts
        const x = shape.x + shape.radius * Math.cos(angle);
        const y = shape.y + shape.radius * Math.sin(angle);
        selectionPoints.push({ x, y });
      }
      return selectionPoints; 
      case ShapeTypes.SQUARE:
        return [
          { x: shape.x, y: shape.y }, // Top-left
          { x: shape.x + shape.size / 2, y: shape.y }, // Top-middle
          { x: shape.x + shape.size, y: shape.y }, // Top-right
          { x: shape.x, y: shape.y + shape.size / 2 }, // Left-middle
          { x: shape.x + shape.size, y: shape.y + shape.size / 2 }, // Right-middle
          { x: shape.x, y: shape.y + shape.size }, // Bottom-left
          { x: shape.x + shape.size / 2, y: shape.y + shape.size }, // Bottom-middle
          { x: shape.x + shape.size, y: shape.y + shape.size }, // Bottom-right
        ];
      case ShapeTypes.DIAMOND:
        return [
          { x: shape.x, y: shape.y + shape.height / 2 }, // Left-middle
          { x: shape.x + shape.width, y: shape.y + shape.height / 2 }, // Right-middle
          { x: shape.x + shape.width / 2, y: shape.y }, // Top-middle
          { x: shape.x + shape.width / 2, y: shape.y + shape.height }, // Bottom-middle
        ];
      default:
        return [];
    }
  };

  const resizeShape = (shape, deltaX, deltaY) => {
    const newShape = { ...shape };
    switch (shape.type) {
      case ShapeTypes.RECTANGLE:
        switch (resizePointIndex) {
          case 0: // Top-left
            newShape.x += deltaX;
            newShape.y += deltaY;
            newShape.width -= deltaX;
            newShape.height -= deltaY;
            break;
          case 1: // Top-middle
            newShape.y += deltaY;
            newShape.height -= deltaY;
            break;
          case 2: // Top-right
            newShape.y += deltaY;
            newShape.width += deltaX;
            newShape.height -= deltaY;
            break;
          case 3: // Left-middle
            newShape.x += deltaX;
            newShape.width -= deltaX;
            break;
          case 4: // Right-middle
            newShape.width += deltaX;
            break;
          case 5: // Bottom-left
            newShape.x += deltaX;
            newShape.width -= deltaX;
            newShape.height += deltaY;
            break;
          case 6: // Bottom-middle
            newShape.height += deltaY;
            break;
          case 7: // Bottom-right
            newShape.width += deltaX;
            newShape.height += deltaY;
            break;
          default:
            break;
        }
        break;
      case ShapeTypes.CIRCLE:
        const newRadius = Math.max(shape.radius + (deltaX + deltaY) / 2, 0); // Ensure radius is non-negative
        newShape.radius = newRadius;
        break;
      case ShapeTypes.SQUARE:
        // Similar to RECTANGLE but all sides are equal
        switch (resizePointIndex) {
          case 0: // Top-left
            newShape.x += deltaX;
            newShape.y += deltaY;
            newShape.size -= Math.max(deltaX, deltaY);
            break;
          case 1: // Top-middle
            newShape.y += deltaY;
            newShape.size -= 2 * deltaY;
            break;
          case 2: // Top-right
            newShape.y += deltaY;
            newShape.size += Math.max(deltaX, deltaY);
            break;
          case 3: // Left-middle
            newShape.x += deltaX;
            newShape.size -= 2 * deltaX;
            break;
          case 4: // Right-middle
            newShape.size += 2 * deltaX;
            break;
          case 5: // Bottom-left
            newShape.x += deltaX;
            newShape.size -= Math.max(deltaX, deltaY);
            break;
          case 6: // Bottom-middle
            newShape.size -= 2 * deltaY;
            break;
          case 7: // Bottom-right
            newShape.size += Math.max(deltaX, deltaY);
            break;
          default:
            break;
        }
        break;
      case ShapeTypes.DIAMOND:
        switch (resizePointIndex) {
          case 0: // Left-middle
            newShape.x += deltaX;
            newShape.width -= deltaX;
            break;
          case 1: // Right-middle
            newShape.width += deltaX;
            break;
          case 2: // Top-middle
            newShape.y += deltaY;
            newShape.height -= deltaY;
            break;
          case 3: // Bottom-middle
            newShape.height += deltaY;
            break;
          default:
            break;
        }
        break;
    }
    return newShape;
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Shapes</h2>
        <div>
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
          <button onClick={undo}>
            <IoArrowUndo />
          </button>
          <button onClick={redo}>
            <IoArrowRedo />
          </button>
          <button>
            <MdDeleteForever />
          </button>
          <button>
            <MdFileOpen />
          </button>
          <button onClick={() => setShowColorPicker(!showColorPicker)}>
            <MdColorLens />
          </button>
          {showColorPicker && (
            <SketchPicker
              color={selectedColor}
              onChange={handleChangeColor}
            />
          )}
        </div>
        <div>
          <h1>Draw Here!!</h1>
          <canvas
            ref={canvasRef}
            aria-label="Canvas"
            width={800}
            height={600}
            style={{ border: "1px solid black" }}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default CanvasComponent;
