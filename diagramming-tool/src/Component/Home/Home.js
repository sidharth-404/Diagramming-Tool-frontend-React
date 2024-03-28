import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Home.css';
import { iconComponents, iconTooltips } from './IconFunctions';
import { Rectangle, Circle, Square, Diamond } from './NewShapes';
import ShapeTypes from './ShapeTypes';
import profileImage from './R.png'// Import the profile image
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';


const Home = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState("");
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);
  const isDrawing = useRef(false);
  const draggedShape = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigation=useNavigate();
   // State to manage profile menu visibility
   useEffect(()=>{
    if(!Cookies.get('token')){
      navigation('/');
    }
  })
   const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
//-----------------------------------------
  const handlePreventNavigation = (event) => {
    event.preventDefault();
  if (Cookies.get('token')){
    navigation('/dashboard')
  }
  };
  window.addEventListener('popstate', handlePreventNavigation);
//-----------------------------------------

   // Function to handle profile menu option click
   const handleProfileOptionClick = (option) => {
    // Logic for handling profile menu options
    switch (option) {
      case 'profile':
        navigation('/userprofile');
        break;
      case 'password':
            navigation('/changepassword');
        break;
        case 'Signout':
          Cookies.remove('token');
          navigation('/');
          break;
      default:
        break;
    }
    setShowProfileMenu(false); // Hide the profile menu after clicking an option
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
      if (shape.type === ShapeTypes.RECTANGLE) {
        ctx.fillStyle = "white";
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === ShapeTypes.CIRCLE) {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
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
// 
  const handleUndo = () => {
  };

  const handleRedo = () => {
  };

  const handleDelete = () => {
  };

  const handleSave = () => {
  };

  const handleOpen = () => {
  };

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

  const handleButtonHover = (button) => {
    setHoveredButton(button);
  };

  return (
    <div>
    {/* Navbar */}
    <nav className="navbar">
       
        {/* Profile Logo */}
        <img src={profileImage} alt="Profile" className="profile-image" onClick={toggleProfileMenu} />
        {/* Profile Menu */}
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
        <div className="sidebar">
          <button data-testid='rectangleButton' onClick={() => addShape(ShapeTypes.RECTANGLE)}>
            <Rectangle width={100} height={60} />
          </button>
          <button data-testid='circle' onClick={() => addShape(ShapeTypes.CIRCLE)}>
            <Circle radius={50} />
          </button>
          <button data-testid='square' onClick={() => addShape(ShapeTypes.SQUARE)}>
            <Square size={80} />
          </button>
          <button data-testid='diamond' onClick={() => addShape(ShapeTypes.DIAMOND)}>
            <Diamond width={100} height={100} />
          </button>
        </div>
      </div>
      <div className="main">
        <div className="button-container">
          {Object.keys(iconComponents).map((button) => (
            <button 
              key={button}
              onMouseOver={() => handleButtonHover(button)}
              onClick={() => handleButtonClick(button)}
              className={selectedButton === button ? "selected" : ""}
            >
              {React.createElement(iconComponents[button])}
              {hoveredButton === button && (
                <span className="tooltip">{iconTooltips[button]}</span>
              )}
            </button>
          ))}
        </div>
        <div>
          <h1>Draw Here!!</h1>
          <canvas
            ref={canvasRef}
            aria-label="Canvas"
            width={800}
            height={600}
            style={{ border: "1px solid black" }}
          ></canvas>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;

