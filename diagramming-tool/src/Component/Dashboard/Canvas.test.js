/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CanvasComponent from './CanvasComponent';

describe('CanvasComponent', () => {
  it('renders canvas with initial shapes', () => {
    render(<CanvasComponent />);

    
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();

    
    const rectangleButton = screen.getByTestId('rectangleButton');
    const circleButton = screen.getByTestId('circleButton');
    const squareButton = screen.getByTestId('squareButton');
    const triangleButton = screen.getByTestId('triangleButton');

    expect(rectangleButton).toBeInTheDocument();
    expect(circleButton).toBeInTheDocument();
    expect(squareButton).toBeInTheDocument();
    expect(triangleButton).toBeInTheDocument();
  });

  it('adds rectangle shape to canvas', () => {
    render(<CanvasComponent />);

    
    const rectangleButton = screen.getByTestId('rectangleButton');
    fireEvent.click(rectangleButton);

    
    const canvas = screen.getByTestId('canvas');
    const rectangle = canvas.querySelector('.fabric-object-rect');
    expect(rectangle).toBeInTheDocument();
  });

  it('changes fill color of active shape', () => {
    render(<CanvasComponent />);

    
    const rectangleButton = screen.getByTestId('rectangleButton');
    fireEvent.click(rectangleButton);

    
    const colorInput = screen.getByTitle('Fill color');
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });

   
    const canvas = screen.getByTestId('canvas');
    const rectangle = canvas.querySelector('.fabric-object-rect');
    expect(rectangle).toHaveAttribute('fill', '#ff0000');
  });

  it('increases border width of active shape', () => {
    render(<CanvasComponent />);

   
    const rectangleButton = screen.getByTestId('rectangleButton');
    fireEvent.click(rectangleButton);

   
    const increaseBorderButton = screen.getByTitle('Increase Border');
    fireEvent.click(increaseBorderButton);

   
    const canvas = screen.getByTestId('canvas');
    const rectangle = canvas.querySelector('.fabric-object-rect');
    expect(rectangle).toHaveAttribute('stroke-width', '3'); 
  });

  
});
