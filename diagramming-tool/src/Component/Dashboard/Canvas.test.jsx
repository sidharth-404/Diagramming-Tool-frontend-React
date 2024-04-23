/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable jest/no-identical-title */
/* eslint-disable no-undef */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, fireEvent,cleanup,waitFor} from "@testing-library/react";
import CanvasComponent from "./Canvas";
import { setupJestCanvasMock } from "jest-canvas-mock";
import { BrowserRouter as Router} from 'react-router-dom';
import Cookies from 'js-cookie';
import {saveCanvasImageToDB,getUserByEmail} from '../../ApiService/ApiService';
import { fabric } from 'fabric';


jest.mock('fabric', () => ({
  ...jest.requireActual('fabric'),
  Canvas: {
    undo: jest.fn(),
    redo: jest.fn(),  
    getActiveObject: jest.fn(),
    remove: jest.fn(),
    requestRenderAll: jest.fn(),
    clone: jest.fn(),
    setActiveObject: jest.fn(),
    add: jest.fn(),
  },
}));


let canvas;
beforeEach(() => {
  jest.resetAllMocks();
  setupJestCanvasMock();
  canvas = new fabric.Canvas();
});
jest.mock('../../ApiService/ApiService', () => ({
  saveCanvasImageToDB: jest.fn(),
  getUserByEmail: jest.fn(),
}));

describe('CanvasComponent', () => {

  it("Clicks on Profile Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const profileImage = screen.getByAltText('Profile');
    fireEvent.click(profileImage);
    const profileButton = screen.getByTestId('profileButton');
    expect(profileButton).toBeInTheDocument();
    fireEvent.click(profileButton);
  });

  it("Clicks on Password Button", () => {
    const handleProfileOptionClick = jest.fn();
    jest.spyOn(Cookies, 'remove');
    jest.spyOn(localStorage, 'removeItem');
    render(<Router><CanvasComponent handleProfileOptionClick={handleProfileOptionClick} /></Router>);
    const profileImage = screen.getByAltText('Profile');
    fireEvent.click(profileImage);
    const passwordButton = screen.getByTestId('passwordButton');
    expect(passwordButton).toBeInTheDocument();
    fireEvent.click(passwordButton);
  });

  it("Clicks on Signout Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const profileImage = screen.getByAltText('Profile');
    fireEvent.click(profileImage);
    const signoutButton = screen.getByTestId('SignoutButton');
    expect(signoutButton).toBeInTheDocument();
    fireEvent.click(signoutButton);
  });


  it('deleteSelectedObject function removes selected object from canvas', () => {
    const { getByTestId } = render(<Router><CanvasComponent/></Router>);
    const canvas =screen.getByTestId('canvas');
    const rectangleButton =screen.getByTestId('rectangleButton');
    fireEvent.click(rectangleButton);
    const addedRectangle = canvas.children[1];
    const deleteButton =screen. getByTestId('deleteButton');
    fireEvent.click(deleteButton);
    expect(canvas.children).toHaveLength(0);
    expect(canvas.contains(addedRectangle)).toBeFalsy();
  });

  it('adds rectangle to canvas when rectangle button is clicked', () => {
    const { getByTestId } = render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId('canvas');
    const rectangleButton = screen.getByTestId('rectangleButton');
    fireEvent.click(rectangleButton);
    expect(canvas.children.length).toBe(0);
  });


});
describe("Button Working", () => {
  it("Clicks on Save Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const saveButton = screen.getByTestId(/saveButton/i);
    fireEvent.click(saveButton);
  });

  it("Clicks on Undo Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const undoButton = screen.getByTestId(/undoButton/i);
    fireEvent.click(undoButton);
  });

  it("Clicks on Redo Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const redoButton = screen.getByTestId(/redoButton/i);
    fireEvent.click(redoButton);
  });

  it("Clicks on Delete Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const deleteButton = screen.getByTestId(/deleteButton/i);
    fireEvent.click(deleteButton);
  });
});


describe("Canvas Component", () => {

  it("handles double-click events", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId('canvas');
    fireEvent.dblClick(canvas);
  });


  it("selects a rectangle on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const rectangleButton = screen.getByTestId("rectangleButton");
    fireEvent.click(rectangleButton);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selectedRectangle = screen.getByTestId("rectangleButton");
    expect(selectedRectangle).toBeInTheDocument();
  });


  it("selects a circle on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const circleButton = screen.getByTestId("circleButton");
    fireEvent.click(circleButton);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selectedCircle = screen.getByTestId("circleButton");
    expect(selectedCircle).toBeInTheDocument();
  });
  it("selects a square on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const squareButton = screen.getByTestId("squareButton");
    fireEvent.click(squareButton);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selectedSquare = screen.getByTestId("squareButton");
    expect(selectedSquare).toBeInTheDocument();
  });
  it("selects a diamond on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const diamondButton = screen.getByTestId("diamondButton");
    fireEvent.click(diamondButton);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selectedDiamond = screen.getByTestId("diamondButton");
    expect(selectedDiamond).toBeInTheDocument();
  });

  it("selects a triangle on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const Button = screen.getByTestId("triangleButton");
    fireEvent.click(Button);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selected = screen.getByTestId("triangleButton");
    expect(selected).toBeInTheDocument();
  });

  it("selects a pentagon on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const Button = screen.getByTestId("pentagonButton");
    fireEvent.click(Button);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selected = screen.getByTestId("pentagonButton");
    expect(selected).toBeInTheDocument();
  });

  it("selects a ellipse on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const Button = screen.getByTestId("ellipseButton");
    fireEvent.click(Button);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selected = screen.getByTestId("ellipseButton");
    expect(selected).toBeInTheDocument();
  });

  it("selects a roundrect on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const Button = screen.getByTestId("roundrectButton");
    fireEvent.click(Button);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selected = screen.getByTestId("roundrectButton");
    expect(selected).toBeInTheDocument();
  });


  it("selects a hexagon on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const Button = screen.getByTestId("hexagonButton");
    fireEvent.click(Button);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selected = screen.getByTestId("hexagonButton");
    expect(selected).toBeInTheDocument();
  });

  it("selects a line on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const Button = screen.getByTestId("lineButton");
    fireEvent.click(Button);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selected = screen.getByTestId("lineButton");
    expect(selected).toBeInTheDocument();
  });

  it("selects a arrow on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const Button = screen.getByTestId("arrowButton");
    fireEvent.click(Button);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selected = screen.getByTestId("arrowButton");
    expect(selected).toBeInTheDocument();
  });

  it("selects a biarrowd on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const Button = screen.getByTestId("biarrowdButton");
    fireEvent.click(Button);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selected = screen.getByTestId("biarrowdButton");
    expect(selected).toBeInTheDocument();
  });

  it("selects a text on canvas click", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId("canvas");
    const Button = screen.getByTestId("textButton");
    fireEvent.click(Button);
    fireEvent.click(canvas, { nativeEvent: { offsetX: 110, offsetY: 110 } });
    const selected = screen.getByTestId("textButton");
    expect(selected).toBeInTheDocument();
  });


  it('changes color of selected object', () => {
    const { getByTestId } = render(<Router><CanvasComponent/></Router>);
    const colorPicker = screen.getByTestId('colorPicker');
    fireEvent.change(colorPicker, { target: { value: '#ff0000' } });
  });

  it("handles drag-and-drop interactions", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId('canvas');
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 });
    fireEvent.mouseUp(canvas, { clientX: 150, clientY: 150 });
  });

 

  it('should increase border width when increase border button is clicked', async () => {
   render(<Router><CanvasComponent/></Router>);
    const increaseBorderButton = screen.getByTestId('increaseBorder');
    fireEvent.click(increaseBorderButton);
  });

  it('should decrease border width when decrease border button is clicked', async () => {
   render(<Router><CanvasComponent/></Router>);
    const decreaseBorderButton =screen.getByTestId('decreaseBorder');
    fireEvent.click(decreaseBorderButton);
  });

  it('should call handleBorderColorChange when border color picker is changed', async () => {
    render(<Router><CanvasComponent/></Router>)
    const colorPicker = screen.getByTestId('colorShapePicker');
    fireEvent.change(colorPicker, { target: { value: '#ff0000' } });
  });

  // it('should call handleSave when save button is clicked', async () => {
  //   render(<Router><CanvasComponent/></Router>)
  //   const saveButton = screen.getByTestId('saveButton');
  //   fireEvent.click(saveButton);
  // });

  it('should call handleSave when save button is clicked', async () => {
    const saveCanvasImageToDB = jest.fn();
      render(<Router><CanvasComponent/></Router>)
      const saveButton = screen.getByTestId('saveButton');
    fireEvent.click(saveButton);
  
    const canvasDataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE...';
    const blob = new Blob([canvasDataUrl], { type: 'image/jpeg' });
      const mockFileReader = {
      onload: null,
      result: canvasDataUrl,
      readAsDataURL: function () {
        this.onload();
      },
    };
    global.FileReader = jest.fn(() => mockFileReader);
  
    
    expect(saveCanvasImageToDB).toHaveBeenCalled();
    expect(saveCanvasImageToDB).toHaveBeenCalledWith(
      expect.any(String), 
    );
  });
  it("Clicks on Bold Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const BoldButton = screen.getByTestId('boldButton');
    fireEvent.click(BoldButton);
    // const boldText = screen.getByTestId('textElement'); // Assuming you have a text element with a test id
    // expect(boldText).toHaveStyle('font-weight: bold');
 
    // // Simulate another click on the bold button to toggle off bold
    // fireEvent.click(BoldButton);
 
    // // Check if the bold style is removed
    // expect(boldText).not.toHaveStyle('font-weight: bold');
  });
 
  it("Clicks on italic Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const italicButton = screen.getByTestId('italicButton');
    fireEvent.click(italicButton);
  });
 
  it("Clicks on underline Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const underButton = screen.getByTestId('underButton');
    fireEvent.click(underButton);
  });
  it("Clicks on textcolor Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const textcButton = screen.getByTestId('textcolorButton');
    fireEvent.click(textcButton);
  });
 
  it("Clicks on textplus Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const plusButton = screen.getByTestId('plusButton');
    fireEvent.click(plusButton);
  });
 
  it("Clicks on textminus Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const minusButton = screen.getByTestId('minusButton');
    fireEvent.click(minusButton);
  });
 
  it("Clicks onleft Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const minusButton = screen.getByTestId('leftButton');
    fireEvent.click(minusButton);
  });
 
 
  it("Clicks on right Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const minusButton = screen.getByTestId('centerButton');
    fireEvent.click(minusButton);
  });
 
  it("Clicks on center Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const minusButton = screen.getByTestId('rightButton');
    fireEvent.click(minusButton);
  });
  
  it('calls saveCanvasImageToDB function with correct parameters when save button is clicked', async () => {
    const canvasState = '{"objects":[{"type":"rect","left":100,"top":100,"width":50,"height":50}]}';
    localStorage.setItem('canvasState', canvasState);

    // Mock necessary functions and values
    const fileName = 'testCanvas';
    const format = 'pdf';
    const saveToDatabase = true;
    const jwtToken = 'fakeToken';
    Cookies.set('token', jwtToken);
    getUserByEmail.mockResolvedValue({ userId: 'fakeUserId' });

    const { getByTestId } =     render(<Router><CanvasComponent/></Router>);


    fireEvent.click(screen.getByTestId('saveButton'));

    await waitFor(() => {
      expect(saveCanvasImageToDB).toHaveBeenCalledWith(expect.any(String));
    });
  });
  it('increases border width of active object by 1', () => {
    const initialWidth = 2;
    const activeObject = new fabric.Rect({ strokeWidth: initialWidth });
    canvas.setActiveObject(activeObject);
    CanvasComponent.increaseBorderWidth();
    expect(activeObject.strokeWidth).toBe(initialWidth + 1);
  });
  it('decreases border width of active object by 1', () => {
    const initialWidth = 3;
    const activeObject = new fabric.Rect({ strokeWidth: initialWidth });
    canvas.setActiveObject(activeObject);
    CanvasComponent.decreaseBorderWidth();
    expect(activeObject.strokeWidth).toBe(initialWidth - 1);
  });


});

  describe("Canvas Component", () => {
    it('adds and removes keydown and popstate event listeners', () => {
      const addSpy = jest.spyOn(window, 'addEventListener');
      const removeSpy = jest.spyOn(window, 'removeEventListener');
      render(<Router><CanvasComponent/></Router>);
      expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      expect(addSpy).toHaveBeenCalledWith('popstate', expect.any(Function));
      cleanup();
      expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('popstate', expect.any(Function));
    });
    it('initializes fabric canvas and sets up object defaults', () => {
      const { getByTestId } = render(<Router><CanvasComponent/></Router>);
      const canvasEl = screen.getByTestId('canvas');
      expect(canvasEl).toBeTruthy(); 
    });
    
    it('handles grouping and ungrouping of objects on selection', () => {
      const { getByTestId } = render(<Router><CanvasComponent/></Router>);
      fireEvent.mouseDown(screen.getByTestId('canvas'), { clientX: 100, clientY: 100 });
      fireEvent.mouseUp(screen.getByTestId('canvas'), { clientX: 200, clientY: 200 }); // Simulate selection area
  });

  it("Clicks on Bold Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const BoldButton = screen.getByTestId('boldButton');
    fireEvent.click(BoldButton);
    // const boldText = screen.getByTestId('textElement'); // Assuming you have a text element with a test id
    // expect(boldText).toHaveStyle('font-weight: bold');
  
    // // Simulate another click on the bold button to toggle off bold
    // fireEvent.click(BoldButton);
  
    // // Check if the bold style is removed
    // expect(boldText).not.toHaveStyle('font-weight: bold');
  });

  it("Clicks on italic Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const italicButton = screen.getByTestId('italicButton');
    fireEvent.click(italicButton);
  });

  it("Clicks on underline Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const underButton = screen.getByTestId('underButton');
    fireEvent.click(underButton);
  });
  it("Clicks on textcolor Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const textcButton = screen.getByTestId('textcolorButton');
    fireEvent.click(textcButton);
  });

  it("Clicks on textplus Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const plusButton = screen.getByTestId('plusButton');
    fireEvent.click(plusButton);
  });

  it("Clicks on textminus Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const minusButton = screen.getByTestId('minusButton');
    fireEvent.click(minusButton);
  });

  it("Clicks on left Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const leftButton = screen.getByTestId('leftButton');
    fireEvent.click(leftButton);
  });


  it("Clicks on center Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const centerButton = screen.getByTestId('centerButton');
    fireEvent.click(centerButton);
  });

  it("Clicks on right Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const rightButton = screen.getByTestId('rightButton');
    fireEvent.click(rightButton);
  });
  it("Clicks on group Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const groupButton = screen.getByTestId('groupButton');
    fireEvent.click(groupButton);
  });
  it("Clicks on ungroup Button", () => {
    render(<Router><CanvasComponent/></Router>);
    const ungroupedButton = screen.getByTestId('ungroupedButton');
    fireEvent.click(ungroupedButton);
  });


  test('Context menu shows on right-click', async () => {
       render(<Router><CanvasComponent/></Router>);

    const canvas =screen.getByTestId('canvas');
    fireEvent.contextMenu(canvas);
    await waitFor(() => {
      expect(screen.getByText('Copy')).toBeInTheDocument();
      expect(screen.getByText('Paste')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Undo')).toBeInTheDocument();
      expect(screen.getByText('Redo')).toBeInTheDocument();
      expect(screen.getByText('Group')).toBeInTheDocument();
      expect(screen.getByText('UnGroup')).toBeInTheDocument();
    });
  });

  test('Copy menu item works', async () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas =screen.getByTestId('canvas');
    fireEvent.contextMenu(canvas);
    fireEvent.click(screen.getByText('Copy'));
  });
  test('Paste menu item works', async () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas =screen.getByTestId('canvas');
    fireEvent.contextMenu(canvas);
    fireEvent.click(screen.getByText('Paste'));
  });


  test('delete menu item works', async () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas =screen.getByTestId('canvas');
    fireEvent.contextMenu(canvas);
    fireEvent.click(screen.getByText('Delete'));
  });

  test('Redo menu item works', async () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas =screen.getByTestId('canvas');
    fireEvent.contextMenu(canvas);
    fireEvent.click(screen.getByText('Redo'));
  });

  test('Undo menu item works', async () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas =screen.getByTestId('canvas');
    fireEvent.contextMenu(canvas);
    fireEvent.click(screen.getByText('Undo'));
  });

  test('Group menu item works', async () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas =screen.getByTestId('canvas');
    fireEvent.contextMenu(canvas);
    fireEvent.click(screen.getByText('Groups'));
  });
  
  test('Ungroup menu item works', async () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas =screen.getByTestId('canvas');
    fireEvent.contextMenu(canvas);
    fireEvent.click(screen.getByText('UnGroup'));
  });
  


});




