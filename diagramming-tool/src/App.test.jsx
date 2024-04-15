import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
describe('App component', () => {
  test('renders homepage by default', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const homePageElement = screen.getByText(/Welcome to Our Diagramming Tool/i);
    expect(homePageElement).toBeInTheDocument();
  });
});