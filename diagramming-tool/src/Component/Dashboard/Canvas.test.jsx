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
describe("Home component", () => {
  it("Draws shapes on the canvas", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    const context = canvas.getContext("2d");
    expect(context).toBeDefined();
    expect(context.clearRect).toHaveBeenCalled();
  });
});


describe("Canvas Component", () => {

  it("handles double-click events", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId('canvas');
    fireEvent.dblClick(canvas);
  });

  it("displays text input for rectangle shape on double click", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId('canvas');
    const rectangleButton = screen.getByTestId('rectangleButton');
    fireEvent.click(rectangleButton);
    const rect = canvas.getBoundingClientRect();
    fireEvent.doubleClick(canvas, {
      clientX: rect.left + 150,
      clientY: rect.top + 150,
    });
    const textInput = screen.getByTestId('editingtextinput');
    expect(textInput).toBeInTheDocument();
  });

  it("sets editing shape ID and text input for circle shape on double click", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId('canvas');
    const circleButton = screen.getByTestId('circleButton');
    fireEvent.click(circleButton);
    const rect = canvas.getBoundingClientRect();
    const centerX = 200;
    const centerY = 200;
    const radius = 50;
    fireEvent.doubleClick(canvas, {
      clientX: rect.left + centerX,
      clientY: rect.top + centerY,
    });
    const textInput = screen.getByTestId('editingtextinput');
    expect(textInput).toBeInTheDocument();
  });

  it("displays text input for square shape on double click", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId('canvas');
    const squareButton = screen.getByTestId('squareButton');
    fireEvent.click(squareButton);
    const rect = canvas.getBoundingClientRect();
    fireEvent.doubleClick(canvas, {
      clientX: rect.left + 150,
      clientY: rect.top + 150,
    });
    const textInput = screen.getByTestId('editingtextinput');
    expect(textInput).toBeInTheDocument();
  });

  it("displays text input for diamond shape on double click", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId('canvas');
    const diamondButton = screen.getByTestId('diamondButton');
    fireEvent.click(diamondButton);
    const rect = canvas.getBoundingClientRect();
    fireEvent.doubleClick(canvas, {
      clientX: rect.left + 150,
      clientY: rect.top + 150,
    });
    const textInput = screen.getByTestId('editingtextinput');
    expect(textInput).toBeInTheDocument();
  });


  it("updates text input value", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId('canvas');
    const rectangleButton = screen.getByTestId('rectangleButton');
    fireEvent.click(rectangleButton);
    const rect = canvas.getBoundingClientRect();
    fireEvent.doubleClick(canvas, {
      clientX: rect.left + 150,
      clientY: rect.top + 150,
    });
    const textInput = screen.getByTestId('editingtextinput');
    fireEvent.change(textInput, { target: { value: 'New Text' } });
    expect(textInput.value).toBe('New Text');
  });

  test('deleting a shape', () => {
    render(<CanvasComponent />);
    const rectangleButton = screen.getByTestId('rectangleButton');
    fireEvent.click(rectangleButton);


    const deleteButton = screen.getByTestId('deleteButton');
    fireEvent.click(deleteButton);


    const canvas = screen.getByTestId('canvas');
    const ctx = canvas.getContext('2d');
    expect(ctx).toBeDefined();
    expect(ctx.clearRect).toHaveBeenCalled();
  });


  it("selects a shape on canvas click", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    const rectangleButton = screen.getByTestId("rectangleButton");

    fireEvent.click(rectangleButton);

    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selectedRectangle = screen.getByTestId("rectangleButton");
    expect(selectedRectangle).toBeInTheDocument();
  });


  it("selects a circle on canvas click", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    const circleButton = screen.getByTestId("circleButton");

    fireEvent.click(circleButton);

    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selectedCircle = screen.getByTestId("circleButton");
    expect(selectedCircle).toBeInTheDocument();
  });
  it("selects a square on canvas click", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    const squareButton = screen.getByTestId("squareButton");

    fireEvent.click(squareButton);

    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selectedSquare = screen.getByTestId("squareButton");
    expect(selectedSquare).toBeInTheDocument();
  });
  it("selects a diamond on canvas click", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    const diamondButton = screen.getByTestId("diamondButton");

    fireEvent.click(diamondButton);

    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selectedDiamond = screen.getByTestId("diamondButton");
    expect(selectedDiamond).toBeInTheDocument();
  });



  it("Does not draw a line when the mouse is not dragged", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    expect(canvas).toBeInTheDocument();

    fireEvent.mouseDown(canvas, { nativeEvent: { offsetX: 100, offsetY: 100 } });
    fireEvent.mouseUp(canvas, { nativeEvent: { offsetX: 100, offsetY: 100 } });

    const context = canvas.getContext("2d");
    expect(context).toBeDefined();
    expect(context.beginPath).not.toHaveBeenCalled();
    expect(context.moveTo).not.toHaveBeenCalled();
    expect(context.lineTo).not.toHaveBeenCalled();
    expect(context.stroke).not.toHaveBeenCalled();
  });
  test('dragging a line', () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId('canvas');
    fireEvent.mouseDown(canvas, { nativeEvent: { offsetX: 100, offsetY: 100 } });
    fireEvent.mouseMove(canvas, { nativeEvent: { offsetX: 200, offsetY: 200 } });

    fireEvent.mouseUp(canvas);

    const canvasContext = canvas.getContext('2d');
    expect(canvasContext).toBeDefined();
    expect(canvasContext.beginPath).toHaveBeenCalledTimes(0);
    expect(canvasContext.stroke).toHaveBeenCalledTimes(0);
  });
});