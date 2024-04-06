
const axios = require('axios');
const { registerUser, saveCanvasImageToDB, getUserByEmail,sendResetPasswordEmail,verifyResetPasswordOTP } = require('./ApiService');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);
const API_URL = 'http://localhost:8080/api/diagrammingtool';

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

    expect(response).toEqual(mockedResponse);
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
  
  it('should save canvas image to DB', async () => {
    const imageData = 'base64ImageData';
    const userId = 28;

    const mockedResponse = {
      id: 1,
      imageData: 'base64ImageData',
      user: { userId: 28 }
    };
    mock.onPost(`${API_URL}/images`).reply(201, mockedResponse); 

    const response = await saveCanvasImageToDB(imageData, userId);

    expect(response).toEqual(mockedResponse);
  });

  it('should handle error while saving canvas image to DB', async () => {
    const imageData = 'base64ImageData';
    const userId = 28;

    const mockedError = { message: 'Request failed with status code 500' };
    mock.onPost(`${API_URL}/images`).reply(500, mockedError); 
    await expect(async () => {
      await saveCanvasImageToDB(imageData, userId);
    }).rejects.toThrowError('Request failed with status code 500');
  });
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