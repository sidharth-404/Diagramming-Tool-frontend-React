import axios from 'axios';
 
const API_URL = 'http://localhost:8080/api';
const API_URL_USER='http://localhost:8080/user';
 
const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response;
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
   
    throw error;
  }
};
 
export const verifyResetPasswordOTP = async (email, newPassword, otp) => {
  const url = `${API_URL}/resetPassword/verify`;
  const response = await axios.patch(url, {
    userEmail: email,
    newPassword: newPassword,
    otp: otp
  });
  return response.data;
};
 
 

 
export const getUserByEmail = async (jwtToken) => {
  try {
    const response = await axios.get(`${API_URL}/user/${jwtToken}`);
        return response.data;
  } catch (error) {
   
    throw error;
  }
};


export const saveCanvasImageDummyToDB = async (imageName,imageDataJson,imageByte, jwtToken) => {
  try {
    const response = await axios.post(`${API_URL_USER}/saveimage`, {
      imageName:imageName,
     imageJson: imageDataJson,
      imageByte:imageByte,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`
      }
    });
    return response.data;
  } catch (error) {
   
    throw error;
  }
};

export const importSavedImageFromDb = async (jwtToken) => {
  try {
    const response = await axios.get(`${API_URL_USER}/getimages`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`
      }

    });
        return response.data;
  } catch (error) {
   
    throw error;
  }
};

export const changePasswordApi = async (formData,jwtToken) => {
  try{
  const url = `${API_URL_USER}/changePassword`;
  const response = await axios.patch(url, {
    userEmail: formData.userEmail,
    newPassword: formData.newPassword,
    currentPassword: formData.currentPassword,
    confirmPassword: formData.confirmPassword,
  },{
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    }

  });
  return response.data; 
}
catch (error) {
  throw error.response ? error.response.data : 'Error changing password.';
}
};
