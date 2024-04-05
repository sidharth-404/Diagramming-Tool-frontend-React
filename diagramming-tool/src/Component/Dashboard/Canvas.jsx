/* eslint-disable no-undef */

import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Canvas.css";
import { Rectangle, Circle, Square, Diamond, Line, ConnectorLine, BidirectionalConnector } from "./NewShapes";
import { IoArrowUndo, IoArrowRedo, IoReloadOutline } from "react-icons/io5";
import { MdDeleteForever, MdFileOpen } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import ShapeTypes from "./ShapeTypes";






const CanvasComponent = () => {
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);
  const [rotation, setRotation] = useState(0);






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
      } else if (shape.type === ShapeTypes.LINE) {
        ctx.beginPath();
        ctx.moveTo(shape.startX, shape.startY);
        ctx.lineTo(shape.endX, shape.endY);
        ctx.stroke();
      } else if (shape.type === ShapeTypes.CONNECTOR_LINE) {
        ctx.beginPath();
        ctx.moveTo(shape.startX, shape.startY);
        ctx.lineTo(shape.endX, shape.endY);
        ctx.stroke();

        const arrowSize = 10;
        const dx = shape.endX - shape.startX;
        const dy = shape.endY - shape.startY;
        const angle = Math.atan2(dy, dx);

        ctx.save();
        ctx.translate(shape.endX, shape.endY);
        ctx.rotate(angle + Math.PI);
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(arrowSize, arrowSize / 2);
        ctx.lineTo(arrowSize, -arrowSize / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else if (shape.type === ShapeTypes.BIDIRECTIONAL_CONNECTOR) {
        ctx.beginPath();
        ctx.moveTo(shape.startX, shape.startY);
        ctx.lineTo(shape.endX, shape.endY);
        ctx.stroke();
        const arrowSize = 10;
        const dx = shape.endX - shape.startX;
        const dy = shape.endY - shape.startY;
        const angle = Math.atan2(dy, dx);

        ctx.beginPath();
        ctx.moveTo(shape.startX, shape.startY);
        ctx.lineTo(shape.endX, shape.endY);
        ctx.stroke();

        ctx.save();
        ctx.translate(shape.startX, shape.startY);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(arrowSize, arrowSize / 2);
        ctx.lineTo(arrowSize, -arrowSize / 2);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.translate(shape.endX, shape.endY);
        ctx.rotate(angle + Math.PI);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.fillStyle = "black";
        ctx.lineTo(arrowSize, arrowSize / 2);
        ctx.lineTo(arrowSize, -arrowSize / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
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
        //ctx.fillRect(shape.rotationHandleX - halfPointSize, shape.rotationHandleY - halfPointSize, pointSize, pointSize);
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
      case ShapeTypes.LINE:

        ctx.fillRect(shape.startX - halfPointSize, shape.startY - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.endX - halfPointSize, shape.endY - halfPointSize, pointSize, pointSize);
        break;
      case ShapeTypes.CONNECTOR_LINE:

        ctx.fillRect(shape.startX - halfPointSize, shape.startY - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.endX - halfPointSize, shape.endY - halfPointSize, pointSize, pointSize);

        ctx.fillRect((shape.startX + shape.endX) / 2 - halfPointSize, (shape.startY + shape.endY) / 2 - halfPointSize, pointSize, pointSize);
        break;
      case ShapeTypes.BIDIRECTIONAL_CONNECTOR:

        ctx.fillRect(shape.startX - halfPointSize, shape.startY - halfPointSize, pointSize, pointSize);
        ctx.fillRect(shape.endX - halfPointSize, shape.endY - halfPointSize, pointSize, pointSize);

        ctx.fillRect((shape.startX + shape.endX) / 2 - halfPointSize, (shape.startY + shape.endY) / 2 - halfPointSize, pointSize, pointSize);
        ctx.fillRect((shape.startX + shape.endX) / 2 - halfPointSize, (shape.startY + shape.endY) / 2 - halfPointSize, pointSize, pointSize);
        break;

      default:
        break;
    }
  };

  function rotatePoint(x, y, cx, cy, angle) {
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const nx = (cosAngle * (x - cx)) + (sinAngle * (y - cy)) + cx;
    const ny = (cosAngle * (y - cy)) - (sinAngle * (x - cx)) + cy;
    return { x: nx, y: ny };
  }







  const rotateSelected = (angle) => {
    const updatedShapes = shapes.map((shape) => {

      if (selectedShapes.includes(shape.id)) {
        switch (shape.type) {
          case ShapeTypes.RECTANGLE:
          case ShapeTypes.SQUARE:
          case ShapeTypes.DIAMOND:
            // Rotate shape around its center
            const centerX = shape.x + shape.width / 2;
            const centerY = shape.y + shape.height / 2;
            const rotatedCenter = rotatePoint(centerX, centerY, centerX, centerY, angle);
            const dx = rotatedCenter.x - centerX;
            const dy = rotatedCenter.y - centerY;
            return { ...shape, x: shape.x + dx, y: shape.y + dy };
          case ShapeTypes.CIRCLE:

            return { ...shape, rotation: shape.rotation + angle };
          case ShapeTypes.LINE:

            const midX = (shape.startX + shape.endX) / 2;
            const midY = (shape.startY + shape.endY) / 2;
            const rotatedStart = rotatePoint(shape.startX, shape.startY, midX, midY, angle);
            const rotatedEnd = rotatePoint(shape.endX, shape.endY, midX, midY, angle);
            return { ...shape, startX: rotatedStart.x, startY: rotatedStart.y, endX: rotatedEnd.x, endY: rotatedEnd.y };
          case ShapeTypes.CONNECTOR_LINE:
          case ShapeTypes.BIDIRECTIONAL_CONNECTOR:

            const midConnX = (shape.startX + shape.endX) / 2;
            const midConnY = (shape.startY + shape.endY) / 2;
            const rotatedStartConnector = rotatePoint(shape.startX, shape.startY, midConnX, midConnY, angle);
            const rotatedEndConnector = rotatePoint(shape.endX, shape.endY, midConnX, midConnY, angle);
            return { ...shape, startX: rotatedStartConnector.x, startY: rotatedStartConnector.y, endX: rotatedEndConnector.x, endY: rotatedEndConnector.y };
          default:
            return shape;
        }
      }
      return shape;
    });
    setShapes(updatedShapes);
  };





  const handleRotate = (angle) => {
    rotateSelected(angle);
  };



  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;
    const pointSize = 5;

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
        case ShapeTypes.LINE:

          const minX = Math.min(shape.startX, shape.endX) - pointSize;
          const maxX = Math.max(shape.startX, shape.endX) + pointSize;
          const minY = Math.min(shape.startY, shape.endY) - pointSize;
          const maxY = Math.max(shape.startY, shape.endY) + pointSize;

          if (offsetX >= minX && offsetX <= maxX && offsetY >= minY && offsetY <= maxY) {
            clickedShapeId = shape.id;
          }
          break;

        case ShapeTypes.CONNECTOR_LINE:

          const minConnX = Math.min(shape.startX, shape.endX) - pointSize;
          const maxConnX = Math.max(shape.startX, shape.endX) + pointSize;
          const minConnY = Math.min(shape.startY, shape.endY) - pointSize;
          const maxConnY = Math.max(shape.startY, shape.endY) + pointSize;

          const midX = (shape.startX + shape.endX) / 2;
          const midY = (shape.startY + shape.endY) / 2;

          const minMidX = midX - pointSize;
          const maxMidX = midX + pointSize;
          const minMidY = midY - pointSize;
          const maxMidY = midY + pointSize;

          if ((offsetX >= minConnX && offsetX <= maxConnX && offsetY >= minConnY && offsetY <= maxConnY) ||
            (offsetX >= minMidX && offsetX <= maxMidX && offsetY >= minMidY && offsetY <= maxMidY)) {
            clickedShapeId = shape.id;
          }
          break;

        case ShapeTypes.BIDIRECTIONAL_CONNECTOR:
          const minBidirectionalConnX = Math.min(shape.startX, shape.endX) - pointSize;
          const maxBidirectionalConnX = Math.max(shape.startX, shape.endX) + pointSize;
          const minBidirectionalConnY = Math.min(shape.startY, shape.endY) - pointSize;
          const maxBidirectionalConnY = Math.max(shape.startY, shape.endY) + pointSize;

          const bidirectionalMidX = (shape.startX + shape.endX) / 2;
          const bidirectionalMidY = (shape.startY + shape.endY) / 2;

          const minBidirectionalMidX = bidirectionalMidX - pointSize;
          const maxBidirectionalMidX = bidirectionalMidX + pointSize;
          const minBidirectionalMidY = bidirectionalMidY - pointSize;
          const maxBidirectionalMidY = bidirectionalMidY + pointSize;

          if ((offsetX >= minBidirectionalConnX && offsetX <= maxBidirectionalConnX && offsetY >= minBidirectionalConnY && offsetY <= maxBidirectionalConnY) ||
            (offsetX >= minBidirectionalMidX && offsetX <= maxBidirectionalMidX && offsetY >= minBidirectionalMidY && offsetY <= maxBidirectionalMidY)) {
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
    let newShape;
    if (type === ShapeTypes.CONNECTOR_LINE || type === ShapeTypes.BIDIRECTIONAL_CONNECTOR) {
      newShape = {
        id: Date.now(),
        type,
        startX: 50,
        startY: 50,
        endX: 200,
        endY: 200,

      };
    } else {
      newShape = {
        id: Date.now(),
        type,
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        radius: 50,
        size: 80,
        startX: 50,
        startY: 50,
        endX: 200,
        endY: 200,


      };
    }

    setShapes([...shapes, newShape]);
    setSelectedShape(newShape.id);
    draw();
  };

  const handleUndo = () => { };

  const handleRedo = () => { };

  const handleDelete = () => {
    if (selectedShapeId) {
      setShapes(shapes.filter((shape) => shape.id !== selectedShapeId));

    };
  }

  const handleSave = () => { };

  const handleOpen = () => { };

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


  const handleMouseDown = (e, id) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const selectedShapeIndex = shapes.findIndex((shape) => shape.id === id);
    const selectedShape = shapes[selectedShapeIndex];
    if (selectedShape) {
      if (e.shiftKey) {
        if (selectedShapes.includes(id)) {
          setSelectedShape(selectedShape.filter((shapeId) => shapeId !== id));
        } else {
          setSelectedShapes([...selectedShapes, id]);
        }
      } else {
        if (!selectedShapes.includes(id)) {
          setSelectedShapes([id]);
        }
      }
      setIsDragging(true);
      setDragStartPos({ x, y });
      setDragOffset({ x: x - selectedShape.startX, y: y - selectedShape.startY });
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
          if (shape.type === ShapeTypes.CONNECTOR_LINE || shape.type === ShapeTypes.BIDIRECTIONAL_CONNECTOR || shape.type === ShapeTypes.LINE) {
            const newStartX = shape.startX + dx;
            const newStartY = shape.startY + dy;
            const newEndX = shape.endX + dx;
            const newEndY = shape.endY + dy;
            return { ...shape, startX: newStartX, startY: newStartY, endX: newEndX, endY: newEndY };
          } else {
            const newX = shape.x + dx - dragOffset.x;
            const newY = shape.y + dy - dragOffset.y;
            return { ...shape, x: newX, y: newY };
          }

        }

        return shape;

      });
      setShapes(updatedShapes);

      draw();

    }
  };




  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);


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
            <Diamond width={100} height={100} /></button>

          <button
            data-testid="lineButton"
            onClick={() => addShape(ShapeTypes.LINE)}><Line width={5} /></button>

          <button
            data-testid="connectorLineButton"
            onClick={() => addShape(ShapeTypes.CONNECTOR_LINE)}>
            <ConnectorLine width={100} height={60} />
          </button>
          <button
            data-testid="bidirectionalConnectorButton"
            onClick={() => addShape(ShapeTypes.BIDIRECTIONAL_CONNECTOR)}>
            <BidirectionalConnector width={10} />
          </button>



        </div>
      </div>
      <div className="main">
        <div className="button-container">
          <button>
            <IoReloadOutline data-testid="rotate-icon" onClick={() => handleRotate(Math.PI / 4)} className="rotate-icon" />
          </button>

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
            onClick={handleCanvasClick}
            onMouseDown={(e) => {
              const canvas = canvasRef.current;
              const rect = canvas.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              shapes.forEach((shape) => {
                if (
                  ((shape.type === ShapeTypes.CONNECTOR_LINE || shape.type === ShapeTypes.BIDIRECTIONAL_CONNECTOR || shape.type === ShapeTypes.LINE) &&
                    x >= Math.min(shape.startX, shape.endX) &&
                    x <= Math.max(shape.startX, shape.endX) &&
                    y >= Math.min(shape.startY, shape.endY) &&
                    y <= Math.max(shape.startY, shape.endY)) ||
                  (shape.type !== ShapeTypes.CONNECTOR_LINE && shape.type !== ShapeTypes.BIDIRECTIONAL_CONNECTOR && shape.type !== ShapeTypes.LINE &&
                    x >= shape.x &&
                    x <= shape.x + shape.width &&
                    y >= shape.y &&
                    y <= shape.y + shape.height)
                ) {
                  handleMouseDown(e, shape.id)
                }
              });
            }}

          ></canvas>


        </div>
      </div>
    </div>
  );
};

export default CanvasComponent;
