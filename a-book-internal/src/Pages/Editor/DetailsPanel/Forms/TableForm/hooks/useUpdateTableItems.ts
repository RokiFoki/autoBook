import { useRecoilState } from 'recoil';
import useEvent from '../../../../../../utils/hooks/useEvent';
import { canvasItems, ItemData } from '../../../../recoil/canvas/canvasItems';
import { useAddUndoAction } from '../../../../recoil/history/useUndoRedoActions';
import cloneDeep from 'lodash/cloneDeep';

const useUpdateTableItems = () => {
  const [items, setItems] = useRecoilState(canvasItems);
  const addUndoAction = useAddUndoAction();

  return useEvent((newItems: ItemData[]) => {
    const updatingIds = new Set(newItems.map(({ id }) => id));
    const oldItems = cloneDeep(items.filter(item => updatingIds.has(item.id)));
    setItems((items) => items.map(item => updatingIds.has(item.id) ? newItems.find(i => i.id === item.id)! : item))

    const undoAction = () => {
      if (oldItems.length) {
        setItems((items) => items.map(item => updatingIds.has(item.id) ? oldItems.find(i => i.id === item.id)! : item))
      }
    }

    const redoAction = () => {
      setItems((items) => items.map(item => updatingIds.has(item.id) ? newItems.find(i => i.id === item.id)! : item))
    }

    addUndoAction(undoAction, redoAction)
  })
}

export default useUpdateTableItems;
