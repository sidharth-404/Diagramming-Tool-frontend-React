// ChangePassword.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChangePassword from './ChangePassword';

describe('ChangePassword component', () => {
  test('renders without crashing', () => {
    const { getByText, getByLabelText } = render(<ChangePassword />);
    
    // Check if the component renders successfully
    expect(getByText('Change Password')).toBeInTheDocument();
    expect(getByLabelText('Old Password')).toBeInTheDocument();
    expect(getByLabelText('New Password')).toBeInTheDocument();
    expect(getByLabelText('Confirm New Password')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  test('handles form submission', () => {
    const handleSubmit = jest.fn();
    const { getByText, getByLabelText } = render(<ChangePassword onSubmit={handleSubmit} />);
    
    // Simulate user input
    fireEvent.change(getByLabelText('Old Password'), { target: { value: 'oldPassword' } });
    fireEvent.change(getByLabelText('New Password'), { target: { value: 'newPassword' } });
    fireEvent.change(getByLabelText('Confirm New Password'), { target: { value: 'newPassword' } });
    
    // Simulate form submission
    fireEvent.click(getByText('Submit'));
    
    // Check if handleSubmit function is called with the correct values
    expect(handleSubmit).toHaveBeenCalledWith({
      oldPassword: 'oldPassword',
      newPassword: 'newPassword',
      confirmPassword: 'newPassword'
    });
  });
});
