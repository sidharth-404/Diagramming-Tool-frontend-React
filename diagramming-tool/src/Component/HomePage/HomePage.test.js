

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the component correctly', () => {
    render(<HomePage />);
   
    expect(screen.getByText('Welcome to Our Diagramming Tool')).toBeInTheDocument();
   
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('toggles options when "Get Started" button is clicked', () => {
    render(<HomePage />);
    
    fireEvent.click(screen.getByText('Get Started'));
   
    expect(screen.getByTestId('options-box')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Get Started'));
    
    expect(screen.queryByTestId('options-box')).not.toBeInTheDocument();
  });

  it('renders the diagram image', () => {
    render(<HomePage />);
    
    expect(screen.getByAltText('Diagram')).toBeInTheDocument();
  });

  it('renders the example image', () => {
    render(<HomePage />);
    
    expect(screen.getByAltText('Example')).toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<HomePage />);
  
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('renders footer contact information', () => {
    render(<HomePage />);
   
    expect(screen.getByText('Contact: diagrammingtool@example.com')).toBeInTheDocument();
  });

  it('renders copyright information', () => {
    render(<HomePage />);
   
    expect(screen.getByText('© 2024 Your Company Name. All rights reserved.')).toBeInTheDocument();
  });
});
