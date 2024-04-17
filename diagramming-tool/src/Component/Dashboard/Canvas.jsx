import React, { useState, useRef, useEffect } from "react";
import "./Canvas.css";
import { IoArrowUndo, IoArrowRedo } from "react-icons/io5";
import { MdDeleteForever, MdFileOpen } from "react-icons/md";
import { PiRectangle } from "react-icons/pi";
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
import { fabric } from 'fabric';
import 'fabric-history';
import { saveCanvasImageToDB, getUserByEmail } from '../../ApiService/ApiService';


const CanvasComponent = () => {
  const [msg, setMsg] = useState("");
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showMsgBox, setShowMsgBox] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const navigation = useNavigate();

  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [group, setGroup] = useState(null);
  const [currentBorderWidth, setCurrentBorderWidth] = useState(2);
  const [currentBorderColor, setCurrentBorderColor] = useState('#000000');
  const [selectedShape, setSelectedShape] = useState(false);

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

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: 'lightgrey',
      selection: true,
    });

    fabric.Object.prototype.set({
      transparentCorners: false,
      cornerColor: 'blue',
      borderColor: 'red',
      cornerSize: 6,
      padding: 5,
      cornerStyle: 'circle',
      borderOpacityWhenMoving: 0.8,
      hasControls: true
    });

    initCanvas.on('selection:created', (e) => {

      setGroup(true);
      setSelectedShape(true)
    });

    initCanvas.on('selection:cleared', () => {
      setGroup(null);
      setSelectedShape(false);
    });

    setCanvas(initCanvas);
    return () => initCanvas.dispose();
  }, []);

  const handleColorChange = (e) => {
    setCurrentColor(e.target.value);
    if (canvas && canvas.getActiveObject()) {
      canvas.getActiveObject().set('fill', e.target.value);
      canvas.requestRenderAll();
    }
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      fill: currentColor,
      stroke: currentBorderColor,
      strokeWidth: 2,
      width: 150,
      height: 100
    });
    canvas.add(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      radius: 50,
      fill: currentColor,
      stroke: currentBorderColor,
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
      fill: currentColor,
      stroke: currentBorderColor,
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
      fill: currentColor,
      stroke: currentBorderColor,
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
      fill: currentColor,
      stroke: currentBorderColor,
      strokeWidth: 2,
    });
    canvas.add(diamond);
  };

  const addRoundedRectangle = () => {
    const roundedRect = new fabric.Rect({
      left: 200,
      top: 200,
      fill: currentColor,
      width: 150,
      height: 100,
      rx: 20,
      ry: 20,
      stroke: currentBorderColor,
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
      fill: currentColor,
      stroke: currentBorderColor,
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
      stroke: currentBorderColor,
      strokeWidth: 2,
      fill: currentColor,
      selectable: true
    });

    canvas.add(hexagon);
  };

  const addEllipse = () => {
    const ellipse = new fabric.Ellipse({
      rx: 75,
      ry: 50,
      fill: currentColor,
      stroke: currentBorderColor,
      strokeWidth: 2,
      top: 200,
      left: 50
    });
    canvas.add(ellipse);
  };

  const addText = () => {
    const text = new fabric.IText('New Text', {
      left: 690,
      top: 50,
      fontSize: 20,
      fill: 'black',
      editable: true
    });
    canvas.add(text);
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
  };

  const addLine = () => {
    const line = new fabric.Line([50, 100, 250, 100], {
      left: 50,
      top: 350,
      strokeWidth: 2,
      stroke: currentBorderColor,
    });
    canvas.add(line);
  };

  const addArrowLine = () => {
    const line = new fabric.Line([50, 380, 250, 380], {
      stroke: currentBorderColor,
      strokeWidth: currentBorderWidth,
      fill: currentBorderColor,
      selectable: true
    });
  
    const arrow = new fabric.Triangle({
      width: 10,
      height: 10,
      strokeWidth: currentBorderWidth,
      stroke: currentBorderColor,
      fill: currentBorderColor,
      left: 250,
      top: 380,
      angle: 90,
      originX: 'center',
      originY: 'center'
    });
  
    const group = new fabric.Group([line, arrow], {});
  
    // Set stroke properties for both line and arrow
    group.set({
      stroke: currentBorderColor,
      strokeWidth: currentBorderWidth,
    });
  
    canvas.add(group);
  };
  
  const addBidirectionalArrowLine = () => {
    const line = new fabric.Line([50, 410, 250, 410], {
      stroke: currentBorderColor,
      strokeWidth: 2,
      selectable: true
    });
  
    const arrow1 = new fabric.Triangle({
      width: 10,
      height: 10,
      strokeWidth: 2,
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
      strokeWidth: 2,
      stroke: currentBorderColor,
      fill: currentBorderColor,
      left: 250,
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
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.requestRenderAll();
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

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

  const handleSave = async (fileName, format, saveToDatabase) => {
    const jwtToken = Cookies.get('token');
    if (!jwtToken) {
     //return;
    }

    try {
        // const userResponse = await getUserByEmail(jwtToken);
        //     const userId = userResponse.userId;
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
      tempCtx.drawImage(canvasElement, 0, 0);
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
              saveCanvasImageToDB(base64String)
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

  const increaseBorderWidth = () => {
    setCurrentBorderWidth(current => current + 1);
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set('strokeWidth', currentBorderWidth + 1);
      canvas.requestRenderAll();
    }
  };

  const decreaseBorderWidth = () => {
    if (currentBorderWidth > 1) {
      setCurrentBorderWidth(current => current - 1);
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set('strokeWidth', currentBorderWidth - 1);
        canvas.requestRenderAll();
      }
    }
  };

  const handleBorderColorChange = (e) => {
    setCurrentBorderColor(e.target.value);
    if (canvas && canvas.getActiveObject()) {
      canvas.getActiveObject().set('stroke', e.target.value);
      canvas.requestRenderAll();
    }
  };

  const handleButtonClick = () => { };

  return (
    <div>
      <nav className="navbar">
        <img src={profileImage} alt="Profile" className="profile-image" onClick={toggleProfileMenu} />
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
          <div className="shapebutton-container">
            <h2>Shapes</h2>
            <div>
              <button data-testid="rectangleButton" onClick={addRectangle}><PiRectangle fontSize={70} /></button>
              <button data-testid="circleButton" onClick={addCircle}><VscCircleLarge fontSize={70} /></button>
              <button data-testid="squareButton" onClick={addSquare}><IoIosSquareOutline fontSize={70} /></button>
            </div>
            <div>
              <button data-testid="triangleButton" onClick={addTriangle}><IoTriangleOutline fontSize={70} /></button>
              <button onClick={addDiamond}><GoDiamond fontSize={70} /></button>
              <button onClick={addPolygon}><BsPentagon fontSize={70} /></button>
            </div>
            <div>
              <button onClick={addEllipse}><TbOvalVertical fontSize={70} /></button>
              <button onClick={addRoundedRectangle}><LuRectangleHorizontal fontSize={70} /></button>
              <button onClick={addHexagon}><BsHexagon fontSize={70} /></button>
            </div>
            <h2>Lines</h2>
            <div>
              <button onClick={addLine}><IoRemoveOutline fontSize={65} /></button>
              <button onClick={addArrowLine}><HiOutlineArrowLongRight fontSize={65} /></button>
              <button onClick={addBidirectionalArrowLine}><BsArrows fontSize={65} /></button>
            </div>
            <h2>Add Text</h2>
            <div>
              <button onClick={addText}><PiTextT fontSize={65} /></button>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="button-container">
            <button
              data-testid="openButton"
              type="open"
              onClick={() => handleButtonClick("open")}
              className={selectedButton === "open" ? "selected" : ""}
            >
              <MdFileOpen />
              {hoveredButton === "open" && <span className="tooltip">Open</span>}
            </button>
            <button
              data-testid="saveButton"
              onClick={() => setShowSavePopup(true)}
              className={selectedButton === "save" ? "selected" : ""}
              title="Save To Db"
            >
              <TfiSave />
              {hoveredButton === "save" && <span className="tooltip">Save</span>}
            </button>
            <button
              data-testid="undoButton1"
              onClick={() => canvas.undo()}
              className={selectedButton === "undo" ? "selected" : ""}
              title="Undo"
            >
              <IoArrowUndo />
              {hoveredButton === "undo" && <span className="tooltip">Undo</span>}
            </button>
            <button
              data-testid="redoButton"
              onClick={() => canvas.redo()}
              className={selectedButton === "redo" ? "selected" : ""}
              title="Redo"
            >
              <IoArrowRedo />
              {hoveredButton === "redo" && <span className="tooltip">Redo</span>}
            </button>
            <button
              data-testid="deleteButton"
              onClick={() => deleteSelectedObject()}
              className={selectedButton === "delete" ? "selected" : ""}
              title="Delete"
            >
              <MdDeleteForever />
              {hoveredButton === "delete" && (
                <span className="tooltip">Delete</span>
              )}
            </button>
            <input type="color" value={currentColor} onChange={handleColorChange} title="Fill color" />

            {selectedShape && (
              <>
                <input type="color" value={currentBorderColor} onChange={handleBorderColorChange} title="border color" />
                <button onClick={increaseBorderWidth} title="Increase Border">+</button>
                <button onClick={decreaseBorderWidth} title="Decrease Border">-</button>
              </>
            )}
          </div>
          <div>
            <h1>Draw Here!!</h1>
            <canvas
              data-testid="canvas"
              ref={canvasRef}
              aria-label="Canvas"
              width={800}
              height={600}
              style={{ border: "2px solid black" }}
            ></canvas>
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
          msg="Sample Message"
          handleClick={() => setShowMsgBox(false)}
        />
      )}
    </div>
  );
};

export default CanvasComponent;