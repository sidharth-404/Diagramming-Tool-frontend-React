/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Canvas.css";
import { Rectangle, Circle, Square, Diamond, Line, ConnectorLine, BidirectionalConnector } from "./NewShapes";
import { IoArrowUndo, IoArrowRedo, IoReloadOutline } from "react-icons/io5";
import { MdDeleteForever, MdFileOpen, MdColorLens } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import ShapeTypes from "./ShapeTypes";
import profileImage from '../../Assets/R.png';

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SketchPicker } from "react-color";
import SavePopup from "../SavePop/SavePop";
import { saveCanvasImageToDB, getUserByEmail } from '../../ApiService/ApiService';
import MsgBoxComponent from "../ConfirmMsg/MsgBoxComponent";
import { handleDeletes } from "./keyboardDelete";

const CanvasComponent = () => {

  const [msg, setMsg] = useState("");
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showMsgBox, setShowMsgBox] = useState(false);
  const [canvasBorderColor, setCanvasBorderColor] = useState("black");
  const [canvasBorderThickness, setCanvasBorderThickness] = useState(1);

  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [selectedShapes, setSelectedShapes] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState("");
  const [dragStartPosition, setDragStartPosition] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizePointIndex, setResizePointIndex] = useState(-1);
  const [shapes, setShapes] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [lines, setLines] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const canvasRef = useRef(null);
  const [editingShapeId, setEditingShapeId] = useState(null);
  const [textInputs, setTextInputs] = useState({});
  const navigation = useNavigate();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const onKeyDown = handleDeletes(selectedShapeId, shapes, setShapes, setSelectedShapeId);

    window.addEventListener('keydown', onKeyDown); 

    return () => {
      window.removeEventListener('keydown', onKeyDown); 
    };
  }, [selectedShapeId, shapes]);

 


  // useEffect(() => {
  //   if (!Cookies.get('token')) {
  //     navigation('/');
  //   }
  // })
  const handlePreventNavigation = (event) => {
    event.preventDefault();
    if (Cookies.get('token')) {
      navigation('/dashboard')
    }
  };
  window.addEventListener('popstate', handlePreventNavigation);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);

  }
  const handleProfileOptionClick = (option) => {
    switch (option) {
      case 'profile':
        navigation('/userprofile');
        break;
      case 'password':
        navigation('/changepassword');
        break;
      case 'Signout':
        Cookies.remove('token');

        localStorage.removeItem('canvasState');


        navigation('/');
        break;
      default:
        break;
    }
    setShowProfileMenu(false); 
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    
    ctx.strokeStyle = canvasBorderColor;
    ctx.lineWidth = canvasBorderThickness;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
   
    shapes.forEach((shape) => {
      ctx.fillStyle = shape.color;
      ctx.strokeStyle = shape.shapeBorderColor;
      ctx.lineWidth = shape.shapeBorderThickness;
  
      switch (shape.type) {
        case ShapeTypes.RECTANGLE:
          ctx.fillRect(shape.x, shape.y, shape.width * 2, shape.height);
          ctx.strokeRect(shape.x, shape.y, shape.width * 2, shape.height);
          break;
        case ShapeTypes.CIRCLE:
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        case ShapeTypes.SQUARE:
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
          ctx.fill();
          ctx.stroke();
          break;
        case ShapeTypes.LINE:
        case ShapeTypes.CONNECTOR_LINE:
        case ShapeTypes.BIDIRECTIONAL_CONNECTOR:
          ctx.beginPath();
          ctx.moveTo(shape.startX, shape.startY);
          ctx.lineTo(shape.endX, shape.endY);
          ctx.strokeStyle = shape.color; 
          ctx.lineWidth = shape.shapeBorderThickness; 
          ctx.stroke();
  
          
          if (shape.type === ShapeTypes.CONNECTOR_LINE || shape.type === ShapeTypes.BIDIRECTIONAL_CONNECTOR) {
            const arrowSize = 10;
            const dx = shape.endX - shape.startX;
            const dy = shape.endY - shape.startY;
            const angle = Math.atan2(dy, dx);
  
            ctx.save();
            ctx.translate(shape.endX, shape.endY);
            ctx.rotate(angle + Math.PI);
            ctx.fillStyle = shape.color; 
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(arrowSize, arrowSize / 2);
            ctx.lineTo(arrowSize, -arrowSize / 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
  
            if (shape.type === ShapeTypes.BIDIRECTIONAL_CONNECTOR) {
              ctx.save();
              ctx.translate(shape.startX, shape.startY);
              ctx.rotate(angle);
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(arrowSize, arrowSize / 2);
              ctx.lineTo(arrowSize, -arrowSize / 2);
              ctx.closePath();
              ctx.fill();
              ctx.restore();
            }
          }
          break;
        default:
          break;
      }
  
      // Draw text inputs if present
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
  
    // Draw dragging line
    if (dragging) {
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.strokeStyle = "black"; 
      ctx.lineWidth = 2; 
      ctx.stroke();
    }
  
    
    if (selectedShapeId) {
      const selectedShape = shapes.find((shape) => shape.id === selectedShapeId);
      if (selectedShape) {
        drawSelectionPoints(ctx, selectedShape);
      }
    }
  }, [shapes, selectedShapeId, dragging, startPoint, endPoint, lines, textInputs, canvasBorderColor, canvasBorderThickness]);



  
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

      if (selectedShapes) {
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
    //const pointSize=5;

    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    let clickedShapeId = null;

    shapes.forEach((shape) => {
      const pointSize = 10;
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

  const handleMouseDown = (event) => {
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;
    shapes.forEach((shape) => {
     
      if (shape.id === selectedShapeId) {
        const halfPointSize = 5 / 2; 
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
    let newShape;
    if (type === ShapeTypes.CONNECTOR_LINE || type === ShapeTypes.BIDIRECTIONAL_CONNECTOR ||  type === ShapeTypes.LINE ) {
      newShape = {
        id: Date.now(),
        type,
        startX: 50,
        startY: 50,
        endX: 200,
        endY: 200,
        color: "black",
        shapeBorderThickness: 1

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
        color: "white",
        shapeBorderColor: "black", 
        shapeBorderThickness: 2,


      };
    }

    const newShapes = [...shapes, newShape];
    setShapes([...shapes, newShape]);
    setSelectedShapes(newShape.id);
    const newHistory = historyIndex === history.length - 1
      ? history.slice(0, historyIndex + 1).concat([newShapes])
      : [...history, newShapes];

    setShapes(newShapes);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };


  const getSelectionPoints = (shape) => {
    switch (shape.type) {
      case ShapeTypes.RECTANGLE:
        return [
          { x: shape.x, y: shape.y },
          { x: shape.x + shape.width / 2, y: shape.y }, 
          { x: shape.x + shape.width, y: shape.y },
          { x: shape.x, y: shape.y + shape.height / 2 }, 
          { x: shape.x + shape.width, y: shape.y + shape.height / 2 }, 
          { x: shape.x, y: shape.y + shape.height },
          { x: shape.x + shape.width / 2, y: shape.y + shape.height }, 
          { x: shape.x + shape.width, y: shape.y + shape.height }, 
        ];
      case ShapeTypes.CIRCLE:
        const numPoints = 8; 
        const selectionPoints = [];
        for (let i = 0; i < numPoints; i++) {
          const angle = (Math.PI / 4) * i; 
          const x = shape.x + shape.radius * Math.cos(angle);
          const y = shape.y + shape.radius * Math.sin(angle);
          selectionPoints.push({ x, y });
        }
        return selectionPoints;
      case ShapeTypes.SQUARE:
        return [
          { x: shape.x, y: shape.y }, 
          { x: shape.x + shape.size / 2, y: shape.y }, 
          { x: shape.x + shape.size, y: shape.y }, 
          { x: shape.x, y: shape.y + shape.size / 2 },
          { x: shape.x + shape.size, y: shape.y + shape.size / 2 }, 
          { x: shape.x, y: shape.y + shape.size }, 
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
    // eslint-disable-next-line default-case
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
        const newRadius = Math.max(shape.radius + (deltaX + deltaY) / 2, 0); 
        newShape.radius = newRadius;
        break;
      case ShapeTypes.SQUARE:
      
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
      return;
    }

    try {
      const userResponse = await getUserByEmail(jwtToken);
      const userId = userResponse.userId;

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
              saveCanvasImageToDB(base64String, userId)
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


  const handleOpen = () => { };

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

  <SketchPicker
    color={selectedColor}
    onChange={handleChangeColor}
  />

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const dataURL = canvas.toDataURL();
      localStorage.setItem('canvasState', dataURL);
    }
  };

  const loadCanvasState = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const savedDataURL = localStorage.getItem('canvasState');
      if (savedDataURL) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = savedDataURL;
      }
    }
  };
  useEffect(() => {
    loadCanvasState();
  }, []);

  const undo = () => {
    if (historyIndex > 0) {
      setShapes(history[historyIndex - 1]);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setShapes(history[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleBorderThicknessIncrease = () => {
    if (selectedShapeId) {
      const updatedShapes = shapes.map((shape) =>
        shape.id === selectedShapeId
          ? { ...shape, shapeBorderThickness: shape.shapeBorderThickness + 1 }
          : shape
      );
      setShapes(updatedShapes);
    }
  };

  const handleBorderThicknessDecrease = () => {
    if (selectedShapeId) {
      const updatedShapes = shapes.map((shape) =>
        shape.id === selectedShapeId
          ? {
              ...shape,
              shapeBorderThickness:
                shape.shapeBorderThickness > 1 ? shape.shapeBorderThickness - 1 : 1,
            }
          : shape
      );
      setShapes(updatedShapes);
    }
  };

  const handleBorderColorChange = (color) => {
    if (selectedShapeId) {
      const updatedShapes = shapes.map((shape) =>
        shape.id === selectedShapeId ? { ...shape, shapeBorderColor: color } : shape
      );
      setShapes(updatedShapes);
    }
  };




  return (
    <div>
      <nav className="navbar navbar-expand-lg">

      <h3 className="navbar-brand">Diagraming Tool   |</h3>
      
      <div className="dropdown">
          <button className="dropbtn">File</button>
          <div className="dropdown-content">
            <a>New</a>
            <a>Open</a>
            <a>Save</a>
            <a>Save to DB</a>
          </div>
        </div>

       <img
          src={profileImage}
          alt="Profile"
          className="profile-image"
          onClick={toggleProfileMenu}
        />
        {showProfileMenu && (
          <div className="profile-menu">
            <ul>
              <li onClick={() => handleProfileOptionClick('profile')}>Your Profile</li>
              <li onClick={() => handleProfileOptionClick('password')}>Change Password</li>
              <li onClick={() => handleProfileOptionClick('Signout')}>Sign Out</li>
            </ul>
          </div>
        )}
      </nav>
      <div className="dashboard-container">
        <div className="sidebar">
          <h2>Shapes</h2>
          <div className="shapebutton-container">
            <button
              data-testid="rectangleButton"
              onClick={() => addShape(ShapeTypes.RECTANGLE)}
              title="Add Rectangle"
            >
              <Rectangle width={100} height={60} />
            </button>
            <button
              data-testid="circleButton"
              onClick={() => addShape(ShapeTypes.CIRCLE)}
              title="Add Circle"
            >
              <Circle radius={50} />
            </button>
            <button
              data-testid="squareButton"
              onClick={() => addShape(ShapeTypes.SQUARE)}
              title="Add Square"
            >
              <Square size={80} />
            </button>
            <button
              data-testid="diamondButton"
              onClick={() => addShape(ShapeTypes.DIAMOND)}
              title="Add Diamond"
            >
              <Diamond width={100} height={100} />
            </button>
            <button
              data-testid="lineButton"
              onClick={() => addShape(ShapeTypes.LINE)}
              title="Add Line"
            >
              <Line width={5} />
            </button>
            <button
              data-testid="connectorLineButton"
              onClick={() => addShape(ShapeTypes.CONNECTOR_LINE)}
              title="Add Connector Line"
            >
              <ConnectorLine width={100} height={60} />
            </button>
            <button
              data-testid="bidirectionalConnectorButton"
              onClick={() => addShape(ShapeTypes.BIDIRECTIONAL_CONNECTOR)}
              title="Add Bidirectional Connector"
            >
              <BidirectionalConnector width={10} />
            </button>
          </div>
        </div>
        <div className="main">
          <div className="button-container">
            <button
              onClick={() => handleRotate(Math.PI / 4)}
              title="Rotate Canvas"
            >
              <IoReloadOutline className="rotate-icon" />
            </button>
            <button
              data-testid="openButton"
              onClick={() => handleButtonClick("open")}
              className={selectedButton === "open" ? "selected" : ""}
              title="Open"
            >
              <MdFileOpen />
              {hoveredButton === "open" && <span className="tooltip">Open</span>}
            </button>
            <button
              data-testid="saveButton"
              onClick={() => handleButtonClick("save")}
              className={selectedButton === "save" ? "selected" : ""}
              title="Save"
            >
              <TfiSave />
              {hoveredButton === "save" && <span className="tooltip">Save</span>}
            </button>
            <button
              data-testid="undoButton"
              onClick={() => handleButtonClick("undo")}
              className={selectedButton === "undo" ? "selected" : ""}
              title="Undo"
            >
              <IoArrowUndo />
              {hoveredButton === "undo" && <span className="tooltip">Undo</span>}
            </button>
            <button
              data-testid="redoButton"
              onClick={() => handleButtonClick("redo")}
              className={selectedButton === "redo" ? "selected" : ""}
              title="Redo"
            >
              <IoArrowRedo />
              {hoveredButton === "redo" && <span className="tooltip">Redo</span>}
            </button>
            <button
              data-testid="deleteButton"
              onClick={() => handleButtonClick("delete")}
              className={selectedButton === "delete" ? "selected" : ""}
              title="Delete"
            >
              <MdDeleteForever />
              {hoveredButton === "delete" && (
                <span className="tooltip">Delete</span>
              )}
            </button>
            <button onClick={saveCanvasState} data-testid="saveButton" title="Save">Save</button>
            <button onClick={() => setShowColorPicker(!showColorPicker)} title="Fill Color">
              <MdColorLens />
            </button>
            {showColorPicker && (
              <SketchPicker
                color={selectedColor}
                onChange={handleChangeColor}
              />
            )}
            {selectedShapeId && (
              <>
                <input
                  type="color"
                  title="border color"
                  className="bcolor"
                  value={shapes.find((shape) => shape.id === selectedShapeId)?.shapeBorderColor || "black"}
                  onChange={(e) => handleBorderColorChange(e.target.value)}
                /> 
                <button onClick={handleBorderThicknessIncrease} title=" Increase border Thickness">+</button>
                <button onClick={handleBorderThicknessDecrease} title=" Decrease border Thickness">-</button>
              </>
            )}
          </div>
   

          <div>
            <div style={{ position: "relative", width: "800px", height: "600px" }}>
              <h1>Draw Here!!</h1>
              <canvas
                data-testid="canvas"
                ref={canvasRef}
                aria-label="Canvas"
                width={800}
                height={600}
                style={{ border: "1px solid black" }}
                onClick={handleCanvasClick}
                onDoubleClick={handleDoubleClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
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
};

export default CanvasComponent;