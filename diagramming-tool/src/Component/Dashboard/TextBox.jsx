import React, { useState, useRef } from "react";
 
const TextBox = ({ x, y, onTextChange, onMove, canvasRef }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Add text");
  const textRef = useRef(null);
 
  const handleTextChange = (event) => {
    setText(event.target.value);
    onTextChange(event.target.value);
  };
 
  const handleDoubleClick = () => {
    setIsEditing(true);
  };
 
  const handleBlur = () => {
    setIsEditing(false);
  };
 
  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
 
    const rect = canvas.getBoundingClientRect();
    const initialX = event.clientX - rect.left;
    const initialY = event.clientY - rect.top;
 
    const handleMouseMove = (event) => {
      const newX = Math.max(0, Math.min(event.clientX - rect.left - initialX + x, canvas.width - 80));
      const newY = Math.max(60, Math.min(event.clientY - rect.top - initialY + y, canvas.height ));
      onMove(newX, newY);
    };
 
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
 
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
 
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        cursor: "move",
      }}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
    >
      {isEditing ? (
        <textarea
          ref={textRef}
          value={text}
          onChange={handleTextChange}
          onBlur={handleBlur}
          style={{ width: "100px", height: "40px", resize: "none" }}
          autoFocus
        />
      ) : (
        text && <span>{text}</span>
      )}
    </div>
  );
};
 
export default TextBox;