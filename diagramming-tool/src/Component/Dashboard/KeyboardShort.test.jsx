/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CanvasComponent from './Canvas';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

  describe('undo and redo actions using keyboard shortcuts', () => {
    it('undoes action when Ctrl+Z is pressed', () => {
      const { getByTestId } = render(<CanvasComponent />);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{ctrlKey}{z}');
    });
  
    it('redoes action when Ctrl+Y is pressed', () => {
      const { getByTestId } = render(<CanvasComponent />);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{ctrlKey}{y}');
    });
  });

  describe('delete action using keyboard shortcut', () => {
    it('deletes selected shapes when Delete key is pressed', () => {
      const { getByTestId } = render(<CanvasComponent />);
      const canvas = getByTestId('canvas');
  
      userEvent.type(canvas, '{del}');
    });
  });

  describe('copy and paste actions using keyboard shortcuts', () => {
    it('copies selected shapes when Ctrl+C is pressed and pastes them when Ctrl+V is pressed', () => {
      const { getByTestId } = render(<CanvasComponent />);
      const canvas = getByTestId('canvas');
  
    
      userEvent.type(canvas, '{ctrlKey}{c}');
  
     
      userEvent.type(canvas, '{ctrlKey}{v}');
    });
  });