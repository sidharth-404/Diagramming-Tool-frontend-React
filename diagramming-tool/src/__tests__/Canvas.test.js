

import { render, screen, fireEvent } from "@testing-library/react";
import CanvasComponent from "../Component/Dashboard/Canvas";
import { setupJestCanvasMock } from "jest-canvas-mock";


beforeEach(() => {
  jest.resetAllMocks();
  setupJestCanvasMock();
});

describe("Home Page", () => {
  it("Checks Open Button Exist in Home Page", () => {
    render(<CanvasComponent />);
    const openButton = screen.getByTestId(/openButton/i);
    expect(openButton).toBeInTheDocument();
  });

  it("Checks Save Button Exist in Home Page", () => {
    render(<CanvasComponent />);
    const saveButton = screen.getByTestId(/saveButton/i);
    expect(saveButton).toBeInTheDocument();
  });

  it("Checks Undo Button Exist in Home Page", () => {
    render(<CanvasComponent />);
    const undoButton = screen.getByTestId(/undoButton/i);
    expect(undoButton).toBeInTheDocument();
  });

  it("Checks Redo Button Exist in Home Page", () => {
    render(<CanvasComponent />);
    const redoButton = screen.getByTestId(/redoButton/i);
    expect(redoButton).toBeInTheDocument();
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
  it("Canvas Exist in Home Page", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    expect(canvas).toBeInTheDocument();
  });
});

describe("Button Working", () => {
  it("Clicks on Save Button", () => {
    render(<CanvasComponent />);
    const saveButton = screen.getByTestId(/saveButton/i);
    fireEvent.click(saveButton);
  });

  it("Clicks on Undo Button", () => {
    render(<CanvasComponent />);
    const undoButton = screen.getByTestId(/undoButton/i);
    fireEvent.click(undoButton);
  });

  it("Clicks on Redo Button", () => {
    render(<CanvasComponent />);
    const redoButton = screen.getByTestId(/redoButton/i);
    fireEvent.click(redoButton);
  });

  it("Clicks on Delete Button", () => {
    render(<CanvasComponent />);
    const deleteButton = screen.getByTestId(/deleteButton/i);
    fireEvent.click(deleteButton);
  });

  it("Clicks on Open Button", () => {
    render(<CanvasComponent />);
    const openButton = screen.getByTestId(/openButton/i);
    fireEvent.click(openButton);
  });

  it("Drawing Rectangle in Home Page", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    expect(canvas).toBeInTheDocument();
    const rect = screen.getByTestId(/rectangleButton/i);
    fireEvent.click(rect);
    const ctx = canvas.getContext("2d");
    expect(ctx).toBeDefined();
    expect(ctx.fillRect).toHaveBeenCalledWith(100, 100, 200, 100);
    expect(ctx.strokeRect).toHaveBeenCalledWith(100, 100, 200, 100);
  });

  it("Drawing Circle in Home Page", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    expect(canvas).toBeInTheDocument();
    const circleButton = screen.getByTestId(/circleButton/i);
    fireEvent.click(circleButton);
    const ctx = canvas.getContext("2d");
    expect(ctx).toBeDefined();
    expect(ctx.arc).toHaveBeenCalledWith(100, 100, 50, 0, Math.PI * 2);
    expect(ctx.fill).toHaveBeenCalled();
    expect(ctx.stroke).toHaveBeenCalled();
  });

  test("Drawing Square in Home Page", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    expect(canvas).toBeInTheDocument();

    const squareButton = screen.getByTestId(/squareButton/i);
    fireEvent.click(squareButton);

    const ctx = canvas.getContext("2d");
    expect(ctx).toBeDefined();
    expect(ctx.fillRect).toHaveBeenCalledWith(100, 100, 80, 80);
    expect(ctx.strokeRect).toHaveBeenCalledWith(100, 100, 80, 80);
  });

  test("Drawing Diamond in Home Page", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    expect(canvas).toBeInTheDocument();

    const diamondButton = screen.getByTestId(/diamondButton/i);
    fireEvent.click(diamondButton);

    const ctx = canvas.getContext("2d");
    expect(ctx).toBeDefined();
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalledWith(150, 100);
    expect(ctx.lineTo).toHaveBeenCalledWith(200, 150);
    expect(ctx.lineTo).toHaveBeenCalledWith(150, 200);
    expect(ctx.lineTo).toHaveBeenCalledWith(100, 150);
    expect(ctx.closePath).toHaveBeenCalled();

    expect(ctx.fill).toHaveBeenCalled();
    expect(ctx.stroke).toHaveBeenCalled();
  });
});
it("Drawing Line in Home Page", () => {
  render(<CanvasComponent />);
  const canvas = screen.getByTestId("canvas");
  expect(canvas).toBeInTheDocument();
  const lineButton = screen.getByTestId('lineButton');
  fireEvent.click(lineButton);
  const ctx = canvas.getContext("2d");
  expect(ctx).toBeDefined();
  
});

it("Drawing Connector in Home Page", () => {
  render(<CanvasComponent />);
  const canvas = screen.getByTestId("canvas");
  expect(canvas).toBeInTheDocument();
  const connectorButton = screen.getByTestId(/connectorLineButton/i);
  fireEvent.click(connectorButton);
  const ctx = canvas.getContext("2d");
  
});

it("Drawing Bidirectional Connector in Home Page", () => {
  render(<CanvasComponent />);
  const canvas = screen.getByTestId("canvas");
  expect(canvas).toBeInTheDocument();
  const bidirectionalConnectorButton = screen.getByTestId(/bidirectionalConnectorButton/i);
  fireEvent.click(bidirectionalConnectorButton);
  const ctx = canvas.getContext("2d");
  
});

describe("Home component", () => {
  it("Draws shapes on the canvas", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    const context = canvas.getContext("2d");
    expect(context).toBeDefined();
    expect(context.clearRect).toHaveBeenCalled();
  });

  describe('CanvasComponent', () => {
  
  
    it('should rotate a line around its midpoint', () => {
      const { getByTestId } = render(<CanvasComponent />);
      
      const lineButton = screen.getByTestId('lineButton');
      fireEvent.click(lineButton);
  
      // Rotate the selected shape
      const rotateIcon = screen.getByTestId('rotate-icon');
      fireEvent.click(rotateIcon);
  
      // Assert the rotation
      // You need to implement this assertion based on your rotation logic
    });
  
    it('should rotate a connector line around its midpoint', () => {
      const { getByTestId } = render(<CanvasComponent />);
      // Select a connector line shape
      const connectorLineButton = screen.getByTestId('connectorLineButton');
      fireEvent.click(connectorLineButton);
  
      // Rotate the selected shape
      const rotateIcon = screen.getByTestId('rotate-icon');
      fireEvent.click(rotateIcon);
  
      // Assert the rotation
      // You need to implement this assertion based on your rotation logic
    });
  
    it('should rotate a bidirectional connector line around its midpoint', () => {
      const { getByTestId } = render(<CanvasComponent />);
      // Select a bidirectional connector line shape
      const bidirectionalConnectorButton = screen.getByTestId('bidirectionalConnectorButton');
      fireEvent.click(bidirectionalConnectorButton);
  
      // Rotate the selected shape
      const rotateIcon = screen.getByTestId('rotate-icon');
      fireEvent.click(rotateIcon);
  
      // Assert the rotation
      // You need to implement this assertion based on your rotation logic
    });
  });


});



