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