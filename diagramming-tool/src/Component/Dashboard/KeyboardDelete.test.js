
import { renderHook, act } from '@testing-library/react-hooks';
import { handleDeletes } from './KeyboardDelete'; 

describe('handleDeletes', () => {
  
    it('should remove the selected shape when the Delete key is pressed', () => {
        
        const selectedShapeId = 'some-id';
        const shapes = [
          { id: 'some-id' }, 
          { id: 'another-id' } 
        ];
        const setShapes = jest.fn();
        const setSelectedShapeId = jest.fn();
    
       
        const { result } = renderHook(() =>
          handleDeletes(selectedShapeId, shapes, setShapes, setSelectedShapeId)
        );
        act(() => {
          result.current({ key: 'Delete' }); 
        });
    
       
        const expectedShapesAfterDeletion = [{ id: 'another-id' }];
        expect(setShapes).toHaveBeenCalledTimes(1);
        expect(setShapes.mock.calls[0][0]).toEqual(expectedShapesAfterDeletion);
        expect(setSelectedShapeId).toHaveBeenCalledWith(null);
      });
    
    
  it('should not remove any shapes when the Delete key is pressed and no shape is selected', () => {
   
    const selectedShapeId = null;
    const shapes = [
      { id: 'some-id' }, 
      { id: 'another-id' } 
    ];
    const setShapes = jest.fn();
    const setSelectedShapeId = jest.fn();

   
    const { result } = renderHook(() =>
      handleDeletes(selectedShapeId, shapes, setShapes, setSelectedShapeId)
    );
    act(() => {
      result.current({ key: 'Delete' });
    });

   
    expect(setShapes).not.toHaveBeenCalled(); 
    expect(setSelectedShapeId).not.toHaveBeenCalled();
  });
});
