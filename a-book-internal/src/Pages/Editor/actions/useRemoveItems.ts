import { useRecoilState } from 'recoil';
import useEvent from '../../../utils/hooks/useEvent';
import { canvasItems } from '../recoil/canvas/canvasItems';
import { useAddUndoAction } from '../recoil/history/useUndoRedoActions';

const useRemoveItems = () => {
  const [items, setItems] = useRecoilState(canvasItems);
  const addUndoAction = useAddUndoAction();

  return useEvent((ids: number[]) => {
    const itemsToDelete = items.filter(item => ids.includes(item.id));
    setItems(items => items.filter(item => !ids.includes(item.id)))

    const undoAction = () => {
      setItems((items) => [...items, ...itemsToDelete]);
    }

    const redoAction = () => {
      setItems(items => items.filter(item => !ids.includes(item.id)))
    }

    addUndoAction(undoAction, redoAction);
  });
}

export default useRemoveItems;