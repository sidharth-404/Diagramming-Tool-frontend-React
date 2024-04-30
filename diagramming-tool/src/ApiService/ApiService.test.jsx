import axios from 'axios';
import { registerUser, getUserByEmail, sendResetPasswordEmail, verifyResetPasswordOTP,saveCanvasImageDummyToDB,importSavedImageFromDb,changePasswordApi } from './ApiService';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
const API_URL = 'http://localhost:8080/api';

describe('API Functions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should register a user', async () => {
    const formData = {
      firstName: 'testuser',  
      lastName: 'user',       
      userEmail: 'test@example.com',
      password: 'Password@123',
    };

    const mockedResponse = {
      userId: 1,
      firstname: 'testuser',
      lastName: 'user',
      userEmail: 'test@example.com',
      password: 'password123'
    };
    mock.onPost(`${API_URL}/addUser`).reply(201, mockedResponse); 

    const response = await registerUser(formData);

    expect(response.data).toEqual(mockedResponse);
  });



  it('should handle error while registering user', async () => {
    const formData = {
      firstName: 'testuser', 
      lastName: 'user',       
      userEmail: 'test@example.com',
      password: 'Password@123',
    };
  
    const mockedError = { message: 'Request failed with status code 400' }; 
    mock.onPost(`${API_URL}/addUser`).reply(400, mockedError); 
  
    try {
      await registerUser(formData);
    } catch (error) {
      console.log('Actual Error Message:', error.message);
    }
  
    await expect(registerUser(formData)).rejects.toThrowError('Request failed with status code 400');
  });
  
  // it('should save canvas image to DB', async () => {
  //   const imageData = 'base64ImageData';
  //   const userId = 28;

  //   const mockedResponse = {
  //     id: 1,
  //     imageData: 'base64ImageData',
  //     user: { userId: 28 }
  //   };
  //   mock.onPost(`${API_URL}/images`).reply(201, mockedResponse); 

  //   const response = await saveCanvasImageToDB(imageData, userId);

  //   expect(response).toEqual(mockedResponse);
  // });

  // it('should handle error while saving canvas image to DB', async () => {
  //   const imageData = 'base64ImageData';
  //   const userId = 28;

  //   const mockedError = { message: 'Request failed with status code 500' };
  //   mock.onPost(`${API_URL}/images`).reply(500, mockedError); 
  //   await expect(async () => {
  //     await saveCanvasImageToDB(imageData, userId);
  //   }).rejects.toThrowError('Request failed with status code 500');
  // });
});




it('should get user by email', async () => {
  const jwtToken = 'johndoe@example.com'; 

  const mockedResponse = {
    userId: 1,
    firstName: 'John',
    lastName: 'Doe',
    userEmail: 'johndoe@example.com',
  };

  mock.onGet(`${API_URL}/user/${jwtToken}`).reply(200, mockedResponse);

  const response = await getUserByEmail(jwtToken);

  expect(response).toEqual(mockedResponse);
});

it('should handle error while getting user by email', async () => {
  const jwtToken = 'johndoe@example.com'; 

  const mockedError = { message: 'Request failed with status code 404' };
  mock.onGet(`${API_URL}/user/${jwtToken}`).reply(404, mockedError);

  await expect(getUserByEmail(jwtToken)).rejects.toThrowError('Request failed with status code 404');
});


it('should send reset password email', async () => {
  const email = 'test@example.com';

  const mockedResponse = {
    message: 'Reset password email sent successfully',
  };
  mock.onPost(`${API_URL}/resetPassword`).reply(200, mockedResponse);

  const response = await sendResetPasswordEmail(email);

  expect(response).toEqual(mockedResponse);
});

it('should handle error while sending reset password email', async () => {
  const email = 'test@example.com';

  const mockedError = { response: { data: 'Request failed with status code 500' } };
  mock.onPost(`${API_URL}/resetPassword`).reply(500, mockedError);

  await expect(sendResetPasswordEmail(email)).rejects.toThrowError('Request failed with status code 500');
});

it('should verify reset password OTP', async () => {
    const email = 'test@example.com';
    const newPassword = 'NewPassword@123';
    const otp = '123456';

    const mockedResponse = {
      message: 'Password reset successful',
    };
    mock.onPatch(`${API_URL}/resetPassword/verify`).reply(200, mockedResponse);

    const response = await verifyResetPasswordOTP(email, newPassword, otp);

    expect(response).toEqual(mockedResponse);
  });

  it('should save canvas image dummy to database', async () => {
    const imageName = 'test_image.png';
    const imageDataJson = {
      "imageWidth": 800,
      "imageHeight": 600,
      "objects": [
        {
          "type": "rect",
          "left": 100,
          "top": 100,
          "width": 200,
          "height": 150,
          "fill": "red"
        },
        {
          "type": "circle",
          "left": 400,
          "top": 200,
          "radius": 50,
          "fill": "blue"
        }
      ]
    };
    const imageByte = 'base64imagebytes';
    const userId = 28;

    const mockedResponse = {
      imageName: 'test_image.png',
      imageDataJson: {
        "imageWidth": 800,
        "imageHeight": 600,
        "objects": [
          {
            "type": "rect",
            "left": 100,
            "top": 100,
            "width": 200,
            "height": 150,
            "fill": "red"
          },
          {
            "type": "circle",
            "left": 400,
            "top": 200,
            "radius": 50,
            "fill": "blue"
          }
        ]
      },
      imageByte: 'base64imagebytes',
      user: { userId: 28 }
    };

    mock.onPost(`${API_URL}/saveDummyImage`).reply(201, mockedResponse);

    const response = await saveCanvasImageDummyToDB(imageName, imageDataJson, imageByte, userId);

    expect(response.data).toEqual(mockedResponse);
  });
  it('should handle error  while saving canvasimage to DB', async () => {
    const imageName = 'test_image.png';
    const imageDataJson = {
      "imageWidth": 800,
      "imageHeight": 600,
      "objects": [
        {
          "type": "rect",
          "left": 100,
          "top": 100,
          "width": 200,
          "height": 150,
          "fill": "red"
        },
        {
          "type": "circle",
          "left": 400,
          "top": 200,
          "radius": 50,
          "fill": "blue"
        }
      ]
    };
    const imageByte = 'base64imagebytes';
    const userId = 28;

    const mockedError = { message: 'Request failed with status code 500' };
    mock.onPost(`${API_URL}/saveDummyImage`).reply(500, mockedError); 
    await expect(async () => {
      await saveCanvasImageDummyToDB(imageName, imageDataJson, imageByte, userId);
    }).rejects.toThrowError('Request failed with status code 500');
  });




it ('should change user password', async () => {
    const formData = {
      userEmail: 'test@example.com',
      currentPassword: 'oldPassword',
      newPassword: 'newPassword',
      confirmPassword: 'newPassword',
      jwtToken: 'jwtToken'
    };

    const mockedResponse = {
      message: 'Password changed successfully',
    };
    mock.onPatch(`${API_URL}/changePassword`).reply(200, mockedResponse);

    const response = await changePasswordApi(formData);

    expect(response).toEqual(mockedResponse);
  });

  it('should handle error while changing password', async () => {
    const formData = {
      userEmail: 'test@example.com',
      currentPassword: 'oldPassword',
      newPassword: 'newPassword',
      confirmPassword: 'newPassword',
      jwtToken: 'jwtToken'
    };
  
    const mockedError = new Error("[object Object]");
    mock.onPatch(`${API_URL}/changePassword`).reply(500, mockedError);
  
    await expect(changePasswordApi(formData)).rejects.toThrowError("[object Object]");
  });
  



  it('should get images by userid', async () => {
    const userId = 1; 
  
    const mockedResponse = {
      userId: 1,
      imageName: 'demo',
      imageJson:"{\"version\":\"5.3.0\",\"objects\":[],\"background\":\"white\"}",
      userEmail: 'johndoe@example.com',
      imageByte :'base64imagebytes',
      user: {
            "userId": 1,
            "firstName": "abin",
            "lastName": "James",
            "userEmail": "Abin@gmail.com",
            "password": "$2a$10$fF4tgcnaKd4UAKDRqhijkujOv4dyQBQVW8jjwoOCMEsrib42k9J/a"
        }
    };
  
    mock.onGet(`${API_URL}/getimages/${userId}`).reply(200, mockedResponse);
  
    const response = await importSavedImageFromDb(userId);
  
    expect(response).toEqual(mockedResponse);
  });

  it('should handle error while getting images', async () => {
    const userId = 10;
  
    const mockedError = { response: { data: 'Request failed with status code 404' } };
    mock.onPost(`${API_URL}/getimages/${userId}`).reply(500, mockedError);
  
    await expect(importSavedImageFromDb(userId)).rejects.toThrowError('Request failed with status code 404');
  });
  