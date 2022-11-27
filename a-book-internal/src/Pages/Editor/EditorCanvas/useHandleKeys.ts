import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useEvent from '../../../utils/hooks/useEvent';
import useRemoveItems from '../actions/useRemoveItems';
import useUpdateTableItems from '../DetailsPanel/Forms/TableForm/hooks/useUpdateTableItems';
import { canvasItemsMap } from '../recoil/canvas/canvasItems';
import { selectedCanvasItems } from '../recoil/canvas/selectedCanvasItems';
import useUndoRedoActions from '../recoil/history/useUndoRedoActions';
import { Operation, operationInProgress } from '../recoil/operation';
import { selectedAddItemType } from '../recoil/selectedAddItemType';

const defaultOperation: Operation = null;

const useHandleKeys = (isEditorFocused: boolean, editorRef: React.RefObject<HTMLElement>) => {
  const [operation, setOperation] = useRecoilState(operationInProgress);
  const [selectedItemTypeToAdd, setSelecteditemTypeToadd] = useRecoilState(selectedAddItemType)
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCanvasItems);
  const updateCanvasItems = useUpdateTableItems();
  const itemsMap = useRecoilValue(canvasItemsMap);
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

  const onKeyDown = useEvent((ev: KeyboardEvent) => {
    if (ev.key === 'Escape') return handleEscape();
    if (ev.key === 'z' && ev.ctrlKey) return handleUndo();
    if (
      (ev.key === 'Z' && ev.ctrlKey) ||
      (ev.key === 'y' && ev.ctrlKey)) return handleRedo();
    if (ev.key === 'Delete') {
      // todo: test MacOS
      return handleDelete()
    }

    if (selectedItems?.length) {
      if (ev.key === 'ArrowRight') {
        ev.preventDefault(); // scrolling
        return updateCanvasItems(selectedItems.map(id => {
          const item = itemsMap[id]
          return { ...item, x: item.x + 1 };
        }))
      } else if (ev.key === 'ArrowLeft') {
        ev.preventDefault(); // scrolling
        return updateCanvasItems(selectedItems.map(id => {
          const item = itemsMap[id]
          return { ...item, x: Math.max(item.x - 1, 0) };
        }))
      } else if (ev.key === 'ArrowUp') {
        ev.preventDefault(); // scrolling
        return updateCanvasItems(selectedItems.map(id => {
          const item = itemsMap[id]
          return { ...item, y: Math.max(item.y - 1, 0) };
        }))
      } else if (ev.key === 'ArrowDown') {
        ev.preventDefault(); // scrolling
        return updateCanvasItems(selectedItems.map(id => {
          const item = itemsMap[id]
          return { ...item, y: item.y + 1 };
        }))
      }
    }
  })

  const onRightClick = useEvent((e: MouseEvent) => {
    e.preventDefault();

    if (operation === 'Add' && selectedItemTypeToAdd !== null) {
      return setSelecteditemTypeToadd(null)
    }
  })

  useEffect(() => {
    const target = window;
    if (target) {

      target.addEventListener('keydown', onKeyDown);
      target.addEventListener('contextmenu', onRightClick)
      return () => {
        target.removeEventListener('keydown', onKeyDown);
        target.removeEventListener('contextmenu', onRightClick)
      }
    }
  }, [handleEscape, handleRedo, handleUndo, onKeyDown])
}

export default useHandleKeys;