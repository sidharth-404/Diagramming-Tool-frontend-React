
import React, { useState } from 'react';
import './HomePage.css'; // Import your CSS file for styling
import diagImage from './diag.png'; // Import your diagram image file

import exampleImage from './example.jpg';
import peopleImage from './people.png'; // Import your people image file
import featuresImage from './features.png';
import keImage from './ke.png'; // Import your ke image file
import { useNavigate } from 'react-router-dom'; 


const HomePage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate=useNavigate();
  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-page-container" data-testid="home-page-container"> {/* Add data-testid here */}
      <img src={diagImage} alt="Diagram" className="diag-image" />
      <header className="header">
        <h1 className="title">Welcome to Our Diagramming Tool</h1>
        <p className="subtitle">Visualize your ideas and concepts with ease</p>
       
        <nav className="nav"></nav>
      </header>
      <section>
        <button className="create-btn" onClick={navigateToLogin}>
          Get Started
        </button>
        {showOptions && (
          <div className="options-box" data-testid="options-box">
            <p className="option-description">Choose an option to begin:</p>
          </div>
        )}
      </section>
      <img src={exampleImage} alt="Example" className="example-image" /> {/* Example image */}
      <img src={peopleImage} alt="People" className="bottom-left-image" />
      <img src={featuresImage} alt="Features" className="bottom-leeft-image" />
      <img src={keImage} alt="KE" className="bottom-leeeft-image" />
      <div className="bottom-left-text">
        <h2 className="bottom-left-title">Share with everyone</h2>
        <p className="bottom-left-subtitle">Easily translate ideas into visual diagrams.</p>
        <h2 className="bottom-left-title2">Powerful Features</h2>
        <p className="bottom-left-subtitle2">
          Collaborate with shared cursors in real time. This has everything you expect from a professional diagramming
          tool
        </p>
        <h2 className="bottom-left-title3">Privacy First</h2>
        <p className="bottom-left-subtitle3">Store your data wherever you want to. We cannot access your data</p>
      </div>
      <footer className="footer">
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
        <div className="footer-contact">
          <p>Contact: contact@example.com</p>
        </div>
        <div className="copyright">
          <p>© 2024 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;



