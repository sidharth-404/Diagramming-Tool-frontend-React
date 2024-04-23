



/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable no-undef */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, screen,waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registration from './Registration';
import '@testing-library/jest-dom';
import { registerUser } from '../../ApiService/ApiService';

import { toast } from 'react-toastify';

 
 
 
jest.mock('../../ApiService/ApiService', () => ({
  registerUser: jest.fn(),
}));
 

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(message => {
      throw new Error(message);
    })
  }
}));


describe('Registration component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
  });
 
  it('validates first name input', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const firstNameInput = screen.getByLabelText('First Name:');
    fireEvent.change(firstNameInput, { target: { value: 'A' } });
    const errorMessage = screen.getByText('First Name must be between 2 and 20 characters');
    expect(errorMessage).toBeInTheDocument();
  });
 
  it('validates last name input', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const lastNameInput = screen.getByLabelText('Last Name:');
    fireEvent.change(lastNameInput, { target: { value: 'B' } });
    const errorMessage = screen.getByText('Last Name must be between 2 and 20 characters');
    expect(errorMessage).toBeInTheDocument();
  });
 
  it('validates email input', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'invalidemail.com' } });
    const errorMessage = screen.getByText('Please enter a valid email address');
    expect(errorMessage).toBeInTheDocument();
  });
 
  it('validates password input', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'weakpassword' } });
    const errorMessage = screen.getByText('Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character');
    expect(errorMessage).toBeInTheDocument();
  });
 
  it('validates not confirm password input', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    const errorMessage = screen.queryByText('Passwords do not match');
    expect(errorMessage).toBeNull();
  });
 
  it('validates empty form submission', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const submitButton = screen.getByText('Register');
    fireEvent.click(submitButton);
  });
 
  it('submits the form successfully', async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const firstNameInput = screen.getByLabelText('First Name:');
    const lastNameInput = screen.getByLabelText('Last Name:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'StrongPassword1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'StrongPassword1!' } });
    const submitButton = screen.getByText('Register');
    fireEvent.click(submitButton);
 
  });
 
 
  it('validates confirm password input', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    const errorMessage = screen.getByText('Passwords do not match');
    expect(errorMessage).toBeInTheDocument();
  });
 
  it('validates minimum length for first name input', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const firstNameInput = screen.getByLabelText('First Name:');
    fireEvent.change(firstNameInput, { target: { value: 'A' } });
    const errorMessage = screen.getByText('First Name must be between 2 and 20 characters');
    expect(errorMessage).toBeInTheDocument();
  });
 
 
  it('validates maximum length for first name input', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const firstNameInput = screen.getByLabelText('First Name:');
    fireEvent.change(firstNameInput, { target: { value: 'abcdefghijklmnopqrstuvwxyz' } });
    const errorMessage = screen.getByText('First Name must be between 2 and 20 characters');
    expect(errorMessage).toBeInTheDocument();
  });
 
 
  it('displays error message on form submission with errors', async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
  });

  
 
});
 
it('validates first name input with numbers', () => {
  render(
    <MemoryRouter>
      <Registration />
    </MemoryRouter>
  );
  const firstNameInput = screen.getByLabelText('First Name:');
  fireEvent.change(firstNameInput, { target: { value: 'John123' } });
  const errorMessage = screen.getByText('Numbers not allowed in the first name');
  expect(errorMessage).toBeInTheDocument();
});



  it('displays error toast when form submission is prevented due to errors', async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
  
    
    fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'J' } });
    fireEvent.change(screen.getByLabelText('Last Name:'), { target: { value: 'D' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'invalidemail.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'weak' } });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), { target: { value: 'password' } });
  
    
    const submitButton = screen.getByText('Register');
    fireEvent.click(submitButton);
  
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please fix the form errors.');
    });
  
   
    expect(screen.getByText('Registration')).toBeInTheDocument();
  });
  
  it('navigates to login page after successful registration', async () => {
   
    jest.useFakeTimers();
  
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
  
   
    registerUser.mockResolvedValueOnce('User added successfully! Please login.');
  
   
    const submitButton = screen.getByText('Register');
    fireEvent.click(submitButton);
  
   
    await waitFor(() => {
      expect(registerUser).toHaveBeenCalled();
    });
  
    
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('User added successfully! Please login.');
    });
  
    
    jest.advanceTimersByTime(3000);
  
  
    jest.useRealTimers();
  });
  