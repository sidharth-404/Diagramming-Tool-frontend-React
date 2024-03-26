
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Registration from './Registration';

const mockAxios = new MockAdapter(axios);

describe('Registration API', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('saves user data when registration is successful', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      userEmail: 'john@example.com',
      password: 'StrongPassword123',
      confirmPassword: 'StrongPassword123'
    };

    // Mocking the POST request to simulate a successful registration
    mockAxios.onPost('http://localhost:8080/api/diagrammingtool/addUser').reply(201);

    // Render the Registration component
    const { getByLabelText, getByText } = render(<Registration />);

    // Simulate user input
    fireEvent.change(getByLabelText('First Name:'), { target: { value: userData.firstName } });
    fireEvent.change(getByLabelText('Last Name:'), { target: { value: userData.lastName } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: userData.userEmail } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: userData.password } });
    fireEvent.change(getByLabelText('Confirm Password:'), { target: { value: userData.confirmPassword } });

    // Submit the form
    fireEvent.submit(getByText('Register'));

    // Wait for the API request to be made
    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(mockAxios.history.post[0].data).toEqual(JSON.stringify(userData));
    });

    // Ensure success message is displayed (assuming it's rendered in the component)
    expect(getByText('User added successfully! Please login.')).toBeInTheDocument();
  });
});
