import { useSetRecoilState } from 'recoil';
import useEvent from '../../../utils/hooks/useEvent';
import { canvasItems, ItemData } from '../recoil/canvas/canvasItems';
import { useResetRedo, useAddUndoAction, constructUndoAction } from '../recoil/history/useUndoRedoActions';

const useAddItem = () => {
  const setItems = useSetRecoilState(canvasItems);
  const addUndoAction = useAddUndoAction();
  const resetRedo = useResetRedo();

  return useEvent((item: ItemData) => {
    setItems((items) => [...items, item]);

    const undoAction = () => {
      setItems((items) => items.filter(i => i.id !== item.id))
    }

    const redoAction = () => {
      setItems((items) => [...items, item]);
    }

    const undo = constructUndoAction(undoAction, redoAction);

    addUndoAction(undo);
    resetRedo();
  });
}

export default useAddItem;