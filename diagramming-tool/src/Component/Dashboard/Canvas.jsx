import React, { useState, useRef, useEffect } from "react";
import "./Canvas.css";
import { IoArrowUndo, IoArrowRedo, IoReloadOutline } from "react-icons/io5";
import { MdDeleteForever, MdFileOpen, MdColorLens } from "react-icons/md";
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
import { IoColorPaletteOutline } from "react-icons/io5";
import { TfiSave } from "react-icons/tfi";
import { PiTextT } from "react-icons/pi";
import { IoRemoveOutline } from "react-icons/io5";
import profileImage from '../../assets/R.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SavePopup from "../SavePop/SavePop";
import MsgBoxComponent from "../ConfirmMsg/MsgBoxComponent";
import { fabric } from 'fabric';
import 'fabric-history';
import { CiTextAlignCenter, CiTextAlignLeft, CiTextAlignRight } from "react-icons/ci";
import { PiTextBBold, PiTextItalic } from "react-icons/pi";
import { LuUnderline } from "react-icons/lu";
import { IoMdColorFilter } from "react-icons/io";
import FontPicker from "font-picker-react";
import { SketchPicker } from "react-color";
import { saveCanvasImageToDB, getUserByEmail } from '../../ApiService/ApiService';

const CanvasComponent = () => {
  const [msg, setMsg] = useState("");
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showMsgBox, setShowMsgBox] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  //  const canvasRef = useRef(null);
  const [textBoxes, setTextBoxes] = useState([]);
  const [history, setHistory] = useState([]);
  const navigation = useNavigate();

  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [currentText, setCurrentText] = useState('');
  const [group, setGroup] = useState(null);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [activeFontFamily, setActiveFontFamily] = useState("Open Sans");
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [selectedFontFamily, setSelectedFontFamily] = useState('');
  const [selectedTextColor, setSelectedTextColor] = useState('#000000');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [currentBorderWidth, setCurrentBorderWidth] = useState(2);
  const [currentBorderColor, setCurrentBorderColor] = useState('#000000');
  const [selectedShape, setSelectedShape] = useState(false);
  const [copiedObjects, setCopiedObjects] = useState([]);
  
  

  useEffect(() => {
    if (!Cookies.get('token')) {
      navigation('/');
    }
  })

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
  const copySelectedObject = () => {
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
        canvas.setActiveObject(cloned);
        canvas.requestRenderAll();
        // setCopiedObjects(cloned);
      });
      setCopiedObjects([activeObject]); // <-- Set copiedObjects here
    }
  };

  // Function to paste copied object(s)
  const pasteSelectedObject = () => {
    console.log(copiedObjects.length)
    if (!copiedObjects.length) return;
    canvas.discardActiveObject();
    copiedObjects.forEach((obj) => {
      obj.clone((cloned) => {
        canvas.add(cloned);
        cloned.set({
          left: cloned.left + 10,
          top: cloned.top + 10,
          evented: true,
        });
        canvas.setActiveObject(cloned);
      });
    });
    canvas.requestRenderAll();
  };

   

  useEffect(() => {
    const handleKeyDown = (event) => {

      if (event.ctrlKey && event.key === 'z') {
        canvas.undo();
      } else if (event.ctrlKey && event.key === 'y') {
        canvas.redo();
      } else if (event.key === 'Delete') {
        deleteSelectedObject();
      } else if (event.ctrlKey && event.key === 'c') {
        copySelectedObject();
      } else if (event.ctrlKey && event.key === 'v') {
        pasteSelectedObject();
      }

    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas]);



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
  const addLine = () => {
    const line = new fabric.Line([50, 100, 300, 100], {
      left: 50,
      top: 350,
      strokeWidth: 2,
      stroke: currentBorderColor,

    });
    canvas.add(line);
  };

  // Function to add an arrow line
  const addArrowLine = () => {
    const line = new fabric.Line([50, 380, 300, 380], {
      stroke: currentBorderColor,
      strokeWidth: 2,
      selectable: true
    });

    const arrow = new fabric.Triangle({
      width: 10,
      height: 10,
      fill: currentBorderColor,
      left: 300,
      top: 380,
      angle: 90,
      originX: 'center',
      originY: 'center'
    });

    const group = new fabric.Group([line, arrow], {});
    canvas.add(group);
  };

  // Function to add a bidirectional arrow line
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
    canvas.add(group);
  };

  const deleteSelectedObject = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject); // Remove the active object from the canvas
      canvas.requestRenderAll(); // Re-render the canvas
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
        navigation('/');
        break;
      default:
        break;
    }
    setShowProfileMenu(false); 
  };

  const handleButtonClick = () => {
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

  // Function to toggle italic style
  const toggleItalic = () => {
    setIsItalic(!isItalic);
    changeTextStyle('fontStyle', !isItalic ? 'italic' : 'normal');
  };

  // Function to toggle underline style
  const toggleUnderline = () => {
    setIsUnderline(!isUnderline);
    changeTextStyle('underline', !isUnderline ? 'underline' : 'none');
  };

  const changeTextStyle = (property, value) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set(property, value);
      canvas.requestRenderAll();
    }
  }

  // Function to save canvas state to local storage
  const saveCanvasState = () => {
    const canvasState = canvas.toJSON();
    localStorage.setItem('canvasState', JSON.stringify(canvasState));
  };


  useEffect(() => {
    const loadCanvasState = () => {
      const savedCanvasState = localStorage.getItem('canvasState');
      if (savedCanvasState && canvas) {
        canvas.loadFromJSON(savedCanvasState, canvas.renderAll.bind(canvas));
      }
    };

    loadCanvasState();
  }, [canvas]);

  function increaseTextSize() {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      const currentFontSize = activeObject.get('fontSize');
      const newSize = currentFontSize + 1; // Increase font size by 5 units
      activeObject.set('fontSize', newSize);
      canvas.renderAll();
      // Update the displayed font size
      document.getElementById('currentSize').textContent =  newSize;
    }
  }

  function decreaseTextSize() {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      const currentFontSize = activeObject.get('fontSize');
      const newSize = currentFontSize - 1; // Increase font size by 5 units
      activeObject.set('fontSize', newSize);
      canvas.renderAll();
      // Update the displayed font size
      document.getElementById('currentSize').textContent =  newSize;
    }
  }

  function alignText() {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('right', 0);
      canvas.renderAll();
    }
  };
  const handleSave = async (fileName, format, saveToDatabase) => {
    const jwtToken = Cookies.get('token');
    if (!jwtToken) {
      console.error('JWT token not found in localStorage.');
    }

    try {
      const userResponse = await getUserByEmail(jwtToken);
      const userId = userResponse.userId;
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
              saveCanvasImageToDB(base64String,userId)
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



  return (
    <div>
      <nav className="navbar">
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
              <button data-testid="rectangleButton" onClick={addRectangle}><PiRectangle fontSize={70} /></button>
              <button data-testid="circleButton" onClick={addCircle}><VscCircleLarge fontSize={70} /></button>
              <button data-testid="squareButton" onClick={addSquare}><IoIosSquareOutline fontSize={70} /></button>
            </div>
            <div>
              <button data-testid="triangleButton" onClick={addTriangle}><IoTriangleOutline fontSize={70} /></button>
              <button data-testid="diamondButton" onClick={addDiamond}><GoDiamond fontSize={70} /></button>
              <button data-testid="pentagonButton" onClick={addPolygon}><BsPentagon fontSize={70} /></button>
            </div>
            <div>
              <button data-testid="ellipseButton" onClick={addEllipse}><TbOvalVertical fontSize={70} /></button>
              <button data-testid="roundrectButton" onClick={addRoundedRectangle}><LuRectangleHorizontal fontSize={70} /></button>
              <button data-testid="hexagonButton" onClick={addHexagon}><BsHexagon fontSize={70} /></button>
            </div>
            <h2>Lines</h2>
            <hr></hr>
            <div>
              <button data-testid="lineButton" onClick={addLine}><IoRemoveOutline fontSize={65} /></button>
              <button data-testid="arrowButton" onClick={addArrowLine}><HiOutlineArrowLongRight fontSize={65} /></button>
              <button data-testid="biarrowdButton" onClick={addBidirectionalArrowLine}><BsArrows fontSize={65} /></button>
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
            {/* UI buttons for actions like save, delete, etc. */}
            {/* <button data-testid="openButton" type="open"
              onClick={() => handleButtonClick("open")}
              className={selectedButton === "open" ? "selected" : ""}
            >
              <MdFileOpen />
              {hoveredButton === "open" && <span className="tooltip">Open</span>}
            </button> */}
            <button title="Save To Database" data-testid="saveButton"
              onClick={() => setShowSavePopup(true)}
              className={selectedButton === "save" ? "selected" : ""}
            >
              <TfiSave />
              {hoveredButton === "save" && <span className="tooltip">Save</span>}
            </button>
            <button title="Undo" data-testid="undoButton1"
              onClick={() => canvas.undo()}
              className={selectedButton === "undo" ? "selected" : ""}
          
            >
              <IoArrowUndo />
              {hoveredButton === "undo" && <span className="tooltip">Undo</span>}
            </button>
            <button title="Redo" data-testid="redoButton"
              onClick={() => canvas.redo()}
              className={selectedButton === "redo" ? "selected" : ""}
            >
              <IoArrowRedo />
              {hoveredButton === "redo" && <span className="tooltip">Redo</span>}
            </button>
            <button title="Delete" data-testid="deleteButton"
              onClick={() => deleteSelectedObject()}
              className={selectedButton === "delete" ? "selected" : ""}
            >
              <MdDeleteForever />
              {hoveredButton === "delete" && (
                <span className="tooltip">Delete</span>
              )}
            </button>
            <input type="color" title="Fill Colour" value={currentColor} onChange={handleColorChange} />
            <button style={{marginLeft:'10px'}} onClick={saveCanvasState} data-testid="saveButton">save the current state</button>
          </div>
          <div>
            <h1>Draw Here!!</h1>
            <canvas id="grid-canvas"
              data-testid="canvas"
              ref={canvasRef}
              aria-label="Canvas"
              style={{ border: "1px solid black", position: "relative", width: "900px" }}
            ></canvas>
            {/* Render text boxes */}
          </div>
        </div>


        <div class="sidbar-right">
          {selectedShape && (

            <> <h1>Shape Border</h1>
            <hr></hr>
              <input type="color" value={currentBorderColor} onChange={handleBorderColorChange} title="border color"  />
              <button style={{backgroundColor:"gray",  marginLeft:"5px"}} onClick={increaseBorderWidth} title="Increase Border">+</button>
              <button style={{backgroundColor:"gray", marginLeft:"5px"}} onClick={decreaseBorderWidth} title="Decrease Border">-</button>
            </>
          )}

          <h1>Text</h1>
          <hr></hr>

          <div class="dropdown-container">
            <FontPicker
              apiKey="AIzaSyBl5TouoL_peS4tDP78t8uDbepyWghkodI"
              activeFontFamily={activeFontFamily}
              onChange={(nextFont) => {
                setActiveFontFamily(nextFont.family);
                setSelectedFontFamily(nextFont.family);
                changeTextFont(nextFont.family);
              }}

            />

          </div>
          <div class="button-container-textalign">
            <button class="left" onClick={alignText}><CiTextAlignLeft /></button>
            <button class="center"><CiTextAlignCenter /></button>
            <button class="right"><CiTextAlignRight /></button>
          </div>
          <div class="button-container-textstyle">
            <button class="left" title="Bold" onClick={toggleBold}><PiTextBBold /></button>
            <button class="center" title="italic" onClick={toggleItalic}><PiTextItalic /></button>
            <button class="right" title="under line" onClick={toggleUnderline}><LuUnderline /></button>
          </div>
          <div class="button-container-color">
            <div class="text-color">Text color</div>
            <button class="color-button" onClick={() => setShowTextColorPicker(!showTextColorPicker)} ><IoMdColorFilter /></button>
            </div>
            <div>
            <button style={{backgroundColor:"gray"}} class="textsize-increase" onClick={increaseTextSize}>+</button>
            <button style={{backgroundColor:"gray", marginLeft:"5px"}} onClick={decreaseTextSize}> - </button>
            <span style={{marginLeft:"25px"}} id="currentSize"></span>
          </div>
          {showTextColorPicker && (
            <SketchPicker
              color={selectedTextColor}
              onChange={(color) => {
                setSelectedTextColor(color.hex);
                changeTextColor(color.hex); // Call function to change text color
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
          msg="Sample Message"
          handleClick={() => setShowMsgBox(false)}
        />
      )}
    </div>
  );
};

export default CanvasComponent;