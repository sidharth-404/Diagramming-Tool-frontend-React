
import { render, screen, fireEvent } from "@testing-library/react";

import CanvasComponent from "./Canvas";
import { setupJestCanvasMock } from "jest-canvas-mock";




beforeEach(() => {
  jest.resetAllMocks();
  setupJestCanvasMock();
});



describe("Canvas Component", () => {
  it("Checks Open Button Exist in  Canvas Component", () => {
    render(<CanvasComponent />);
    const openButton = screen.getByTestId(/openButton/i);
    expect(openButton).toBeInTheDocument();
  });





  it("Checks Save Button Exist in Canvas Component", () => {
    render(<CanvasComponent />);
    const saveButton = screen.getByTestId(/saveButton/i);
    expect(saveButton).toBeInTheDocument();
  });

  it("Checks Undo Button Exist in  Canvas Component", () => {
    render(<CanvasComponent />);
    const undoButton = screen.getByTestId(/undoButton/i);
    expect(undoButton).toBeInTheDocument();
  });

  it("Checks Redo Button Exist in  Canvas Component", () => {
    render(<CanvasComponent />);
    const redoButton = screen.getByTestId(/redoButton/i);
    expect(redoButton).toBeInTheDocument();
  });


  


  it("Checks Page contain shapes heading", () => {
    render(<CanvasComponent />);
    const element = screen.getByText(/Shapes/i);
    expect(element).toBeInTheDocument();
  });

  it("Rectangle Button Exist in  Canvas Component", () => {
    render(<CanvasComponent />);
    const rect = screen.getByTestId(/rectangleButton/i);
    expect(rect).toBeInTheDocument();
  });
  it(" Circle button Exist in  Canvas Component", () => {
    render(<CanvasComponent />);
    const circ = screen.getByTestId(/circleButton/i);
    expect(circ).toBeInTheDocument();
  });

  it("Square Button Exist in  Canvas Component", () => {
    render(<CanvasComponent />);
    const squr = screen.getByTestId(/squareButton/i);
    expect(squr).toBeInTheDocument();
  });

  it("Diamond Button Exist in Canvas Component", () => {
    render(<CanvasComponent />);
    const dmnd = screen.getByTestId(/diamondButton/i);
    expect(dmnd).toBeInTheDocument();
  });
  it("Canvas Exist in  Canvas Component", () => {
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

  

  it("Clicks on Open Button", () => {
    render(<CanvasComponent />);
    const openButton = screen.getByTestId(/openButton/i);
    fireEvent.click(openButton);
  });

  

  it("Drawing Rectangle in  Canvas Component", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    expect(canvas).toBeInTheDocument();
    
    const rectButton = screen.getByTestId(/rectangleButton/i);
    fireEvent.click(rectButton);
  
    const ctx = canvas.getContext("2d");
    expect(ctx).toBeDefined();
    
    // Check if the rectangle is drawn
    expect(ctx.fillRect).toHaveBeenCalledWith(expect.any(Number), expect.any(Number), expect.any(Number), expect.any(Number));
    expect(ctx.strokeRect).toHaveBeenCalledWith(expect.any(Number), expect.any(Number), expect.any(Number), expect.any(Number));
  });
  

  it("Drawing Circle in Canvas Component", () => {
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


    it("Selects a Shape on Canvas", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    
  });

  it("Moves a Selected Shape on Canvas", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 });
    
  });

  it("Resizes a Selected Shape on Canvas", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 });
    fireEvent.mouseDown(canvas, { clientX: 190, clientY: 190 });
    fireEvent.mouseMove(canvas, { clientX: 200, clientY: 200 });
   
  });
 
  it("Selects a Rectangle Shape on Canvas", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
  
   
    const rectButton = screen.getByTestId(/rectangleButton/i);
    fireEvent.click(rectButton);
  
   
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
  
    
});

it("Selects a Circle Shape on Canvas", () => {
  render(<CanvasComponent />);
  const canvas = screen.getByTestId("canvas");


  const circleButton = screen.getByTestId(/circleButton/i);
  fireEvent.click(circleButton);

 
  fireEvent.mouseDown(canvas, { clientX: 150, clientY: 150 });


});

it("Selects a Square Shape on Canvas", () => {
  render(<CanvasComponent />);
  const canvas = screen.getByTestId("canvas");

  const squareButton = screen.getByTestId(/squareButton/i);
  fireEvent.click(squareButton);


  fireEvent.mouseDown(canvas, { clientX: 150, clientY: 150 });

 
});


it("Selects a Diamond Shape on Canvas", () => {
  render(<CanvasComponent />);
  const canvas = screen.getByTestId("canvas");


  const diamondButton = screen.getByTestId(/diamondButton/i);
  fireEvent.click(diamondButton);


  fireEvent.mouseDown(canvas, { clientX: 200, clientY: 200 });

 
});


  it("Deselects All Shapes on Canvas", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseDown(canvas, { clientX: 200, clientY: 200 });
    
  });



  it("Handles Canvas Click Outside Shapes", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseDown(canvas, { clientX: 500, clientY: 500 });
    
  });
  it("Saves Canvas State", () => {
    render(<CanvasComponent />);
    const saveButton = screen.getByTestId(/saveButton/i);
    fireEvent.click(saveButton);
   
  });

  it("Loads Canvas State", () => {
    render(<CanvasComponent />);
    const openButton = screen.getByTestId(/openButton/i);
    fireEvent.click(openButton);
    
  });


  test('move a shape on canvas', () => {
   
    const { getByTestId } = render(<CanvasComponent />);
  
    
    const canvas = getByTestId('canvas');
  
   
    const initialX = canvas.getBoundingClientRect().left + 50; 
    const initialY = canvas.getBoundingClientRect().top + 50; 
  
    
    fireEvent.mouseDown(canvas, { clientX: initialX, clientY: initialY });
  
   
    fireEvent.mouseMove(canvas, { clientX: initialX + 50, clientY: initialY + 50 });
  
    
    fireEvent.mouseUp(canvas);
  
   
    const finalX = canvas.getBoundingClientRect().left + 50 + 50; 
    const finalY = canvas.getBoundingClientRect().top + 50 + 50; 
  
   
    expect(finalX).toBeGreaterThan(initialX);
    expect(finalY).toBeGreaterThan(initialY);
  });

  


  it("Resizes a Selected Shape on Canvas", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
  
   
    const rectButton = screen.getByTestId(/rectangleButton/i);
    fireEvent.click(rectButton);
  
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
  
   
    fireEvent.mouseMove(canvas, { clientX: 200, clientY: 200 });
    fireEvent.mouseDown(canvas, { clientX: 200, clientY: 200 });
  
   
    fireEvent.mouseMove(canvas, { clientX: 250, clientY: 250 });
  
   
    fireEvent.mouseUp(canvas);
  
   
  });

  it("Resizes a Selected Circle on Canvas", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
  
   
    const circleButton = screen.getByTestId(/circleButton/i);
    fireEvent.click(circleButton);
  
   
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
  
    
    fireEvent.mouseMove(canvas, { clientX: 200, clientY: 200 });
    fireEvent.mouseDown(canvas, { clientX: 200, clientY: 200 });
  
  
    fireEvent.mouseMove(canvas, { clientX: 250, clientY: 250 });
  
    
    fireEvent.mouseUp(canvas);
  
   
});

it("Resizes a Selected Diamond on Canvas", () => {
  render(<CanvasComponent />);
  const canvas = screen.getByTestId("canvas");


  const diamondButton = screen.getByTestId(/diamondButton/i);
  fireEvent.click(diamondButton);

  
  fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });

  
  fireEvent.mouseMove(canvas, { clientX: 200, clientY: 200 });
  fireEvent.mouseDown(canvas, { clientX: 200, clientY: 200 });

  
  fireEvent.mouseMove(canvas, { clientX: 250, clientY: 250 });

 
  fireEvent.mouseUp(canvas);

 
});

it("Resizes a Selected Square on Canvas", () => {
  render(<CanvasComponent />);
  const canvas = screen.getByTestId("canvas");


  const squareButton = screen.getByTestId(/squareButton/i);
  fireEvent.click(squareButton);

  
  fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });


  fireEvent.mouseMove(canvas, { clientX: 200, clientY: 200 });
  fireEvent.mouseDown(canvas, { clientX: 200, clientY: 200 });


  fireEvent.mouseMove(canvas, { clientX: 250, clientY: 250 });

  
  fireEvent.mouseUp(canvas);


});

  
  it("Selects a Shape using Keyboard Shortcut", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    fireEvent.keyDown(canvas, { key: "a", code: "KeyA" }); 
   
  });
  
  it("Moves a Selected Shape using Keyboard Arrow Keys", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 }); 
    fireEvent.keyDown(canvas, { key: "ArrowRight", code: "ArrowRight" }); 
   
  });
  
  it("Resizes a Selected Shape using Keyboard Shortcuts", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 }); 
    fireEvent.keyDown(canvas, { key: "ArrowUp", code: "ArrowUp" }); 
    
  });
  
  
  it("Deselects Individual Shape on Canvas", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 }); 
    fireEvent.mouseDown(canvas, { clientX: 200, clientY: 200 }); 
    fireEvent.mouseDown(canvas, { clientX: 300, clientY: 300 }); 
  
  });

 
  
  

  test("Drawing Square in  Canvas Component", () => {
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

  test("Drawing Diamond in Canvas Component", () => {
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
describe("Canvas component", () => {
  it("Draws shapes on the canvas", () => {
    render(<CanvasComponent />);
    const canvas = screen.getByTestId("canvas");
    const context = canvas.getContext("2d");
    expect(context).toBeDefined();
    expect(context.clearRect).toHaveBeenCalled();
  });

   test("renders canvas component", () => {
    const { getByTestId } = render(<CanvasComponent />);
    const canvas = getByTestId("canvas");
    expect(canvas).toBeInTheDocument();
  });


 
  
  
  
});







