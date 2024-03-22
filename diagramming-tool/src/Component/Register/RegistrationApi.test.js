import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Registration from './Registration';

jest.mock('axios');

describe('Registration Component', () => {
  test('registers a new user', async () => {
    render(<Registration />);
    
    // Fill out the registration form
    fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), { target: { value: 'Password123!' } });
    
    // Mock the successful registration response
    axios.post.mockResolvedValueOnce({ status: 201 });

    // Submit the form
    fireEvent.click(screen.getByText('Register'));

    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText('User added successfully! Please login.')).toBeInTheDocument();
    });
  });

  test('shows error message on failed registration', async () => {
    render(<Registration />);
    
    // Fill out the registration form with invalid data
    fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), { target: { value: 'password' } });
    
    // Mock the error response
    axios.post.mockRejectedValueOnce(new Error('User registration failed'));

    // Submit the form
    fireEvent.click(screen.getByText('Register'));

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText('Error adding user. Please try again.')).toBeInTheDocument();
    });
  });
});
