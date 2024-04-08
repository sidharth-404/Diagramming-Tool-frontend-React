// ChangePassword.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChangePassword from './ChangePassword';

describe('ChangePassword component', () => {
  test('renders without crashing', () => {
    const { screen} = render(<ChangePassword />);
    
   
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Old Password')).toBeInTheDocument();
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('handles form submission', () => {
    const handleSubmit = jest.fn();
    const { screen} = render(<ChangePassword onSubmit={handleSubmit} />);
    
   
    fireEvent.change(screen.getByLabelText('Old Password'), { target: { value: 'oldPassword' } });
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newPassword' } });
    fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'newPassword' } });
    
 
    fireEvent.click(screen.getByText('Submit'));
    
  
    expect(handleSubmit).toHaveBeenCalledWith({
      oldPassword: 'oldPassword',
      newPassword: 'newPassword',
      confirmPassword: 'newPassword'
    });
  });
});
