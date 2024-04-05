
import React from 'react';
import { render, screen, fireEvent, act } from "@testing-library/react";
import CanvasComponent from "./Canvas";
import { setupJestCanvasMock } from "jest-canvas-mock";
import {ShapeTypes} from "./ShapeTypes";
import {updateShapes} from "./Canvas";
import {handleMouseDown} from "./Canvas";




beforeEach(() => {
  jest.resetAllMocks();
  setupJestCanvasMock();
});



describe("Home Page", () => {

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


    

    // test('should update state correctly when canvas is clicked', () => {
    //   // Render the CanvasComponent
    //   const { getByTestId } = render(<CanvasComponent />);
    //   const canvas = getByTestId('canvas');
    
      
    //   fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    
      
    //   const isDragging = true; // Assuming this state gets updated when dragging starts
    //   const dragStartPos = { x: 100, y: 100 }; // Assuming this state gets updated with mouse position on mouse down
    
    //   // Assert that state is updated correctly
    //   expect(isDragging).toBeTruthy();
    //   expect(dragStartPos).toEqual({ x: 100, y: 100 });
    // });


    it('should rotate a line around its midpoint', () => {
      const { getByTestId } = render(<CanvasComponent />);
      
      const lineButton = screen.getByTestId('lineButton');
      fireEvent.click(lineButton);
  
     
      const rotateIcon = screen.getByTestId('rotate-icon');
      fireEvent.click(rotateIcon);
  
   
    });
  
    it('should rotate a connector line around its midpoint', () => {
      const { getByTestId } = render(<CanvasComponent />);
      
      const connectorLineButton = screen.getByTestId('connectorLineButton');
      fireEvent.click(connectorLineButton);
  
      
      const rotateIcon = screen.getByTestId('rotate-icon');
      fireEvent.click(rotateIcon);
  

    });
  
    it('should rotate a bidirectional connector line around its midpoint', () => {
      const { getByTestId } = render(<CanvasComponent />);
    
      const bidirectionalConnectorButton = screen.getByTestId('bidirectionalConnectorButton');
      fireEvent.click(bidirectionalConnectorButton);
  
     
      const rotateIcon = screen.getByTestId('rotate-icon');
      fireEvent.click(rotateIcon);
  

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

      it("selects a line on canvas click", () => {
        render(<CanvasComponent />);
        const canvas = screen.getByTestId("canvas");
        const lineButton = screen.getByTestId("lineButton");
       
        fireEvent.click(lineButton);
       
        fireEvent.click(canvas, { nativeEvent: { offsetX: 100, offsetY: 100 } });
        const selectedLine = screen.getByTestId("lineButton");
        expect(selectedLine).toBeInTheDocument();
      });
      
      it("selects a connector line on canvas click", () => {
        render(<CanvasComponent />);
        const canvas = screen.getByTestId("canvas");
        const connectorLineButton = screen.getByTestId("connectorLineButton");
       
        fireEvent.click(connectorLineButton);
       
        fireEvent.click(canvas, { nativeEvent: { offsetX: 100, offsetY: 100 } });
        const selectedConnectorLine = screen.getByTestId("connectorLineButton");
        expect(selectedConnectorLine).toBeInTheDocument();
      });
      

      it("selects a bidirectionalconnector line on canvas click", () => {
        render(<CanvasComponent />); 
        const canvas=screen.getByTestId("canvas");
        const bidirectionalConnectorButton = screen.getByTestId("bidirectionalConnectorButton"); 
        fireEvent.click(bidirectionalConnectorButton); 
        fireEvent.click(canvas, { nativeEvent: { offsetX: 100, offsetY: 100 } });
        const selectedBidirectionalConnectorLine = screen.getByTestId("bidirectionalConnectorButton");

        expect(selectedBidirectionalConnectorLine).toBeInTheDocument();
      });

      

      
  });
  

  });
  
  describe('Canvas mouse events', () => {
    it('updates selected shape on mouse down event', () => {
      const { getByTestId } = render(<CanvasComponent />);
      const canvas = screen.getByTestId('canvas');
  
      // Simulate mouse down event
      fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
  
      // Add your assertions here to verify the selected shape and other states
    });
  
    it('updates dragging state and position on mouse move event', () => {
      const { getByTestId } = render(<CanvasComponent />);
      const canvas = screen.getByTestId('canvas');
  
      // Simulate mouse move event
      fireEvent.mouseMove(canvas, { clientX: 110, clientY: 110 });
  
      // Add your assertions here to verify the dragging state, drag start position, and drag offset
    });
  
    it('resets dragging state and position on mouse up event', () => {
      const { getByTestId } = render(<CanvasComponent />);
      const canvas = screen.getByTestId('canvas');
  
      // Simulate mouse up event
      fireEvent.mouseUp(canvas);
  
      // Add your assertions here to verify the dragging state, drag start position, and drag offset
    });
    it('updates selected shape on mouse down event with shift key', () => {
      const { getByTestId } = render(<CanvasComponent />);
      const canvas = screen.getByTestId('canvas');
      
      // Simulate mouse down event with shift key
      fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100, shiftKey: true });
    
      // Add assertions to verify the selected shape and other states
    });
    
   
    
    it('does not update selected shape on mouse down event if shape not found', () => {
      const { getByTestId } = render(<CanvasComponent />);
      const canvas = screen.getByTestId('canvas');
      
      // Simulate mouse down event at a position where no shape exists
      fireEvent.mouseDown(canvas, { clientX: 500, clientY: 500 });
    
      // Add assertions to verify that selected shape remains unchanged
    });

    it('updates shapes on mouse move event', () => {
      // Render the CanvasComponent with real data
      const { getByTestId } = render(<CanvasComponent />); // You might need to pass additional props if required
  
      // Get the canvas element
      const canvas = screen.getByTestId('canvas');
  
   
      fireEvent.mouseMove(canvas, { clientX: 20, clientY: 20 });
  

    });
   
  });
  // describe('Mouse down event handling on canvas', () => {
  //   const handleMouseDown = jest.fn();
  
  //   test('Calls handleMouseDown when clicking on a shape within range', () => {
  //     const shapes = [
  //       { type: ShapeTypes.CONNECTOR_LINE, startX: 0, endX: 10, startY: 0, endY: 10, id: 1 },
  //       { type: ShapeTypes.BIDIRECTIONAL_CONNECTOR, startX: 20, endX: 30, startY: 20, endY: 30, id: 2 },
  //       { type: ShapeTypes.LINE, startX: 40, endX: 50, startY: 40, endY: 50, id: 3 },
  //     ];
  
  //     const canvasMock = document.createElement('canvas');
  //     canvasMock.getBoundingClientRect = jest.fn(() => ({ left: 0, top: 0 }));
  //     const { getByTestId } = render(<CanvasComponent canvasRef={{ current: canvasMock }} shapes={shapes} handleMouseDown={handleMouseDown} />);
  
  //     const x = 5;
  //     const y = 5;
  
  //     const canvas = screen.getByTestId('canvas');
  
  //     fireEvent.mouseDown(canvas, { clientX: x, clientY: y });
  
  //     expect(handleMouseDown).toHaveBeenCalledWith({}, 1); // Expect handleMouseDown to be called with shape id 1
  //   });
  
    // test('Does not call handleMouseDown when clicking outside of all shapes', () => {
    //   const shapes = [
    //     { type: ShapeTypes.CONNECTOR_LINE, startX: 0, endX: 10, startY: 0, endY: 10, id: 1 },
    //     { type: ShapeTypes.BIDIRECTIONAL_CONNECTOR, startX: 20, endX: 30, startY: 20, endY: 30, id: 2 },
    //     { type: ShapeTypes.LINE, startX: 40, endX: 50, startY: 40, endY: 50, id: 3 },
    //   ];
  
    //   const canvasMock = document.createElement('canvas');
    //   canvasMock.getBoundingClientRect = jest.fn(() => ({ left: 0, top: 0 }));
    //   const { getByTestId } = render(<CanvasComponent canvasRef={{ current: canvasMock }} shapes={shapes} handleMouseDown={handleMouseDown} />);
  
    //   const x = 100;
    //   const y = 100;
  
    //   const canvas = screen.getByTestId('canvas');
  
    //   fireEvent.mouseDown(canvas, { clientX: x, clientY: y });
  
    //   expect(handleMouseDown).not.toHaveBeenCalled(); // Expect handleMouseDown not to be called
    // });
  });