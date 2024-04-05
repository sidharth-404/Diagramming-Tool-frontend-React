import { render, screen, fireEvent } from "@testing-library/react";
import { setupJestCanvasMock } from "jest-canvas-mock";
import CanvasComponent from "./Canvas";

beforeEach(() => {
  jest.resetAllMocks();
  setupJestCanvasMock();
});
describe('CanvasComponent', () => {
  test('adding a rectangle shape', () => {
     render(<CanvasComponent />);
    const rectangleButton = screen.getByTestId('rectangleButton');
    fireEvent.click(rectangleButton);

    const canvas = screen.getByTestId('canvas');
    const ctx = canvas.getContext('2d');

  
    expect(ctx).toBeDefined();
    expect(ctx.fillStyle).toBe('#ffffff');
    expect(ctx.lineWidth).toBe(2);
   expect(ctx.fillRect).toHaveBeenCalledWith(100, 100, 200, 100);
    expect(ctx.strokeRect).toHaveBeenCalledWith(100, 100, 200, 100);
  });

  test('deleting a shape', () => {
    render(<CanvasComponent />);
    const rectangleButton =screen.getByTestId('rectangleButton');
    fireEvent.click(rectangleButton);

    
    const deleteButton = screen.getByTestId('deleteButton');
    fireEvent.click(deleteButton);

   
    const canvas = screen.getByTestId('canvas');
    const ctx = canvas.getContext('2d');
    expect(ctx).toBeDefined();
    expect(ctx.clearRect).toHaveBeenCalled(); 
  });

});

describe("Home Page", () => {
  it("Checks Open Button Exist in Home Page", () => {
    render(<CanvasComponent/>);
    const openButton = screen.getByTestId(/openButton/i);
    expect(openButton).toBeInTheDocument();
  });

  
  it("Checks Delete Button Exist in Home Page", () => {
    render(<CanvasComponent />);
    const deleteButton = screen.getByTestId(/deleteButton/i);
    expect(deleteButton).toBeInTheDocument();
  });

  it("Checks Page contain shapes heading", () => {
    render(<CanvasComponent />);
    const element = screen.getByText(/Shapes/i);
    expect(element).toBeInTheDocument();
  });

  
  it("Circle button Exist in Home Page", () => {
    render(<CanvasComponent />);
    const circ = screen.getByTestId(/circleButton/i);
    expect(circ).toBeInTheDocument();
  });

  it("Canvas Exist in Home Page", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    expect(canvas).toBeInTheDocument();
  });
});

describe("Button Working", () => {
  it("Clicks on Save Button", () => {
    render(<CanvasComponent />);
    const saveButton = screen.getByTestId("saveButton");
    fireEvent.click(saveButton);
  });

  it("Clicks on Undo Button", () => {
    render(<CanvasComponent />);
    const undoButton = screen.getByTestId("undoButton1");
    fireEvent.click(undoButton);
  });

  it("Clicks on Redo Button", () => {
    render(<CanvasComponent />);
    const redoButton = screen.getByTestId("redoButton");
    fireEvent.click(redoButton);
  });

  it("Clicks on Delete Button", () => {
    render(<CanvasComponent />);
    const deleteButton = screen.getByTestId("deleteButton");
    fireEvent.click(deleteButton);
  });

  it("Clicks on Open Button", () => {
    render(<CanvasComponent />);
    const openButton = screen.getByTestId("openButton");
    fireEvent.click(openButton);
  });
 });



