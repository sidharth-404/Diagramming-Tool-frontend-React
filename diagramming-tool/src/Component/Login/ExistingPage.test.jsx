/* eslint-disable no-undef */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import ExistingPage from './ExistingPage';
import { importSavedImageFromDb, getUserByEmail } from '../../ApiService/ApiService';

jest.mock('../../ApiService/ApiService', () => ({
  importSavedImageFromDb: jest.fn(),
  getUserByEmail: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ExistingPage Component', () => {
  beforeEach(() => {
    getUserByEmail.mockResolvedValue({ userId: '123' });
    importSavedImageFromDb.mockResolvedValue([
      { imageName: 'image1', imageByte: 'base64data1', imageJson: '{}' },
      { imageName: 'image2', imageByte: 'base64data2', imageJson: '{}' },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders "No saved images" when imageData is empty', async () => {
    importSavedImageFromDb.mockResolvedValueOnce([]);
    render(<Router><ExistingPage /></Router>);
    await waitFor(() => {
      expect(screen.getByText('No saved images')).toBeInTheDocument();
    });
  });

  test('renders image cards when imageData is present', async () => {
    render(<Router><ExistingPage /></Router>);    await waitFor(() => {
      expect(screen.getByTestId('image1')).toBeInTheDocument();
      expect(screen.getByTestId('image2')).toBeInTheDocument();
    });
  });

  test('selects an image card on click', async () => {
    render(<Router><ExistingPage /></Router>);    await waitFor(() => {
      fireEvent.click(screen.getByTestId('image1'));
      expect(localStorage.getItem('selected-image')).toBe('{}');
    });
  });


  test('selects an image and navigates to dashboard', async () => {
    const imageData = [{ imageName: 'image1.png', imageByte: 'image1base64' }];
    importSavedImageFromDb.mockResolvedValueOnce(imageData);
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    render(
      <Router>
        <ExistingPage />
      </Router>
    );
    fireEvent.click(await screen.findByTestId('image1'));
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    expect(localStorage.setItem).toHaveBeenCalledWith('selected-image', '{"imageName":"image1.png","imageByte":"image1base64"}');
  });

  
});
