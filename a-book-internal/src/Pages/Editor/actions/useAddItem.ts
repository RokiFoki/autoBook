import { useSetRecoilState } from 'recoil';
import useEvent from '../../../utils/hooks/useEvent';
import { canvasItems, ItemData } from '../recoil/canvas/canvasItems';
import { UndoRedoAction, useResetRedo, useAddUndoAction } from '../recoil/history/useUndoRedoActions';

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

    const undo: UndoRedoAction = {
      action: undoAction,
      oppositeAction: {
        action: redoAction,
        oppositeAction: null as unknown as UndoRedoAction
      }
    }
    undo.oppositeAction.oppositeAction = undo;

    addUndoAction(undo);
    resetRedo();
  });
}

export default useAddItem;