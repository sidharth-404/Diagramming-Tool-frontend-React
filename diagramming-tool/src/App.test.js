// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
// import React from 'react';
// import { render, screen } from '@testing-library/react'; // Import screen

// import App from './App';

// test('renders App component', () => {
//   render(<App />);
//   const appElement = screen.getByText(/Diagramming Tool/i);
//   expect(appElement).toBeInTheDocument();
// });
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders App component', () => {
//   render(<App />);
//   // Assert that the component renders the title from the HomePage component
//   expect(screen.getByText('Welcome to Our Diagramming Tool')).toBeInTheDocument();
// });
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import HomePage from './HomePage';

// test('renders HomePage component without crashing', () => {
//   render(<HomePage />);
//   // Assert that the component renders without crashing
//   expect(screen.getByTestId('home-page-container')).toBeInTheDocument();
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './Component/HomePage/HomePage'; // Corrected import path

test('renders HomePage component without crashing', () => {
  render(<HomePage/>);
  // Assert that the component renders without crashing
  expect(screen.getByTestId('home-page-container')).toBeInTheDocument();
});
