
import { fabric } from 'fabric';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const useCanvas = (canvas) => {
  const [borderType, setBorderType] = useState('solid');
  const [currentBorderWidth, setCurrentBorderWidth] = useState(1);
  const [currentBorderColor, setCurrentBorderColor] = useState('black');

  const deleteSelectedObject = (canvas) => {
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      confirmAlert({
        title: 'Confirm deletion',
        message: 'Are you sure you want to delete these objects?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              activeObjects.forEach(obj => {
                canvas.remove(obj);
              });
              canvas.discardActiveObject();
              canvas.requestRenderAll();
            }
          },
          {
            label: 'No',
            onClick: () => {

            }
          }
        ]
      });
    } else {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        confirmAlert({
          title: 'Confirm deletion',
          message: 'Are you sure you want to delete this object?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                canvas.remove(activeObject);
                canvas.discardActiveObject();
                canvas.requestRenderAll();
              }
            },
            {
              label: 'No',
              onClick: () => {
                // Do nothing
              }
            }
          ]
        });
      }
    }
  };

  const setDottedBorder = () => {
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        obj.set('strokeDashArray', [2, 2]);
      });
      canvas.requestRenderAll();
    }
    setBorderType('dotted');
  };

  const setSolidBorder = () => {
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        obj.set('strokeDashArray', null);
      });
      canvas.requestRenderAll();
    }
    setBorderType('solid');
  };

  const setDashedBorder = () => {
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        obj.set('strokeDashArray', [8, 5]);
      });
      canvas.requestRenderAll();
    }
    setBorderType('dashed');
  };
  const increaseBorderWidth = () => {
    setCurrentBorderWidth(current => current + 1);
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        obj.set('strokeWidth', currentBorderWidth + 1);
      });
      canvas.requestRenderAll();
    }
  };

 const decreaseBorderWidth = () => {
    if (currentBorderWidth > 1) {
      setCurrentBorderWidth(current => current - 1);
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects && activeObjects.length > 0) {
        activeObjects.forEach((obj) => {
          obj.set('strokeWidth', currentBorderWidth - 1);
        });
        canvas.requestRenderAll();
      }
    }
  };

  const handleBorderColorChange = (e) => {
    const newBorderColor = e.target.value;
    setCurrentBorderColor(newBorderColor);
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        obj.set('stroke', newBorderColor);
      });
      canvas.requestRenderAll();
    }
  };
  const increaseTextSize = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      const currentFontSize = activeObject.get('fontSize');
      const newSize = currentFontSize + 1;
      activeObject.set('fontSize', newSize);
      canvas.renderAll();
      document.getElementById('currentSize').textContent = newSize;
    }
  };

  const decreaseTextSize = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      const currentFontSize = activeObject.get('fontSize');
      const newSize = currentFontSize - 1;
      activeObject.set('fontSize', newSize);
      canvas.renderAll();
      document.getElementById('currentSize').textContent = newSize;
    }
  };

  const changeTextFont = (fontFamily) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('fontFamily', fontFamily);
      canvas.requestRenderAll();
    }
  };

  const changeTextColor = (color) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('fill', color);
      canvas.requestRenderAll();
    }
  };

  const groupObjects = () => {
    const selectedObjects = canvas.getActiveObjects();
    if (selectedObjects.length > 1) {
      const group = new fabric.Group(selectedObjects, {
        originX: 'left',
        originY: 'bottom',
        selectable: true,
        cornerColor: 'yellow',
        borderColor: 'black',
        cornerSize: 6,
        padding: 5,
        cornerStyle: 'square',
      });
      group.set({
        left: 200,
        top: 300
      });
      selectedObjects.forEach(obj => {
        canvas.remove(obj);
      });
      canvas.add(group);
      canvas.renderAll();
    }
  };

  const ungroupObjects = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'group') {
      activeObject._restoreObjectsState();
      canvas.remove(activeObject);
      activeObject._objects.forEach(obj => {
        canvas.add(obj);
      });
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };



  return {
    setDottedBorder, setSolidBorder, setDashedBorder, increaseBorderWidth, decreaseBorderWidth, handleBorderColorChange, increaseTextSize,
    decreaseTextSize, changeTextFont, changeTextColor, deleteSelectedObject, groupObjects,
    ungroupObjects
  };
};

export default useCanvas;
