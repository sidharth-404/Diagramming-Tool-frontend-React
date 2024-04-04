

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('HomePage', () => {
  it('renders the component correctly', () => {
    render(<Router><HomePage /></Router>);
   
    expect(screen.getByText('Welcome to Our Diagramming Tool')).toBeInTheDocument();
   
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('toggles options when "Get Started" button is clicked', () => {
    render(<Router><HomePage /></Router>);
    
    fireEvent.click(screen.getByText('Get Started'));
   
    expect(screen.getByTestId('options-box')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Get Started'));
    
    expect(screen.queryByTestId('options-box')).not.toBeInTheDocument();
  });

  it('renders the diagram image', () => {
    render(<Router><HomePage /></Router>);
    
    expect(screen.getByAltText('Diagram')).toBeInTheDocument();
  });

  it('renders the example image', () => {
    render(<Router><HomePage /></Router>);
    
    expect(screen.getByAltText('Example')).toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<Router><HomePage /></Router>);
  
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('renders footer contact information', () => {
    render(<Router><HomePage /></Router>);
   
    expect(screen.getByText('Contact: diagrammingtool@example.com')).toBeInTheDocument();
  });

  it('renders copyright information', () => {
    render(<Router><HomePage /></Router>);
   
    expect(screen.getByText('© 2024 Your Company Name. All rights reserved.')).toBeInTheDocument();
  });
});
