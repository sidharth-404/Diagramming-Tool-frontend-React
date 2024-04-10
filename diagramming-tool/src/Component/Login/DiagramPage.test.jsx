/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DiagramPage from './DiagramPage';


const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

test('renders buttons for creating and opening diagrams', () => {
  const { getByText } = render(
    <MemoryRouter>
      <DiagramPage />
    </MemoryRouter>
  );
  const createButton = getByText('Create New Diagram');
  const openButton = getByText('Open Existing Diagram');
  expect(createButton).toBeTruthy();
  expect(openButton).toBeTruthy();
});

test('clicking the create button navigates to the dashboard', () => {
  const { getByText } = render(
    <MemoryRouter>
      <DiagramPage />
    </MemoryRouter>
  );
  const createButton = getByText('Create New Diagram');
  fireEvent.click(createButton);
  expect(mockUseNavigate).toHaveBeenCalledWith('/dashboard');
});

test('clicking the open button navigates to the existing page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <DiagramPage />
    </MemoryRouter>
  );
  const openButton = getByText('Open Existing Diagram');
  fireEvent.click(openButton);
  expect(mockUseNavigate).toHaveBeenCalledWith('/existing');
});

test('does not render invalid buttons', () => {
  const { queryByText } = render(
    <MemoryRouter>
      <DiagramPage />
    </MemoryRouter>
  );
  const invalidButton = queryByText('Invalid Button');
  expect(invalidButton).toBeNull();
});
