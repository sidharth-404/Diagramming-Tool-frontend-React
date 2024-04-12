/* eslint-disable no-undef */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registration from './Registration';
import '@testing-library/jest-dom';
import { registerUser } from '../../ApiService/ApiService';
import MsgBoxComponent from '../ConfirmMsg/MsgBoxComponent';
 
 
 
jest.mock('../../ApiService/ApiService', () => ({
  registerUser: jest.fn(),
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
 
describe('Registration Component', () => {
  it('submits the form with valid data', async () => {
    // Mock successful response from registerUser
    registerUser.mockResolvedValue('User added successfully! Please login.');
 
    const { getByLabelText, getByText, findByText } = render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
 
    // Fill out the form fields
    fireEvent.change(getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name:'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'Password123!' } });
    fireEvent.change(getByLabelText('Confirm Password:'), { target: { value: 'Password123!' } });
 
    // Submit the form
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.submit(getByText('Register'));
 
    // Ensure registerUser function was called with correct data
    expect(registerUser).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      userEmail: 'john.doe@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!'
    });
 
    // Ensure success message is displayed
    const successMessage = await findByText('User added successfully! Please login.');
    expect(successMessage).toBeInTheDocument();
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


test('closes message box when close button is clicked', () => {
  // Render the component
  const { getByTestId } = render(<MsgBoxComponent showMsgBox={true} closeMsgBox={jest.fn()} msg="Test message" />);

  // Simulate click on close button
  fireEvent.click(getByTestId('close-button'));

  // Check if the message box is closed and the message is empty
  expect(getByTestId('notification-modal')).not.toBeVisible();
  // You don't need to test for setshowMsgBox and setMsg since they are internal to the component
});