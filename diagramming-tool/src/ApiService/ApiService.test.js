import axios from 'axios';
import { registerUser, saveCanvasImageToDB } from './ApiService';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('API Functions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should register a user', async () => {
    const formData = {
      firstname: 'testuser',
      lastName:'user',
      userEmail: 'test@example.com',
      password: 'password123',
    };


    const mockedResponse = { userId: 1, firstname: 'testuser', lastName:'user', userEmail: 'test@example.com',password: 'password123' };
    mock.onPost('/addUser').reply(201, mockedResponse);

    const response = await registerUser(formData);

    expect(response).toEqual(mockedResponse);
  });

  it('should handle error while registering user', async () => {
    const formData = {
        firstname: 'testuser',
        lastName:'user',
        userEmail: 'test@example.com',
        password: 'password123',
    };

    const mockedError = { message: 'User already exists' };
    mock.onPost('/addUser').reply(400, mockedError);

    try {
      await registerUser(formData);
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toEqual(mockedError.message);
    }
  });

  it('should save canvas image to DB', async () => {
    const imageData = 'base64ImageData';
    const userId = 28;

    const mockedResponse = { id: 1, imageData: 'base64ImageData', user: { userId: 28 } };
    mock.onPost('/images').reply(201, mockedResponse);

    const response = await saveCanvasImageToDB(imageData, userId);

    expect(response).toEqual(mockedResponse);
  });

  it('should handle error while saving canvas image to DB', async () => {
    const imageData = 'base64ImageData';
    const userId = 28;

    const mockedError = { message: 'Error saving image' };
    mock.onPost('/images').reply(500, mockedError);

    try {
      await saveCanvasImageToDB(imageData, userId);
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toEqual(mockedError);
    }
  });
  
});
