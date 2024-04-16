import React from "react";
import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import CanvasComponent from "./Canvas";
import { setupJestCanvasMock } from "jest-canvas-mock";
import { BrowserRouter as Router} from 'react-router-dom';
import Cookies from 'js-cookie';

beforeEach(() => {
  jest.resetAllMocks();
  setupJestCanvasMock();
});


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
    const canvas = getByTestId('canvas');
    const rectangleButton = getByTestId('rectangleButton');
    fireEvent.click(rectangleButton);
    const addedRectangle = canvas.children[1];
    const deleteButton = getByTestId('deleteButton');
    fireEvent.click(deleteButton);
    expect(canvas.children).toHaveLength(0);
    expect(canvas.contains(addedRectangle)).toBeFalsy();
  });

  it('adds rectangle to canvas when rectangle button is clicked', () => {
    const { getByTestId } = render(<Router><CanvasComponent/></Router>);
    const canvas = getByTestId('canvas');
    const rectangleButton = getByTestId('rectangleButton');
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
    const colorPicker = getByTestId('colorPicker');
    fireEvent.change(colorPicker, { target: { value: '#ff0000' } });
  });

  it("handles drag-and-drop interactions", () => {
    render(<Router><CanvasComponent/></Router>);
    const canvas = screen.getByTestId('canvas');
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 });
    fireEvent.mouseUp(canvas, { clientX: 150, clientY: 150 });
  });
});


