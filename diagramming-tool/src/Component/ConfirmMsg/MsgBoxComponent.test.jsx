/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MsgBoxComponent from './MsgBoxComponent';

describe('MsgBoxComponent', () => {
  it('renders the message box when showMsgBox is true', () => {
    const handleClose = jest.fn();
    const handleClick = jest.fn();

    const { getByText } = render(
      <MsgBoxComponent
        showMsgBox={true}
        closeMsgBox={handleClose}
        msg="This is a test message"
        handleClick={handleClick}
      />
    );

    expect(getByText('Notification')).toBeInTheDocument();
    expect(getByText('This is a test message')).toBeInTheDocument();
  });

  it('does not render the message box when showMsgBox is false', () => {
    const handleClose = jest.fn();
    const handleClick = jest.fn();

    const { queryByText } = render(
      <MsgBoxComponent
        showMsgBox={false}
        closeMsgBox={handleClose}
        msg="This is a test message"
        handleClick={handleClick}
      />
    );

    expect(queryByText('Notification')).not.toBeInTheDocument();
    expect(queryByText('This is a test message')).not.toBeInTheDocument();
  });

  it('calls the closeMsgBox function when "Cancel" button is clicked', () => {
    const handleClose = jest.fn();
    const handleClick = jest.fn();

    const { getByText } = render(
      <MsgBoxComponent
        showMsgBox={true}
        closeMsgBox={handleClose}
        msg="This is a test message"
        handleClick={handleClick}
      />
    );

    fireEvent.click(getByText('Cancel'));

    expect(handleClose).toHaveBeenCalled();
  });

  it('calls the handleClick function when "OK" button is clicked', () => {
    const handleClose = jest.fn();
    const handleClick = jest.fn();

    const { getByText } = render(
      <MsgBoxComponent
        showMsgBox={true}
        closeMsgBox={handleClose}
        msg="This is a test message"
        handleClick={handleClick}
      />
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(getByText('OK'));

    expect(handleClick).toHaveBeenCalled();
  });
});
