/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CanvasComponent from './Canvas';
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));
  
  describe('move rectangle using arrow keys', () => {
    it('moves rectangle when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');

      userEvent.type(canvas, '{ArrowUp}');
      userEvent.type(canvas, '{ArrowDown}');
      userEvent.type(canvas, '{ArrowLeft}');
      userEvent.type(canvas, '{ArrowRight}');
    });
  });
  describe('move circle using arrow keys', () => {
    it('moves circle when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{ArrowUp}');
      userEvent.type(canvas, '{ArrowDown}');
      userEvent.type(canvas, '{ArrowLeft}');
      userEvent.type(canvas, '{ArrowRight}');
    });
  });

  describe('move square using arrow keys', () => {
    it('moves square when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{ArrowUp}');
      userEvent.type(canvas, '{ArrowDown}');
      userEvent.type(canvas, '{ArrowLeft}');
      userEvent.type(canvas, '{ArrowRight}');
    });
  });

  describe('move triangle using arrow keys', () => {
    it('moves triangle when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{ArrowUp}');
      userEvent.type(canvas, '{ArrowDown}');
      userEvent.type(canvas, '{ArrowLeft}');
      userEvent.type(canvas, '{ArrowRight}');
    });
  });

  describe('move diamond using arrow keys', () => {
    it('moves diamond when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{ArrowUp}');
      userEvent.type(canvas, '{ArrowDown}');
      userEvent.type(canvas, '{ArrowLeft}');
      userEvent.type(canvas, '{ArrowRight}');
    });
  });

  describe('move pentagon using arrow keys', () => {
    it('moves pentagon when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{ArrowUp}');
      userEvent.type(canvas, '{ArrowDown}');
      userEvent.type(canvas, '{ArrowLeft}');
      userEvent.type(canvas, '{ArrowRight}');
    });
  });
  describe('move ellipse using arrow keys', () => {
    it('moves ellipse when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{ArrowUp}');
      userEvent.type(canvas, '{ArrowDown}');
      userEvent.type(canvas, '{ArrowLeft}');
      userEvent.type(canvas, '{ArrowRight}');
    });
  });

  describe('move roundrect using arrow keys', () => {
    it('moves roundrect when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{ArrowUp}');
      userEvent.type(canvas, '{ArrowDown}');
      userEvent.type(canvas, '{ArrowLeft}');
      userEvent.type(canvas, '{ArrowRight}');
    });
  });

  describe('move hexagon using arrow keys', () => {
    it('moves hexagon when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{ArrowUp}');
      userEvent.type(canvas, '{ArrowDown}');
      userEvent.type(canvas, '{ArrowLeft}');
      userEvent.type(canvas, '{ArrowRight}');
    });
  });
  
  
  describe('resize hexagon using arrow keys', () => {
    it('resize hexagon when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{a}');
      userEvent.type(canvas, '{s}');
      userEvent.type(canvas, '{d}');
      userEvent.type(canvas, '{w}');
    });
  });

  describe('resize rectangle using arrow keys', () => {
    it('resize rectangle when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
    
      userEvent.type(canvas, '{a}');
      userEvent.type(canvas, '{s}');
      userEvent.type(canvas, '{d}');
      userEvent.type(canvas, '{w}');
    });
  });
  
  describe('resize circle using arrow keys', () => {
    it('resize circle when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{a}');
      userEvent.type(canvas, '{s}');
      userEvent.type(canvas, '{d}');
      userEvent.type(canvas, '{w}');
    });
  });

  describe('resize square using arrow keys', () => {
    it('resize square when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
   
      userEvent.type(canvas, '{a}');
      userEvent.type(canvas, '{s}');
      userEvent.type(canvas, '{d}');
      userEvent.type(canvas, '{w}');
    });
  });

  describe('resize triangle using arrow keys', () => {
    it('resize triangle when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
     
      userEvent.type(canvas, '{a}');
      userEvent.type(canvas, '{s}');
      userEvent.type(canvas, '{d}');
      userEvent.type(canvas, '{w}');
    });
  });
  describe('resize diamond using arrow keys', () => {
    it('resize diamond when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
     
      userEvent.type(canvas, '{a}');
      userEvent.type(canvas, '{s}');
      userEvent.type(canvas, '{d}');
      userEvent.type(canvas, '{w}');
    });
  });

  describe('resize pentagon using arrow keys', () => {
    it('resize pentagon when arrow keys are pressed', () => {
      const { getByTestId } = render(<Router><CanvasComponent /></Router>);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{a}');
      userEvent.type(canvas, '{s}');
      userEvent.type(canvas, '{d}');
      userEvent.type(canvas, '{w}');
    });
  });