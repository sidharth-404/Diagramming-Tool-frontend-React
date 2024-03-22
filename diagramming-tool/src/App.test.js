/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
// import React from 'react';


// import React from 'react';
// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import App from './App';

// test('renders login form with input fields', async () => {
//   render(<App />);
  
  
//   await waitFor(() => {
//     expect(screen.getByText('Login Here')).toBeInTheDocument();
//   });

  
//   expect(screen.getByPlaceholderText('Enter your email here')).toBeInTheDocument();
//   expect(screen.getByPlaceholderText('Enter your password here')).toBeInTheDocument();
//   expect(screen.getByText('Sign In')).toBeInTheDocument();
// });

// test('validates email and password on form submission', async () => {
//   render(<App />);
  
//   await waitFor(() => {
//     expect(screen.getByText('Login Here')).toBeInTheDocument();
//   });

//   const signInButton = screen.getByText('Sign In');

//   // Submit form without entering anything
//   fireEvent.click(signInButton);

//   // Expect error messages for both email and password
//   expect(screen.getByText((content, element) => {
//     return content.startsWith('Please enter your') && element.tagName.toLowerCase() === 'div';
//   })).toBeInTheDocument();

//   // Enter email and password
//   const emailInput = screen.getByPlaceholderText('Enter your email here');
//   const passwordInput = screen.getByPlaceholderText('Enter your password here');
//   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//   fireEvent.change(passwordInput, { target: { value: 'password123' } });

//   // Submit form again
//   fireEvent.click(signInButton);

//   // Expect no error messages
//   expect(screen.queryByText('Please enter your email.')).not.toBeInTheDocument();
//   expect(screen.queryByText('Please enter your password.')).not.toBeInTheDocument();
// });

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
});







