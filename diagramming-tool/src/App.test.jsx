import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
describe('App component', () => {
  test('renders homepage by default', () => {
    render(<App />);
    const homePageElement = screen.getByText(/Welcome to Our Diagramming Tool/i);
    expect(homePageElement).toBeInTheDocument();
  });
});
