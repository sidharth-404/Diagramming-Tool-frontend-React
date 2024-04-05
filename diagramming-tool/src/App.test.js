

import React from 'react';
import App from './App';

import { render, screen } from '@testing-library/react';
import HomePage from './Component/HomePage/HomePage';

test('renders HomePage component without crashing', () => {
  render(<HomePage/>);})
  
  expect(screen.getByTestId('home-page-container')).toBeInTheDocument();




test('renders App component', () => {
  render(<App />);

});


