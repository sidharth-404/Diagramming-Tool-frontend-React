import axios from 'axios';

const API_URL = 'http://localhost:8080/api/diagrammingtool';

const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/addUser`, formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error adding user. Please try again.';
  }
};

export { registerUser };

export const sendResetPasswordEmail = async (email) => {
  try{
  const url = `${API_URL}/resetPassword`;
  const response = await axios.post(url, { userEmail: email });
  return response.data; 
  }
  catch (error) {
    throw error.response ? error.response.data : 'Error sending OTP. Please try again.';
  }
};

export const verifyResetPasswordOTP = async (email, newPassword, otp) => {
  try{
  const url = `${API_URL}/resetPassword/verify`;
  const response = await axios.patch(url, {
    userEmail: email,
    newPassword: newPassword,
    otp: otp
  });
  return response.data; 
}
catch (error) {
  throw error.response ? error.response.data : 'Error sending OTP. Please try again.';
}
};

export const changePasswordApi = async (formData) => {
  try{
  const url = `${API_URL}/changePassword`;
  const response = await axios.patch(url, {
    userEmail: formData.userEmail,
    currentPassword: formData.currentPassword,
    newPassword: formData.newPassword,
    confirmPassword: formData.confirmPassword,
    jwtToken:formData.jwtToken
  });
  return response.data; 
}
catch (error) {
  throw error.response ? error.response.data : 'Error changing password.';
}
};
