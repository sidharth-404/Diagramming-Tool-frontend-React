
import React from 'react';
import { render, fireEvent,waitFor,screen} from '@testing-library/react';
import ChangePassword from './ChangePassword';
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('../../ApiService/ApiService', () => ({
  changePasswordApi: jest.fn(),
}));

describe('ChangePassword component', () => {
  test('renders without crashing', () => {
     render(<Router><ChangePassword /></Router>);
    
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Old Password')).toBeInTheDocument();
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('handles form submission', () => {
    const handleSubmit = jest.fn();
     render(<Router><ChangePassword onSubmit={handleSubmit} /></Router>);
    fireEvent.change(screen.getByLabelText('Old Password'), { target: { value: 'oldPassword' } });
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newPassword' } });
    fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'newPassword' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(handleSubmit).toHaveBeenCalled();
    // expect(handleSubmit).toHaveBeenCalledWith({
    //   oldPassword: 'oldPassword',
    //   newPassword: 'newPassword',
    //   confirmPassword: 'newPassword'
    // });
  });

  it('submits form with valid data', async () => {
    // Mock ApiService response
    const mockResponse = { userEmail: 'test@example.com' };
    require('../../ApiService/ApiService').changePasswordApi.mockResolvedValue(mockResponse);

    render(<Router><ChangePassword /></Router>);

    // Fill out form fields
    fireEvent.change(screen.getByLabelText('UserEmail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Old Password'), { target: { value: 'oldPassword' } });
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newPassword' } });
    fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'newPassword' } });

    // Submit the form
    fireEvent.submit(screen.getByText('Submit'));

    // Wait for async operation to complete
    await waitFor(() => {
      // Assert that ApiService function was called
      expect(require('../../ApiService/ApiService').changePasswordApi).toHaveBeenCalledWith({
        userEmail: 'test@example.com',
        currentPassword: 'oldPassword',
        newPassword: 'newPassword',
        confirmPassword: 'newPassword',
        jwtToken: expect.any(String), // Assuming Cookies.get('token') returns a string
      });

      // Assert that success message is displayed
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('User added successfully! Please login.')).toBeInTheDocument();
    });
  });

});
