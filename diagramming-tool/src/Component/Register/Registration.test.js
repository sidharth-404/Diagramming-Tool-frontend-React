/* eslint-disable testing-library/prefer-screen-queries */


import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registration from './Registration';
import '@testing-library/jest-dom';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  navigate: jest.fn(), 
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

  it('validates confirm password input', () => {
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


