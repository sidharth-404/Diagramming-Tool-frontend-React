import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SavePop from './SavePop';

describe('SavePopup', () => {
  const onSaveMock = jest.fn();
  const onCancelMock = jest.fn();

  beforeEach(() => {
    onSaveMock.mockClear();
    onCancelMock.mockClear();
  });

  it('should render correctly', () => {
    render(<SavePop onSave={onSaveMock} onCancel={onCancelMock} />);

    expect(screen.getByText('Save Image')).toBeInTheDocument();
    expect(screen.getByText('File Name')).toBeInTheDocument();
    expect(screen.getByText('Format')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
    expect(screen.getByText('Save to Database')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should call onSave with saveToDatabase = false when Download button is clicked', () => {
    render(<SavePop onSave={onSaveMock} onCancel={onCancelMock} />);

    const fileNameInput = screen.getByText('File Name');
    const formatSelect = screen.getByText('Format');
    const downloadButton = screen.getByText('Download');

    fireEvent.change(fileNameInput, { target: { value: 'test-image' } });
    fireEvent.change(formatSelect, { target: { value: 'jpeg' } });
    fireEvent.click(downloadButton);

    expect(onSaveMock).toHaveBeenCalledWith('test-image', 'png', false);
    expect(onSaveMock).toHaveBeenCalledTimes(1);
  });

  it('should call onSave with saveToDatabase = true when Save to Database button is clicked', () => {
    render(<SavePop onSave={onSaveMock} onCancel={onCancelMock} />);

    const fileNameInput = screen.getByText('File Name');
    const formatSelect = screen.getByText('Format');
    const saveToDbButton = screen.getByText('Save to Database');

    fireEvent.change(fileNameInput, { target: { value: 'test-image' } });
    fireEvent.change(formatSelect, { target: { value: 'jpeg' } });
    fireEvent.click(saveToDbButton);

    expect(onSaveMock).toHaveBeenCalledWith('', "jpeg", true);
    expect(onSaveMock).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when Cancel button is clicked', () => {
    render(<SavePop onSave={onSaveMock} onCancel={onCancelMock} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it('should disable Download button when input fields are empty', () => {
    render(<SavePop onSave={onSaveMock} onCancel={onCancelMock} />);

    const downloadButton = screen.getByText('Download');
    expect(downloadButton).toBeDisabled();
  });

  it('should enable Download button when both input fields have values', () => {
    render(<SavePop onSave={onSaveMock} onCancel={onCancelMock} />);

    const fileNameInput = screen.getByText('File Name');
    const formatSelect = screen.getByText('Format');
    const downloadButton = screen.getByText('Download');

    fireEvent.change(fileNameInput, { target: { value: 'test-image' } });
    fireEvent.change(formatSelect, { target: { value: 'png' } });

    expect(downloadButton).not.toBeDisabled();
  });

  test('updates file name on change', () => {
    render(<SavePop />);
    const fileNameInput = screen.getByRole('textbox', { name: /File Name/i });
      fireEvent.change(fileNameInput, { target: { value: 'example.png' } });
      expect(fileNameInput).toHaveValue('example.png');
  });
  
  test('updates format on change', () => {
    render(<SavePop />);
    const formatSelect = screen.getByRole('combobox');
  
    fireEvent.change(formatSelect, { target: { value: 'jpeg' } });
  
    expect(formatSelect).toHaveValue('jpeg');
  });


  describe('handleSaveCopy', () => {
    it('should call onSave with saveToDatabase=false', () => {
      render(<SavePop onSave={onSaveMock} onCancel={onCancelMock} />);
  
      const fileName = 'test-image';
      const selectedFormat = 'png';
  
      const downloadButton = screen.getByText('Download');
      fireEvent.click(downloadButton);
  
      expect(onSaveMock).toHaveBeenCalledWith(fileName, selectedFormat, false);
      expect(onSaveMock).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('handleSaveToDatabase', () => {
    it('should call onSave with saveToDatabase=true', () => {
      render(<SavePop onSave={onSaveMock} onCancel={onCancelMock} />);
  
      const fileName =""
      const selectedFormat = "png";
  
      const saveToDbButton = screen.getByText('Save to Database');
      fireEvent.click(saveToDbButton);
  
      expect(onSaveMock).toHaveBeenCalledWith(fileName, selectedFormat, true);
      expect(onSaveMock).toHaveBeenCalledTimes(1);
    });
  });
  

});
