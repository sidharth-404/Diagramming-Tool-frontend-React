import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SavePopup from './SavePopup';

describe('SavePopup', () => {
  const onSaveMock = jest.fn();
  const onCancelMock = jest.fn();

  beforeEach(() => {
    onSaveMock.mockClear();
    onCancelMock.mockClear();
  });

  it('should render correctly', () => {
    render(<SavePopup onSave={onSaveMock} onCancel={onCancelMock} />);

    expect(screen.getByText('Save Image')).toBeInTheDocument();
    expect(screen.getByLabelText('File Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Format:')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
    expect(screen.getByText('Save to Database')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should call onSave with saveToDatabase = false when Download button is clicked', () => {
    render(<SavePopup onSave={onSaveMock} onCancel={onCancelMock} />);

    const fileNameInput = screen.getByLabelText('File Name:');
    const formatSelect = screen.getByLabelText('Format:');
    const downloadButton = screen.getByText('Download');

    fireEvent.change(fileNameInput, { target: { value: 'test-image' } });
    fireEvent.change(formatSelect, { target: { value: 'png' } });
    fireEvent.click(downloadButton);

    expect(onSaveMock).toHaveBeenCalledWith('test-image', 'png', false);
    expect(onSaveMock).toHaveBeenCalledTimes(1);
  });

  it('should call onSave with saveToDatabase = true when Save to Database button is clicked', () => {
    render(<SavePopup onSave={onSaveMock} onCancel={onCancelMock} />);

    const fileNameInput = screen.getByLabelText('File Name:');
    const formatSelect = screen.getByLabelText('Format:');
    const saveToDbButton = screen.getByText('Save to Database');

    fireEvent.change(fileNameInput, { target: { value: 'test-image' } });
    fireEvent.change(formatSelect, { target: { value: 'jpeg' } });
    fireEvent.click(saveToDbButton);

    expect(onSaveMock).toHaveBeenCalledWith('test-image', 'jpeg', true);
    expect(onSaveMock).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when Cancel button is clicked', () => {
    render(<SavePopup onSave={onSaveMock} onCancel={onCancelMock} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });
});
