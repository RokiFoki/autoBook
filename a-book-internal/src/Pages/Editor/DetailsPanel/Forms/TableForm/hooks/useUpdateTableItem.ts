import { useRecoilState } from 'recoil';
import useEvent from '../../../../../../utils/hooks/useEvent';
import { canvasItems, ItemData } from '../../../../recoil/canvas/canvasItems';
import { useAddUndoAction } from '../../../../recoil/history/useUndoRedoActions';
import cloneDeep from 'lodash/cloneDeep';

const useUpdateTable = () => {
  const [items, setItems] = useRecoilState(canvasItems);
  const addUndoAction = useAddUndoAction();

  return useEvent((newItem: ItemData) => {
    const itemToUpdate = cloneDeep(items.find(item => item.id === newItem.id));
    setItems((items) => items.map(item => item.id === newItem.id ? newItem : item))

    const undoAction = () => {
      if (itemToUpdate) {
        setItems((items) => items.map(item => item.id === itemToUpdate.id ? itemToUpdate : item))
      }
    }

    const redoAction = () => {
      setItems((items) => items.map(item => item.id === newItem.id ? newItem : item))
    }

    addUndoAction(undoAction, redoAction)
  })
}

export default useUpdateTable;
