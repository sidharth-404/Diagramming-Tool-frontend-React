import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import ExistingPage from './ExistingPage';
import { importSavedImageFromDb, getUserByEmail } from '../../ApiService/ApiService';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../ApiService/ApiService', () => ({
  importSavedImageFromDb: jest.fn(),
  getUserByEmail: jest.fn(),
}));

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
