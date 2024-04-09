/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SavePopup from './SavePopup';

describe('SavePopup', () => {
  it('should call onSave when Download button is clicked with valid inputs', () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <SavePopup onSave={onSaveMock} onCancel={onCancelMock} />
    );

    const fileNameInput = getByLabelText('File Name *');
    const formatSelect = getByLabelText('Format *');
    const downloadButton = getByText('Download');

    // Set file name and format
    fireEvent.change(fileNameInput, { target: { value: 'testImage' } });
    fireEvent.change(formatSelect, { target: { value: 'png' } });

    // Click Download button
    fireEvent.click(downloadButton);

    // Check if onSave is called with expected arguments
    expect(onSaveMock).toHaveBeenCalledWith('testImage', 'png', false);
  });

  it('should disable Download button if inputs are empty', () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();

    const { getByText } = render(
      <SavePopup onSave={onSaveMock} onCancel={onCancelMock} />
    );

    const downloadButton = getByText('Download');

    // Download button should be disabled initially
    expect(downloadButton).toBeDisabled();
  });

  it('should call onCancel when Cancel button is clicked', () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();

    const { getByText } = render(
      <SavePopup onSave={onSaveMock} onCancel={onCancelMock} />
    );

    const cancelButton = getByText('Cancel');

    // Click Cancel button
    fireEvent.click(cancelButton);

    // Check if onCancel is called
    expect(onCancelMock).toHaveBeenCalled();
  });
});
