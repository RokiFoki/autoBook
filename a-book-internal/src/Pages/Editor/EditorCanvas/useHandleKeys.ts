import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useEvent from '../../../utils/hooks/useEvent';
import useRemoveItems from '../actions/useRemoveItems';
import { selectedCanvasItems } from '../recoil/canvas/selectedCanvasItems';
import useUndoRedoActions from '../recoil/history/useUndoRedoActions';
import { Operation, operationInProgress } from '../recoil/operation';
import { selectedAddItemType } from '../recoil/selectedAddItemType';

const defaultOperation: Operation = null;

const useHandleKeys = (isEditorFocused: boolean, editorRef: React.RefObject<HTMLElement>) => {
  const [operation, setOperation] = useRecoilState(operationInProgress);
  const [selectedItemTypeToAdd, setSelecteditemTypeToadd] = useRecoilState(selectedAddItemType)
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCanvasItems);
  const removeItems = useRemoveItems();
  const undoRedo = useUndoRedoActions();

  const handleEscape = useEvent(() => {
    if (operation === 'Add') {
      if (selectedItemTypeToAdd !== null) {
        return setSelecteditemTypeToadd(null)
      }

      return setOperation(defaultOperation);
    }

    if (operation === 'Select') {
      if (selectedItems?.length) {
        return setSelectedItems([]);
      }
      return setOperation(defaultOperation);
    }
  })

  const handleUndo = useEvent(() => {
    undoRedo.undo.action();
  })

  const handleRedo = useEvent(() => {
    undoRedo.redo.action();
  })

  const handleDelete = useEvent(() => {
    if (isEditorFocused) {
      removeItems(selectedItems)
    }
  });

  useEffect(() => {
    const target = window;
    if (target) {

      const onKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') return handleEscape();
        if (ev.key === 'z' && ev.ctrlKey) return handleUndo();
        if (
          (ev.key === 'Z' && ev.ctrlKey) ||
          (ev.key === 'y' && ev.ctrlKey)) return handleRedo();
        if (ev.key === 'Delete') {
          // todo: test MacOS
          return handleDelete()
        }
      }

      target.addEventListener('keydown', onKeyDown);

      return () => {
        target.removeEventListener('keydown', onKeyDown);
      }
    }
  }, [handleEscape, handleRedo, handleUndo])
}

export default useHandleKeys;