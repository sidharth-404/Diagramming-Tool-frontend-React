

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the component correctly', () => {
    render(<HomePage />);
    // Assert that the component renders the title
    expect(screen.getByText('Welcome to Our Diagramming Tool')).toBeInTheDocument();
    // Assert that the "Get Started" button is rendered
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('toggles options when "Get Started" button is clicked', () => {
    render(<HomePage />);
    // Click the "Get Started" button
    fireEvent.click(screen.getByText('Get Started'));
    // Assert that the options box is visible
    expect(screen.getByTestId('options-box')).toBeInTheDocument();
    // Click the "Get Started" button again
    fireEvent.click(screen.getByText('Get Started'));
    // Assert that the options box is not visible
    expect(screen.queryByTestId('options-box')).not.toBeInTheDocument();
  });

  it('renders the diagram image', () => {
    render(<HomePage />);
    // Assert that the diagram image is rendered
    expect(screen.getByAltText('Diagram')).toBeInTheDocument();
  });

  it('renders the example image', () => {
    render(<HomePage />);
    // Assert that the example image is rendered
    expect(screen.getByAltText('Example')).toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<HomePage />);
    // Assert that footer links are rendered
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('renders footer contact information', () => {
    render(<HomePage />);
    // Assert that footer contact information is rendered
    expect(screen.getByText('Contact: diagrammingtool@example.com')).toBeInTheDocument();
  });

  it('renders copyright information', () => {
    render(<HomePage />);
    // Assert that copyright information is rendered
    expect(screen.getByText('© 2024 Your Company Name. All rights reserved.')).toBeInTheDocument();
  });
});
