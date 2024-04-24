import React from 'react';
import { render, screen, waitFor,fireEvent } from '@testing-library/react';

import ExistingPage from './ExistingPage';
import { importSavedImageFromDb, getUserByEmail } from '../../ApiService/ApiService';
import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'js-cookie';

jest.mock('../../ApiService/ApiService', () => ({
  importSavedImageFromDb: jest.fn(),
  getUserByEmail: jest.fn(),
}));
jest.mock('js-cookie');

describe('ExistingPage component', () => {
  beforeEach(() => {
    importSavedImageFromDb.mockClear();
    getUserByEmail.mockClear();
  });
  it('renders no saved images message when imageData is empty', async () => {
    importSavedImageFromDb.mockResolvedValueOnce([]);
    render(<Router><ExistingPage /></Router>);
    expect(screen.getByText('No saved images')).toBeInTheDocument();
    await waitFor(() => {
      expect(getUserByEmail).toHaveBeenCalled();
    });
  });
  
});
