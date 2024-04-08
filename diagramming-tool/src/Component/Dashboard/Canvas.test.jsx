import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CanvasComponent from "./Canvas";
import { setupJestCanvasMock } from "jest-canvas-mock";
import ShapeTypes from './ShapeTypes';




beforeEach(() => {
  jest.resetAllMocks();
  setupJestCanvasMock();
});

describe("Home Page", () => {
  it("Checks Open Button Exist in Canvas Component", () => {
    render(<CanvasComponent />);
    const openButton = screen.getByTestId(/openButton/i);
    expect(openButton).toBeInTheDocument();
  });


  it("Checks Undo Button Exist in Canvas Component", () => {
    render(<CanvasComponent />);
    const undoButton = screen.getByTestId(/undoButton/i);
    expect(undoButton).toBeInTheDocument();
  });

  it("Checks Redo Button Exist in Canvas Component", () => {
    render(<CanvasComponent />);
    const redoButton = screen.getByTestId(/redoButton/i);
    expect(redoButton).toBeInTheDocument();
  });

  it("Rectangle Button Exist in Home Page", () => {
    render(<CanvasComponent />);
    const rect = screen.getByTestId(/rectangleButton/i);
    expect(rect).toBeInTheDocument();
  });
  it(" Circle button Exist in Home Page", () => {
    render(<CanvasComponent />);
    const circ = screen.getByTestId(/circleButton/i);
    expect(circ).toBeInTheDocument();
  });
 
  it("Square Button Exist in Home Page", () => {
    render(<CanvasComponent />);
    const squr = screen.getByTestId(/squareButton/i);
    expect(squr).toBeInTheDocument();
  });
 
  it("Diamond Button Exist in Home Page", () => {
    render(<CanvasComponent />);
    const dmnd = screen.getByTestId(/diamondButton/i);
    expect(dmnd).toBeInTheDocument();
  });
  it("Checks Color Picker Button Exist in Canvas Component", () => {
    render(<CanvasComponent />);
    const colorPickerButton = screen.getByRole('button', { name: /color picker/i });
    expect(colorPickerButton).toBeInTheDocument();
  });

  it("Toggles Color Picker Visibility on Color Picker Button Click", () => {
    render(<CanvasComponent />);
    const colorPickerButton = screen.getByRole('button', { name: /color picker/i });
  
    fireEvent.click(colorPickerButton); // Opens Color Picker
    let colorPicker = screen.getByRole('dialog', { name: /color picker/i });
    expect(colorPicker).toBeInTheDocument();
  
    fireEvent.click(colorPickerButton); // Closes Color Picker
    colorPicker = screen.queryByRole('dialog', { name: /color picker/i });
    expect(colorPicker).not.toBeInTheDocument();
  });

  
  it("Changes Shape Color on Color Picker Change", () => {
    render(<CanvasComponent />);
    const colorPickerButton = screen.getByTestId(colorPicker);
    fireEvent.click(colorPickerButton); // Opens Color Picker
  
    const colorInput = screen.getByRole('textbox');
    fireEvent.change(colorInput, { target: { value: '#ff0000' } }); // Change color to red
  
    // Assert that the selected shape's color changes
    const redShape = screen.getByTestId(/rectangleButton/i); // Assuming the rectangle is the first shape
    expect(redShape).toHaveStyle({ fill: '#ff0000' }); // Adjust this expectation according to your implementation
  });

  
  it("Resizes Shape on Mouse Drag from Resize Point", () => {
    render(<CanvasComponent />);
    const rectButton = screen.getByTestId(/rectangleButton/i);
  
    fireEvent.click(rectButton); // Adds a rectangle shape
    const rectangle = screen.getByTestId(/rectangle/i);
  
    const resizePoint = screen.getByTestId(/resize-point/i);
    fireEvent.mouseDown(resizePoint); // Start resizing
    fireEvent.mouseMove(resizePoint, { clientX: 200, clientY: 200 }); // Drag the resize point
    fireEvent.mouseUp(resizePoint); // Finish resizing
  
    // Assert that the shape has been resized
    // Add your assertions here to verify the size change of the rectangle
  });
  
  
});