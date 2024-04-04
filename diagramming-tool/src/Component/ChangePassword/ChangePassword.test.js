// // ChangePassword.test.js

// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import ChangePassword from './ChangePassword';

// describe('ChangePassword component', () => {
//   test('renders without crashing', () => {
//     const { getByText, getByLabelText } = render(<ChangePassword />);
    
   
//     expect(getByText('Change Password')).toBeInTheDocument();
//     expect(getByLabelText('Old Password')).toBeInTheDocument();
//     expect(getByLabelText('New Password')).toBeInTheDocument();
//     expect(getByLabelText('Confirm New Password')).toBeInTheDocument();
//     expect(getByText('Submit')).toBeInTheDocument();
//   });

//   test('handles form submission', () => {
//     const handleSubmit = jest.fn();
//     const { getByText, getByLabelText } = render(<ChangePassword onSubmit={handleSubmit} />);
    
   
//     fireEvent.change(getByLabelText('Old Password'), { target: { value: 'oldPassword' } });
//     fireEvent.change(getByLabelText('New Password'), { target: { value: 'newPassword' } });
//     fireEvent.change(getByLabelText('Confirm New Password'), { target: { value: 'newPassword' } });
    
 
//     fireEvent.click(getByText('Submit'));
    
  
//     expect(handleSubmit).toHaveBeenCalledWith({
//       oldPassword: 'oldPassword',
//       newPassword: 'newPassword',
//       confirmPassword: 'newPassword'
//     });
//   });
// });
