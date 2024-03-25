// import React from 'react';
// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import LoginPage from './LoginPage'

// test('renders login form with input fields', async () => {
//   render(<LoginPage />);
  
  
//   await waitFor(() => {
//     expect(screen.getByText('Login Here')).toBeInTheDocument();
//   });



  
//   expect(screen.getByPlaceholderText('Enter your email here')).toBeInTheDocument();
//   expect(screen.getByPlaceholderText('Enter your password here')).toBeInTheDocument();
//   expect(screen.getByText('Sign In')).toBeInTheDocument();
// });

// test('validates email and password on form submission', async () => {
//   render(<LoginPage />);
  
//   await waitFor(() => {
//     expect(screen.getByText('Login Here')).toBeInTheDocument();
//   });

//   const signInButton = screen.getByText('Sign In');

  
//   fireEvent.click(signInButton);

  
//   expect(screen.getByText((content, element) => {
//     return content.startsWith('Please enter your') && element.tagName.toLowerCase() === 'div';
//   })).toBeInTheDocument();

  
//   const emailInput = screen.getByPlaceholderText('Enter your email here');
//   const passwordInput = screen.getByPlaceholderText('Enter your password here');
//   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//   fireEvent.change(passwordInput, { target: { value: 'password123' } });

  
//   fireEvent.click(signInButton);

  
//   expect(screen.queryByText('Please enter your email.')).not.toBeInTheDocument();
//   expect(screen.queryByText('Please enter your password.')).not.toBeInTheDocument();
// });

// test('handles server error', async () => {
  
//   render(<LoginPage />);
  
//   await waitFor(() => {
//     expect(screen.getByText('Login Here')).toBeInTheDocument();
//   });

//   const signInButton = screen.getByText('Sign In');

//   fireEvent.click(signInButton);

//   await waitFor(()=>{
//     expect( screen.getByText('An error occurred.')).toBeInTheDocument()

//   });


// });

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';

test('renders login form with input fields', () => {
  render(<LoginPage />);
  expect(screen.getByPlaceholderText('Enter your email here')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your password here')).toBeInTheDocument();
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});

test('validates email field on form submission with empty email', async () => {
  render(<LoginPage />);
  fireEvent.click(screen.getByText('Sign In'));
  expect(await screen.findByText('Please enter your email.')).toBeInTheDocument();
});

test('validates password field on form submission with empty password', async () => {
  render(<LoginPage />);
  fireEvent.change(screen.getByPlaceholderText('Enter your email here'), { target: { value: 'test@example.com' } });
  fireEvent.click(screen.getByText('Sign In'));
  expect(await screen.findByText('Please enter your password.')).toBeInTheDocument();
});

jest.setTimeout(10000); // Set timeout to 10 seconds (10000 ms)


test('handles server error', async () => {
  // Mock fetch to return an error response
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: false,
    json: async () => ({ error: 'Server error' })
  });

  render(<LoginPage />);
  fireEvent.change(screen.getByPlaceholderText('Enter your email here'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Enter your password here'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText('Sign In'));
  const expectedErrorMessage='Server error';

  //expect(await screen.findByText('An error occurred.')).toBeInTheDocument();
  expect(await screen.findByText(expectedErrorMessage)).toBeInTheDocument();
    //Wait for the error message to appear or a timeout of 5000 ms
    // await waitFor(() => {
    //   expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
    // }, { timeout: 5000 });
});


test('submits form successfully with valid email and password', async () => {
  // Mock fetch to return a successful response
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => ({})
  });

  render(<LoginPage />);
  fireEvent.change(screen.getByPlaceholderText('Enter your email here'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Enter your password here'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText('Sign In'));
  // Wait for form submission and any side effects to complete
  await waitFor(() => {
    expect(screen.queryByText('An error occurred.')).not.toBeInTheDocument();
  });
});



