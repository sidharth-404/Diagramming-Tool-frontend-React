import React, { useState, useRef, useEffect } from "react";
import "./Canvas.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { IoArrowUndo, IoArrowRedo } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { PiRectangle } from "react-icons/pi";
import { MdFiberNew } from "react-icons/md";
import { VscCircleLarge } from "react-icons/vsc";
import { IoIosSquareOutline } from "react-icons/io";
import { IoTriangleOutline } from "react-icons/io5";
import { GoDiamond } from "react-icons/go";
import { TbOvalVertical } from "react-icons/tb";
import { BsPentagon } from "react-icons/bs";
import { LuRectangleHorizontal } from "react-icons/lu";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { BsArrows } from "react-icons/bs";
import { BsHexagon } from "react-icons/bs";
import { TfiSave } from "react-icons/tfi";
import { PiTextT } from "react-icons/pi";
import { IoRemoveOutline } from "react-icons/io5";
import profileImage from '../../Assets/R.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SavePopup from "../SavePop/SavePop";
import MsgBoxComponent from "../ConfirmMsg/MsgBoxComponent";
import { fabric } from "fabric";
import 'fabric-history';
import { PiTextBBold, PiTextItalic } from "react-icons/pi";
import { LuUnderline } from "react-icons/lu";
import { IoMdColorFilter } from "react-icons/io";
import FontPicker from "font-picker-react";
import { SketchPicker } from "react-color";
import { saveCanvasImageDummyToDB, getUserByEmail } from '../../ApiService/ApiService';
import 'react-toastify/dist/ReactToastify.css'
import jsPDF from 'jspdf';
import logo from '../../Assets/logo.png';
import { FaImage } from "react-icons/fa6";
import { FaRegObjectGroup } from "react-icons/fa";
import { FaRegObjectUngroup } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";

const CanvasComponent = () => {
  const [msg, setMsg] = useState("");
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showMsgBox, setShowMsgBox] = useState(false);
  const [hoveredButton, setHoveredButton] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigation = useNavigate();
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [group, setGroup] = useState(null);
  const [activeFontFamily, setActiveFontFamily] = useState("Open Sans");
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [selectedFontFamily, setSelectedFontFamily] = useState('');
  const [selectedTextColor, setSelectedTextColor] = useState('#000000');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isBoldSelected, setIsBoldSelected] = useState(false);
  const [isItalicSelected, setIsItalicSelected] = useState(false);
  const [isUnderlineSelected, setIsUnderlineSelected] = useState(false);
  const [currentBorderWidth, setCurrentBorderWidth] = useState(2);
  const [currentBorderColor, setCurrentBorderColor] = useState('black');
  const [selectedShape, setSelectedShape] = useState(false);
  const imageInputRef = useRef(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [line, setLine] = useState(null);
  const [arrowhead, setArrowhead] = useState(null);

  useEffect(() => {
    if (!Cookies.get('token')) {
      navigation('/');
    }
  })

  const textColorPickerStyle = {
    backgroundColor: selectedTextColor,
    borderColor: "black",
    borderWidth: "6px",
    width: "60px"
  };

  useEffect(() => {
    setShowTextColorPicker(false);
  }, [selectedTextColor])



  useEffect(() => {
    const handleOutsideClick = () => {
      setShowContextMenu(false);
    };
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      canvasElement.addEventListener('click', handleOutsideClick);
    }

    return () => {
      if (canvasElement) {
        canvasElement.removeEventListener('click', handleOutsideClick);
      }
    };
  }, [canvasRef]);




  const handleContextMenu = (event) => {
    event.preventDefault();
    setShowContextMenu(true);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handlePreventNavigation = (event) => {
    event.preventDefault();
    if (Cookies.get('token')) {
      navigation('/dashboard')
    }
  };
  window.addEventListener('popstate', handlePreventNavigation);



  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: 'white',
      width: 950,
      height: 600,
      selection: true,
    });


    fabric.Object.prototype.set({
      transparentCorners: false,
      cornerColor: 'blue',
      borderColor: 'red',
      cornerSize: 6,
      padding: 2,
      cornerStyle: 'circle',
      borderOpacityWhenMoving: 0.8,
      hasControls: true
    });

    initCanvas.on('selection:created', (e) => {
      setGroup(true);
      setSelectedShape(true)
      if (e.selected[0].type !== 'i-text') {
        setCurrentColor(e.selected[0].fill);
        setCurrentBorderColor(e.selected[0].stroke)
      }
      if (e.selected[0].type === 'i-text') {
        setSelectedTextColor(e.selected[0].fill)
        setShowTextColorPicker((prev) => !prev);
      }
    });

    initCanvas.on('selection:cleared', () => {
      setGroup(null);
      setSelectedShape(false);
    });

    initCanvas.on('mouse:dblclick', (e) => {
      if (e.target && e.target.__corner) {
        const objectCorner = e.target.getPointByOrigin(e.target.__corner);
        const pointer = initCanvas.getPointer(e.e, true);
        const newStartPoint = { x: pointer.x, y: pointer.y };

        const lineInstance = new fabric.Line([objectCorner.x, objectCorner.y, pointer.x, pointer.y], {
          stroke: currentBorderColor,
          strokeWidth: 2,
          selectable: true,
        });

        setLine(lineInstance);
        initCanvas.add(lineInstance);

        const angle = Math.atan2(pointer.y - objectCorner.y, pointer.x - objectCorner.x) * (180 / Math.PI);
        const arrowheadInstance = new fabric.Triangle({
          width: 10,
          height: 10,
          fill: currentBorderColor,
          left: pointer.x,
          top: pointer.y,
          angle: angle + 90,
          originX: 'center',
          originY: 'center',
          selectable: true,
        });

        setArrowhead(arrowheadInstance);
        initCanvas.add(arrowheadInstance);

        const onMouseMove = (event) => {
          const pointer = initCanvas.getPointer(event.e, true);
          lineInstance.set({ x1: newStartPoint.x, y1: newStartPoint.y, x2: pointer.x, y2: pointer.y });
          arrowheadInstance.set({ left: pointer.x, top: pointer.y });
          initCanvas.requestRenderAll();
        };

        const onMouseUp = () => {
          initCanvas.off('mouse:move', onMouseMove);
          initCanvas.off('mouse:up', onMouseUp);
          console.log("Mouse up")
          const lineWithArrowhead = new fabric.Group([lineInstance, arrowheadInstance], {
            selectable: true,
          });
          initCanvas.remove(lineInstance);
          initCanvas.remove(arrowheadInstance)
          setLine(lineWithArrowhead);
          initCanvas.add(lineWithArrowhead);

        };

        initCanvas.on('mouse:move', onMouseMove);
        initCanvas.on('mouse:up', onMouseUp);
      }
    });

    setCanvas(initCanvas);
    return () => initCanvas.dispose();

  }, []);

  const groupObjects = () => {
    const selectedObjects = canvas.getActiveObjects();
    if (selectedObjects.length > 1) {
      const group = new fabric.Group(selectedObjects, {
        originX: 'left',
        originY: 'bottom',
        selectable: true,
        cornerColor: 'yellow',
        borderColor: 'black',
        cornerSize: 6,
        padding: 5,
        cornerStyle: 'square',
      });
      group.set({
        left: 200,
        top: 300
      });
      selectedObjects.forEach(obj => {
        canvas.remove(obj);
      });
      canvas.add(group);
      canvas.renderAll();
    }
  };

  const ungroupObjects = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'group') {

      const items = activeObject._objects;
      activeObject._restoreObjectsState();
      canvas.remove(activeObject);
      items.forEach((obj) => {
        canvas.add(obj);
      });

      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };
 const copiedObjects = () => {
    const handleCopyShortcut = (event) => {
      if (event.ctrlKey && event.key === 'v') {
        event.preventDefault();
      }
    };

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.clone(function (cloned) {
        canvas.discardActiveObject();
        cloned.set({
          left: cloned.left + 10,
          top: cloned.top + 10,
          evented: true,
        });
        if (cloned.type === 'activeSelection') {
          cloned.canvas = canvas;
          cloned.forEachObject(function (obj) {
            canvas.add(obj);
          });
          cloned.setCoords();
        } else {
          canvas.add(cloned);
        }
        canvas.requestRenderAll();
      });



      document.addEventListener('keydown', handleCopyShortcut);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {

      if (event.ctrlKey && event.key === 'z') {
        canvas.undo();
      } else if (event.ctrlKey && event.key === 'y') {
        canvas.redo();
      } else if (event.key === 'Delete') {
        deleteSelectedObject();
      } else if (event.ctrlKey && event.key === 'v') {
        copiedObjects();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const activeObject = canvas?.getActiveObject();
      if (canvas && activeObject) {
        const resizeAmount = 5;

        switch (event.key) {
          case 'w':
            activeObject.set('height', activeObject.height + resizeAmount);
            break;
          case 's':
            activeObject.set('height', activeObject.height - resizeAmount);
            break;
          case 'a':
            activeObject.set('width', activeObject.width - resizeAmount);
            break;
          case 'd':
            activeObject.set('width', activeObject.width + resizeAmount);
            break;

          default:
            break;
        }

        canvas.renderAll();
      }
    };
    if (canvas) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas]);


  useEffect(() => {
    const handleKeyDown = (event) => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        const moveAmount = 5;

        switch (event.key) {
          case 'ArrowUp':
            activeObject.set('top', activeObject.top - moveAmount);
            break;
          case 'ArrowDown':
            activeObject.set('top', activeObject.top + moveAmount);
            break;
          case 'ArrowLeft':
            activeObject.set('left', activeObject.left - moveAmount);
            break;
          case 'ArrowRight':
            activeObject.set('left', activeObject.left + moveAmount);
            break;
          default:
            break;
        }

        canvas.renderAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas]);




  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        if (obj.type === 'i-text') {
          obj.set('fill', newColor);
        } else {
          obj.set('fill', newColor);
          
        }
      });
      canvas.requestRenderAll();
    }
  };


  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      fill: '#ffffff',
      stroke: 'black',
      strokeWidth: 2,
      width: 150,
      height: 100
    });
    canvas.add(rect);
  };
  const addCircle = () => {
    const circle = new fabric.Circle({
      radius: 50,
      fill: '#ffffff',
      stroke: 'black',
      strokeWidth: 2,
      top: 50,
      left: 200
    });
    canvas.add(circle);
  };

  const addSquare = () => {
    const square = new fabric.Rect({
      left: 300,
      top: 50,
      fill:'#ffffff',
      stroke: 'black',
      strokeWidth: 2,
      width: 100,
      height: 100
    });
    canvas.add(square);
  };

  const addTriangle = () => {
    const triangle = new fabric.Triangle({
      width: 100,
      height: 100,
      fill: '#ffffff',
      stroke: 'black',
      strokeWidth: 2,
      left: 400,
      top: 50
    });
    canvas.add(triangle);
  };

  const addDiamond = () => {
    const diamond = new fabric.Polygon([
      { x: 75, y: 0 },
      { x: 150, y: 50 },
      { x: 75, y: 100 },
      { x: 0, y: 50 }
    ], {
      left: 500,
      top: 50,
      fill: '#ffffff',
      stroke: 'black',
      strokeWidth: 2,
    });
    canvas.add(diamond);
  };

  const addRoundedRectangle = () => {
    const roundedRect = new fabric.Rect({
      left: 200,
      top: 200,
      fill: '#ffffff',
      width: 150,
      height: 100,
      rx: 20,
      ry: 20,
      stroke: 'black',
      strokeWidth: 2
    });

    canvas.add(roundedRect);
  };

  const addPolygon = () => {
    const polygon = new fabric.Polygon([
      { x: 200, y: 0 },
      { x: 250, y: 50 },
      { x: 250, y: 100 },
      { x: 150, y: 100 },
      { x: 150, y: 50 }
    ], {
      left: 400,
      top: 200,
      fill: '#ffffff',
      stroke: 'black',
      strokeWidth: 2,
    });
    canvas.add(polygon);
  };

  const addHexagon = () => {
    const hexagon = new fabric.Polygon([
      { x: 50, y: 25 },
      { x: 100, y: 25 },
      { x: 125, y: 75 },
      { x: 100, y: 125 },
      { x: 50, y: 125 },
      { x: 25, y: 75 }
    ], {
      left: 600,
      top: 200,
      stroke: 'black',
      strokeWidth: 2,
      fill: '#ffffff',
      selectable: true
    });
    canvas.add(hexagon);
  };

  const addEllipse = () => {
    const ellipse = new fabric.Ellipse({
      rx: 75,
      ry: 50,
      fill: '#ffffff',
      stroke: 'black',
      strokeWidth: 2,
      top: 200,
      left: 50
    });
    canvas.add(ellipse);
  };

  const addText = () => {
    const text = new fabric.IText('', {
      left: 20,
      top: 50,
      fontSize: 20,
      fontFamily: selectedFontFamily,
      editable: true
    });
    text.set({ text: 'Typehere...' });
    canvas.add(text);
    document.getElementById('currentSize').textContent = text.fontSize;
    canvas.setActiveObject(text);
    text.enterEditing();
    text.on('editing:entered', () => {
      text.visible = true;
      canvas.requestRenderAll();
    });
    text.on('editing:exited', () => {
      if (text.text.trim() === 'New Text' || text.text.trim() === '') {
        text.visible = false;
      }
      canvas.requestRenderAll();
    });
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);
  };
  const addLine = () => {
    const line = new fabric.Line([50, 100, 300, 100], {
      left: 50,
      top: 350,
      strokeWidth: 2,
      stroke: currentBorderColor,
    });
    canvas.add(line);
  };

  const addArrowLine = () => {
    const line = new fabric.Line([50, 380, 300, 380], {
      stroke: currentBorderColor,
      fill: currentBorderColor,
      strokeWidth: 2,
      selectable: true
    });

    const arrow = new fabric.Triangle({
      width: 10,
      height: 10,
      fill: currentBorderColor,
      stroke: currentBorderColor,
      left: 300,
      top: 380,
      angle: 90,
      originX: 'center',
      originY: 'center'
    });
    const group = new fabric.Group([line, arrow], {});

    canvas.add(group);
  };

  const addBidirectionalArrowLine = () => {
    const line = new fabric.Line([50, 410, 300, 410], {
      stroke: currentBorderColor,
      strokeWidth: 2,
      selectable: true
    });

    const arrow1 = new fabric.Triangle({
      width: 10,
      height: 10,
      fill: currentBorderColor,
      left: 50,
      top: 410,
      angle: -90,
      originX: 'center',
      originY: 'center'
    });

    const arrow2 = new fabric.Triangle({
      width: 10,
      height: 10,
      fill: currentBorderColor,
      left: 300,
      top: 410,
      angle: 90,
      originX: 'center',
      originY: 'center'
    });
    const group = new fabric.Group([line, arrow1, arrow2], {});


    group.set({
      stroke: currentBorderColor,
      strokeWidth: currentBorderWidth,
    });

    canvas.add(group);
  };

  const deleteSelectedObject = () => {
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      confirmAlert({
        title: 'Confirm deletion',
        message: 'Are you sure you want to delete these objects?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              activeObjects.forEach(obj => {
                canvas.remove(obj);
              });
              canvas.discardActiveObject();
              canvas.requestRenderAll();
            }
          },
          {
            label: 'No',
            onClick: () => {
            }
          }
        ]
      });
    } else {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        confirmAlert({
          title: 'Confirm deletion',
          message: 'Are you sure you want to delete this object?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                canvas.remove(activeObject);
                canvas.discardActiveObject();
                canvas.requestRenderAll();
              }
            },
            {
              label: 'No',
              onClick: () => {

              }
            }
          ]
        });
      }
    }
  };



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
        localStorage.removeItem('selected-image');
        navigation('/');
        break;
      default:
        break;
    }
    setShowProfileMenu(false);
  };

  const changeTextFont = (fontFamily) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('fontFamily', fontFamily);
      canvas.requestRenderAll();
    }
  };
  const changeTextColor = (color) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('fill', color);
      canvas.requestRenderAll();
    }
  };

  const toggleBold = () => {
    setIsBold(!isBold);
    changeTextStyle('fontWeight', !isBold ? 'bold' : 'normal');
  };


  const toggleItalic = () => {
    setIsItalic(!isItalic);
    changeTextStyle('fontStyle', !isItalic ? 'italic' : 'normal');
  };

  const toggleUnderline = () => {
    setIsUnderline(!isUnderline);
    changeTextStyle('underline', !isUnderline ? 'underline' : false);
  };

 
  const changeTextStyle = (property, value) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set(property, value);
      canvas.requestRenderAll();
    }
  }

  const saveCanvasState = () => {
    const canvasState = canvas.toJSON();
    localStorage.setItem('canvasState', JSON.stringify(canvasState));
    localStorage.removeItem('selected-image')
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.includes('image/jpeg') && !file.type.includes('image/png')) {
      setMsg('Please select a JPG or PNG image.');
      setShowMsgBox(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      fabric.Image.fromURL(dataUrl, (img) => {

        img.set({
          left: 0,
          top: 0,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        canvas.add(img);
        canvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const loadCanvasState = () => {
      const importImage = localStorage.getItem('selected-image');
      if (!importImage) {
        const savedCanvasState = localStorage.getItem('canvasState');
        if (savedCanvasState && canvas) {
          canvas.loadFromJSON(savedCanvasState, canvas.renderAll.bind(canvas));
        }
      }
      else {
        if (importImage && canvas)
          canvas.loadFromJSON(importImage, canvas.renderAll.bind(canvas));
      }
    };

    loadCanvasState();
  }, [canvas]);

  function increaseTextSize() {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      const currentFontSize = activeObject.get('fontSize');
      const newSize = currentFontSize + 1;
      activeObject.set('fontSize', newSize);
      canvas.renderAll();
      document.getElementById('currentSize').textContent = newSize;
    }
  }

  function decreaseTextSize() {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      const currentFontSize = activeObject.get('fontSize');
      const newSize = currentFontSize - 1;
      activeObject.set('fontSize', newSize);
      canvas.renderAll();
      document.getElementById('currentSize').textContent = newSize;
    }
  }



  const handleSave = async (fileName, format, saveToDatabase) => {
    const jwtToken = Cookies.get('token');
    if (!jwtToken) {
      return;
    }

    try {
      
     const canvasElement = canvasRef.current;
      if (!canvasElement) return;

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvasElement.width;
      tempCanvas.height = canvasElement.height;
      const tempCtx = tempCanvas.getContext("2d");

      if (format === "jpeg") {
        tempCtx.fillStyle = "white";
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      }

      tempCtx.drawImage(canvasElement, 0, 0)

      if (format === "svg") {
        const svgData = new XMLSerializer().serializeToString(canvasElement);
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = fileName + ".svg";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        toast.success("Exported successfully!");
        setShowSavePopup(false);
      } else if (format === "pdf") {
        const pdf = new jsPDF();
        pdf.addImage(tempCanvas.toDataURL(), 'PNG', 0, 0);
        pdf.save(fileName + ".pdf");
        toast.success("Exported successfully!");
        setShowSavePopup(false);
      }
      else {
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
                const canvasState = canvas.toJSON();
                const base64String = canvasDataUrl.split(",")[1];
                const imageJson = JSON.stringify(canvasState);
                saveCanvasImageDummyToDB(fileName, imageJson, base64String, jwtToken)
                  .then(() => {
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
                toast.success("Exported successfully!");
                setShowSavePopup(false);
              }
            }
          };
          reader.readAsDataURL(blob);
        }, "image/" + format);
      }
    } catch (error) {
      console.error('Error in fetching user data:', error);
    }
  };

  const handleCreateNewDiagram = () => {
    confirmAlert({
      title: 'Create New Diagram',
      message: 'Are you sure you want to create a new diagram?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
           canvas.clear();

            localStorage.removeItem('selected-image');
            localStorage.removeItem('canvasState');

            
            toast.success("Canvas cleared successfully!");

          }
        },
        {
          label: 'No',
          onClick: () => {

          }
        }
      ]
    });
  };
  const increaseBorderWidth = () => {
    setCurrentBorderWidth(current => current + 1);
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {

      activeObjects.filter((obj) => obj.type !== 'i-text').forEach((obj) => {
        obj.set('strokeWidth', currentBorderWidth + 1);
      });

      canvas.requestRenderAll();
    }
  };




  const decreaseBorderWidth = () => {
    if (currentBorderWidth > 1) {
      setCurrentBorderWidth(current => current - 1);
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects && activeObjects.length > 0) {
        activeObjects.filter((obj) => obj.type !== 'i-text').forEach((obj) => {
          obj.set('strokeWidth', currentBorderWidth + 1);
        });

        canvas.requestRenderAll();
      }
    }
  };


  const handleBorderColorChange = (e) => {
    const newBorderColor = e.target.value;
    setCurrentBorderColor(newBorderColor);
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        obj.set('stroke', newBorderColor);
      });
      canvas.requestRenderAll();
    }
  };


  const setDottedBorder = () => {
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        obj.set('strokeDashArray', [2, 2]);
      });
      canvas.requestRenderAll();
    }
  };




  const setSolidBorder = () => {
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        obj.set('strokeDashArray', null);
      });
      canvas.requestRenderAll();
    }
  };
  const setDashedBorder = () => {
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        obj.set('strokeDashArray', [8, 5]);
      });
      canvas.requestRenderAll();
    }
  };
  return (
    <div>
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logos" /><h3 style={{ color: "black", fontSize: "6rm" }}>LogicDraw</h3>
        <img src={profileImage} alt="Profile" className="profile-image" onClick={toggleProfileMenu} />
        {showProfileMenu && (
          <div className="profile-menu">
            <ul>
              <li data-testid="profileButton" onClick={() => handleProfileOptionClick('profile')}>Your Profile</li>
              <li data-testid="passwordButton" onClick={() => handleProfileOptionClick('password')}>Change Password</li>
              <li data-testid="SignoutButton" onClick={() => handleProfileOptionClick('Signout')}>Sign Out</li>
            </ul>
          </div>
        )}
      </nav>
      <div className="dashboard-container">
        <div className="sidebar">
          <div className="shapebutton-container">
            <h2>Shapes</h2>
            <hr></hr>
            <div>
              <button data-testid="rectangleButton" title="Rectangle" onClick={addRectangle}><PiRectangle fontSize={70} /></button>
              <button data-testid="circleButton" title="Circle" onClick={addCircle}><VscCircleLarge fontSize={70} /></button>
              <button data-testid="squareButton" title="Square" onClick={addSquare}><IoIosSquareOutline fontSize={70} /></button>
            </div>
            <div>
              <button data-testid="triangleButton" title="Triangle" onClick={addTriangle}><IoTriangleOutline fontSize={70} /></button>
              <button data-testid="diamondButton" title="Diamond" onClick={addDiamond}><GoDiamond fontSize={70} /></button>
              <button data-testid="pentagonButton" title="Pentagon" onClick={addPolygon}><BsPentagon fontSize={70} /></button>
            </div>
            <div>
              <button data-testid="ellipseButton" title="Ellipse" onClick={addEllipse}><TbOvalVertical fontSize={70} /></button>
              <button data-testid="roundrectButton" title="Rounded Rectangle" onClick={addRoundedRectangle}><LuRectangleHorizontal fontSize={70} /></button>
              <button data-testid="hexagonButton" title="Hexagon" onClick={addHexagon}><BsHexagon fontSize={70} /></button>
            </div>
            <h2>Lines</h2>
            <hr></hr>
            <div>
              <button data-testid="lineButton" title="Line" onClick={addLine}><IoRemoveOutline fontSize={65} /></button>
              <button data-testid="arrowButton" title="Directional Connector" onClick={addArrowLine}><HiOutlineArrowLongRight fontSize={65} /></button>
              <button data-testid="biarrowdButton" title="Bidirectional Connector" onClick={addBidirectionalArrowLine}><BsArrows fontSize={65} /></button>
            </div>
            <h2>Add Text</h2>
            <hr></hr>
            <div>
              <button data-testid="textButton" onClick={addText}><PiTextT fontSize={65} /></button>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="button-container">
            <button data-testid="newdiagram" title="new Diagram" onClick={handleCreateNewDiagram}><MdFiberNew fontSize={30} /></button>

            <button title="Save To Database" data-testid="saveButton"
              onClick={() => setShowSavePopup(true)}
            >
              <MdOutlineSaveAlt fontSize={30} />

              {hoveredButton === "save" && <span className="tooltip">Save</span>}
            </button>
            <button title="Undo" data-testid="undoButton"
              onClick={() => canvas.undo()}
            >
              <IoArrowUndo fontSize={30} />
              {hoveredButton === "undo" && <span className="tooltip">Undo</span>}
            </button>
            <button title="Redo" data-testid="redoButton"
              onClick={() => canvas.redo()}
            >
              <IoArrowRedo fontSize={30} />
              {hoveredButton === "redo" && <span className="tooltip">Redo</span>}
            </button>
            <button title="Delete" data-testid="deleteButton"
              onClick={() => deleteSelectedObject()}

            >
              <MdDeleteForever fontSize={30} />
              {hoveredButton === "delete" && (
                <span className="tooltip">Delete</span>
              )} <ToastContainer />
            </button>

            <input type="file" data-testid="fileUpload" accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              ref={imageInputRef} />
            <button title="Add Image" data-testid="imageInput" onClick={() => imageInputRef.current.click()}>
              <FaImage fontSize={30} />

            </button>


            <button data-testid="saveStateButton" title="save the current state" style={{ marginLeft: '10px' }} onClick={saveCanvasState}>
              <TfiSave fontSize={30} /></button>
            <button data-testid="groupButton" title="group" onClick={groupObjects}><FaRegObjectGroup fontSize={30} /></button>
            <button data-testid="ungroupedButton" title="ungroup" onClick={ungroupObjects}><FaRegObjectUngroup fontSize={30} /></button>

            <input data-testid="colorPicker" type="color" title="Fill Colour" value={currentColor} onChange={handleColorChange} />
          </div>

          <div>
            <h1>Draw Here!!</h1>
            <ContextMenuTrigger id="canvas-context-menu" holdToDisplay={-1}>
              <canvas
                id="grid-canvas"
                data-testid="canvas"
                ref={canvasRef}
                aria-label="Canvas"
                style={{ border: "1px solid black", position: "relative", width: "800px" }}
                onContextMenu={handleContextMenu}
              ></canvas>
            </ContextMenuTrigger>
            <ContextMenu id="canvas-context-menu" className="rc-menu" onHide={() => setShowContextMenu(false)}>
              <MenuItem className="rc-menu-item" onClick={{}}>Copy</MenuItem>
              <MenuItem className="rc-menu-item" onClick={copiedObjects}>Paste</MenuItem>
              <MenuItem className="rc-menu-item" onClick={deleteSelectedObject}>Delete</MenuItem>
              <MenuItem className="rc-menu-item" onClick={() => canvas.undo()}>Undo</MenuItem>
              <MenuItem className="rc-menu-item" onClick={() => canvas.redo()}>Redo</MenuItem>
             
            </ContextMenu>

          </div>
        </div>
        <div className="sidbar-right">


          <> <h2>Border</h2>
            <hr></hr>
            <div className="borderbuttons">
              <input className="bc" type="color" data-testid="colorShapePicker" value={currentBorderColor} onChange={handleBorderColorChange} title="border color" />
              <button className="bc" data-testid="increaseBorder" style={{ backgroundColor: "gray", marginLeft: "5px" }} onClick={increaseBorderWidth} title="Increase Border">+</button>
              <button className="bc" data-testid="decreaseBorder" style={{ backgroundColor: "gray", marginLeft: "5px" }} onClick={decreaseBorderWidth} title="Decrease Border">-</button>
              <button Title='Solid Line' style={{ backgroundColor: "white", marginLeft: "5px" }} onClick={setSolidBorder}>____</button>
              <button data-testid="set-dotted-border-button" class="dropdown-option" title="Dotted Line" style={{ backgroundColor: "white", marginLeft: "5px" }} onClick={setDottedBorder}>......</button>
              <button class="dropdown-option" title="Dashed Line" style={{ backgroundColor: "white", marginLeft: "5px" }} onClick={setDashedBorder}>_ _ _</button>
            </div>
          </>
          <h2>Text</h2>
          <hr></hr>
          <div className="dropdown-container">
            <FontPicker
              apiKey="AIzaSyBl5TouoL_peS4tDP78t8uDbepyWghkodI"
              activeFontFamily={activeFontFamily}
              onChange={(nextFont) => {
                setActiveFontFamily(nextFont.family);
                setSelectedFontFamily(nextFont.family);
                changeTextFont(nextFont.family);
              }} />
          </div>

          <div className="button-container-textstyle">
            <button data-testid="boldButton" className={`left ${isBold ? 'active' : ''}`} title="Bold" onClick={toggleBold}><PiTextBBold /></button>
            <button data-testid="italicButton" className={`center ${isItalic ? 'active' : ''}`} title="italic" onClick={toggleItalic}><PiTextItalic /></button>
            <button data-testid="underButton"  className={`right ${isUnderline ? 'active' : ''}`} title="under line" onClick={toggleUnderline}><LuUnderline /></button>
          </div>
          <div className="button-container-color">
            <div className="text-color">Text color</div>
            {/* selectedTextColor */}
            <button data-testid="textcolorButton" className="color-button" style={textColorPickerStyle} onClick={() => setShowTextColorPicker(!showTextColorPicker)} ></button>
          </div>
          <div>
            <button data-testid="plusButton" style={{ backgroundColor: "gray" }} className="textsize-increase" onClick={increaseTextSize}>+</button>
            <button data-testid="minusButton" style={{ backgroundColor: "gray", marginLeft: "5px" }} onClick={decreaseTextSize}> - </button>
            <span style={{ marginLeft: "25px" }} id="currentSize"></span>
          </div>
          {showTextColorPicker && (
            <SketchPicker
              data-testid="sketch-picker"
              color={selectedTextColor}
              onChange={(color) => {
                setSelectedTextColor(color.hex);
                changeTextColor(color.hex);
              }}
            />
          )}
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
