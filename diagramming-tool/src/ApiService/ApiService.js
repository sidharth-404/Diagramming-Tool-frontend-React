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
  const url = `${API_URL}/resetPassword/verify`;
  const response = await axios.patch(url, {
    userEmail: email,
    newPassword: newPassword,
    otp: otp
  });
  return response.data; // Assuming your API returns some data upon successful request
};
export const saveCanvasImageToDB = async (imageData, userId) => {
  try {
    const response = await axios.post(`${API_URL}/images`, {
      imageData: imageData,
      user: {
        userId:28
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error saving canvas image to database:', error);
    throw error;
  }
};
