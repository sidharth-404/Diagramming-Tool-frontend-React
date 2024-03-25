import React from "react";
import "./MsgComponent.css";

const MsgComponent = ({ showModal, cancelModel, msg }) => {
  return (
    <div>
    
      {showModal && (
        <div className="modal-backdrop fade show"></div>
      )}

      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        id="notificationModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="notificationModalLabel"
        style={{ display: showModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="notificationModalLabel">
                Notification
              </h5>
              <button type="button" className="close" onClick={cancelModel}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{msg}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={cancelModel}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={cancelModel}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MsgComponent;

