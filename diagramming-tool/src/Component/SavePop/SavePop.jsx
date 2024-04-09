import React, { useState } from "react";
import "./SavePop.css";
 
const SavePopup = ({ onSave, onCancel }) => {
  const [fileName, setFileName] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("png");
 
  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };
 
  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };
 
  const handleSaveCopy = () => {
    onSave(fileName, selectedFormat, false);
  };
 
  const handleSaveToDatabase = () => {
    onSave(fileName, selectedFormat, true);
  };
 
 
  const canDownload = fileName.trim() !== "" && selectedFormat.trim() !== "";
 
  return (
    <div className="save-popup">
      <div className="save-popup-content">
        <h2>Save Image</h2>
        <div className="form-group">
          <label htmlFor="fileName">File Name <span className="mandatory">*</span> </label>
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={handleFileNameChange}
            placeholder="Enter file name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="format">Format <span className="mandatory">*</span></label>
          <select
            id="format"
            value={selectedFormat}
            onChange={handleFormatChange}
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
          </select>
        </div>
        <div className="button-group">
          <button type="button" onClick={handleSaveCopy} disabled={!canDownload}>
            Download
          </button>
          <button type="button" onClick={handleSaveToDatabase}>
            Save to Database
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default SavePopup;