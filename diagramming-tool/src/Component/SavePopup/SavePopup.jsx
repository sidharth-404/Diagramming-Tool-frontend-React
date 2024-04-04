import React, { useState } from "react";
import "./SavePopup.css";

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

  return (
    <div className="save-popup">
      <div className="save-popup-content">
        <h2>Save Image</h2>
        <div className="form-group">
          <label htmlFor="fileName">File Name:</label>
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
          <label htmlFor="format">Format:</label>
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
          <button type="button" onClick={handleSaveCopy}>
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





// const handleSave = (fileName, format, saveToDatabase) => {
//   const canvas = canvasRef.current;
//   if (!canvas) return;

//   const tempCanvas = document.createElement("canvas");
//   tempCanvas.width = canvas.width;
//   tempCanvas.height = canvas.height;
//   const tempCtx = tempCanvas.getContext("2d");

//   // Set background color based on format
//   if (format === "jpeg") {
//     tempCtx.fillStyle = "white";
//     tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
//   }

//   shapes.forEach((shape) => {
//     if (shape.type === ShapeTypes.RECTANGLE) {
//       tempCtx.fillStyle = "white";
//       tempCtx.lineWidth = 2;
//       tempCtx.fillRect(shape.x, shape.y, shape.width * 2, shape.height);
//       tempCtx.strokeRect(shape.x, shape.y, shape.width * 2, shape.height);
//     } else if (shape.type === ShapeTypes.CIRCLE) {
//       tempCtx.beginPath();
//       tempCtx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
//       tempCtx.fillStyle = "white";
//       tempCtx.fill();
//       tempCtx.lineWidth = 2;
//       tempCtx.stroke();
//     } else if (shape.type === ShapeTypes.SQUARE) {
//       tempCtx.fillStyle = "white";
//       tempCtx.lineWidth = 2;
//       tempCtx.fillRect(shape.x, shape.y, shape.size, shape.size);
//       tempCtx.strokeRect(shape.x, shape.y, shape.size, shape.size);
//     } else if (shape.type === ShapeTypes.DIAMOND) {
//       tempCtx.beginPath();
//       tempCtx.lineWidth = 2;
//       tempCtx.moveTo(shape.x + shape.width / 2, shape.y);
//       tempCtx.lineTo(shape.x + shape.width, shape.y + shape.height / 2);
//       tempCtx.lineTo(shape.x + shape.width / 2, shape.y + shape.height);
//       tempCtx.lineTo(shape.x, shape.y + shape.height / 2);
//       tempCtx.closePath();
//       tempCtx.fillStyle = "white";
//       tempCtx.fill();
//       tempCtx.stroke();
//     }
//   });

//   tempCanvas.toBlob((blob) => {
//     if (!blob) {
//       console.error("Failed to convert canvas to blob.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       const canvasDataUrl = reader.result;
//       if (canvasDataUrl) {
//         if (saveToDatabase) {
//           const base64String = canvasDataUrl.split(",")[1];
//           saveCanvasImageToDB(base64String, userId)
//             .then(() => {
//               console.log("Canvas image saved to database.");
//               setShowMsgBox(true);
//               setMsg("Image saved successfully!");
//               setShowSavePopup(false);
//             })
//             .catch((error) => {
//               console.error("Error saving canvas image to database:", error);
//               setShowSavePopup(false);
//               setShowMsgBox(true);
//               setMsg("Error in saving");
//             });
//         } else {
//           // Download the image
//           const link = document.createElement("a");
//           link.download = fileName + "." + format;
//           link.href = canvasDataUrl;
//           link.click();
//           URL.revokeObjectURL(link.href);
//           setShowSavePopup(false);
//         }
//       }
//     };
//     reader.readAsDataURL(blob);
//   }, "image/" + format);
// };
