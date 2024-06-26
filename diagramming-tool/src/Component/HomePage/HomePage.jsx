
import React, { useState } from 'react';
import './HomePage.css';
import diagImage from '../../Assets/diag.png';
import exampleImage from '../../Assets/example.jpg';
import peopleImage from '../../Assets/people.png';
import featuresImage from '../../Assets/features.png';
import keImage from '../../Assets/ke.png';
import dig from '../../Assets/dig.svg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const HomePage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigation = useNavigate();

  const toggleOptions = () => {
    const token = Cookies.get('token');
    if (token) {
      navigation('/dashboard')
    }
    else {
      navigation('/login');
    }
    
    setShowOptions(prevState => !prevState);
  };


  return (
    <div className="home-page-container" data-testid="home-page-container">
      <img src={diagImage} alt="Diagram" className="diag-image" />
      <header className="header">
        <h1 className="title">Welcome to Our Diagramming Tool</h1>
        <p className="subtitle">Visualize your ideas and concepts with ease</p>
        <nav className="nav"></nav>
      </header>
      <section>
        <button className="create-btn" onClick={toggleOptions} data-testid="get-started-button">
          Get Started
        </button>
        {showOptions && (
          <div className="options-box" data-testid="options-box">
            <p className="option-description"></p>
          </div>
        )}
      </section>
      <img src={exampleImage} alt="Example" className="example-image" />
      <img src={peopleImage} alt="People" className="bottom-left-image" />
      <img src={featuresImage} alt="Features" className="bottom-leeft-image" />
      <img src={keImage} alt="KE" className="bottom-leeeft-image" />
      <img src={dig} alt="DI" className="dig-image" />
      <div className="bottom-left-text">
        <h2 className="bottom-left-title">Share with everyone</h2>
        <p className="bottom-left-subtitle">Easily translate ideas into visual diagrams.</p>
        <h2 className="bottom-left-title2">Powerful Features</h2>
        <p className="bottom-left-subtitle2">
          Collaborate with shared cursors in real time. This has everything you expect from a professional diagramming tool
        </p>
        <h2 className="bottom-left-title3">Privacy First</h2>
        <p className="bottom-left-subtitle3">Store your data wherever you want to. We cannot access your data</p>
        <div className="bottom-left-additional">
          <p>Experience the seamless integration of collaboration and visualization, as you co-create with colleagues in real-time, regardless of distance or time zone.</p>
          <p>Embark on a journey of discovery and ideation as you explore the endless possibilities our tool offers for expressing and refining your thoughts.</p>
          <p>From brainstorming to presentation, our comprehensive suite of tools empowers you at every stage of your creative process, ensuring your ideas are brought to life with clarity and precision.</p>
        </div>
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
