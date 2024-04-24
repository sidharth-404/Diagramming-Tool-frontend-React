
import React from 'react';
import { render, fireEvent,waitFor,screen} from '@testing-library/react';
import ChangePassword from './ChangePassword';

jest.mock('../../ApiService/ApiService', () => ({
  changePasswordApi: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(() => 'mockToken'), // Mocking token retrieval
}));


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('ChangePassword component', () => {
  test('renders without crashing', () => {
     render(<ChangePassword />);
    
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Old Password')).toBeInTheDocument();
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('Form submission success', async () => {
    const mockResponse = { userEmail: 'test@example.com' };
    require('../../ApiService/ApiService').changePasswordApi.mockResolvedValueOnce(mockResponse);
    render(<ChangePassword />);
    fireEvent.change(screen.getByLabelText('UserEmail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Old Password'), { target: { value: 'oldPassword' } });
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newPassword' } });
    fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'newPassword' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));
    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() => expect(screen.getByText('User added successfully! Please login.')).toBeInTheDocument());
  });

  test('Form submission failure', async () => {
    require('../../ApiService/ApiService').changePasswordApi.mockRejectedValueOnce('Error message');

    // Render component
    render(<ChangePassword />);

    // Fill form fields
    fireEvent.change(screen.getByLabelText('UserEmail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Old Password'), { target: { value: 'oldPassword' } });
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newPassword' } });
    fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'newPassword' } });

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));

    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() => expect(screen.getByText('Error message')).toBeInTheDocument());
  });

  test('Navigate to dashboard after successful password change', async () => {
    // Mock successful API response
    const mockResponse = { userEmail: 'test@example.com' };
    require('../../ApiService/ApiService').changePasswordApi.mockResolvedValueOnce(mockResponse);

    // Render component
     render(<ChangePassword />);

    // Fill form fields
    fireEvent.change(screen.getByLabelText('UserEmail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Old Password'), { target: { value: 'oldPassword' } });
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newPassword' } });
    fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'newPassword' } });


    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));
    expect(window.location.pathname).toBe('/');
  });


});
