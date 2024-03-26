import React from "react";
// import "./MsgComponent.css";

const MsgBoxComponent = ({ showMsgBox, closeMsgBox, msg ,handleClick}) => {
  return (
    <div>
    
      {showMsgBox && (
        <div className="modal-backdrop fade show"></div>
      )}

      <div
        className={`modal fade ${showMsgBox ? 'show' : ''}`}
        id="notificationModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="notificationModalLabel"
        style={{ display: showMsgBox ? 'block' : 'none' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="notificationModalLabel">
                Notification
              </h5>
              <button type="button" className="close" onClick={closeMsgBox}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{msg}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={closeMsgBox}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MsgBoxComponent;

