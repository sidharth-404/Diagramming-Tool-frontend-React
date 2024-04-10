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

    fireEvent.change(fileNameInput, { target: { value: 'testImage' } });
    fireEvent.change(formatSelect, { target: { value: 'png' } });

    fireEvent.click(downloadButton);

    expect(onSaveMock).toHaveBeenCalledWith('testImage', 'png', false);
  });

  it('should disable Download button if inputs are empty', () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();

    const { getByText } = render(
      <SavePopup onSave={onSaveMock} onCancel={onCancelMock} />
    );

    const downloadButton = getByText('Download');

    expect(downloadButton).toBeDisabled();
  });

  it('should call onCancel when Cancel button is clicked', () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();

    const { getByText } = render(
      <SavePopup onSave={onSaveMock} onCancel={onCancelMock} />
    );

    const cancelButton = getByText('Cancel');

    fireEvent.click(cancelButton);

    expect(onCancelMock).toHaveBeenCalled();
  });

  it('should call onSave with true for database save when Save to Database button is clicked', () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <SavePopup onSave={onSaveMock} onCancel={onCancelMock} />
    );

    const fileNameInput = getByLabelText('File Name *');
    const formatSelect = getByLabelText('Format *');
    const saveToDatabaseButton = getByText('Save to Database');

    fireEvent.change(fileNameInput, { target: { value: 'testImage' } });
    fireEvent.change(formatSelect, { target: { value: 'jpeg' } });

    fireEvent.click(saveToDatabaseButton);

    expect(onSaveMock).toHaveBeenCalledWith('testImage', 'jpeg', true);
  });
});
