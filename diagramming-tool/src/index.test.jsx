import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import { screen } from '@testing-library/react';
import App from './App';
 
let container = null;
 
beforeEach(() => {
  // Setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});
 
afterEach(() => {
  // Cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
 
test('renders the App component', () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    render(<App />, container);
  });
 
  // Expect the header title to be present
  expect(screen.getByText(/Welcome to Our Diagramming Tool/i)).toBeInTheDocument();
});