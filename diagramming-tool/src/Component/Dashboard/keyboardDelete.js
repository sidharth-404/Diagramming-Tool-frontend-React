
  
export const handleDeletes = (selectedShapeId, shapes, setShapes, setSelectedShapeId) => {
    return (event) => {
      if (event.key === 'Delete' && selectedShapeId !== null) {
       
        const updatedShapes = shapes.filter(shape => shape.id !== selectedShapeId);
        setShapes(updatedShapes);
        setSelectedShapeId(null); 
      }
    };
  };
  