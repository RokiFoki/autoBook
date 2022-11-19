import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useEvent from '../../../utils/hooks/useEvent';
import { operationInProgress } from '../recoil/operation';
import { selectedAddItemType } from '../recoil/selectedAddItemType';

const useHandleKeys = () => {
  const [operation, setOperation] = useRecoilState(operationInProgress);
  const [selectedItemTypeToAdd, setSelecteditemTypeToadd] = useRecoilState(selectedAddItemType)

  const handleEscape = useEvent(() => {
    if (operation === 'Add') {
      if (selectedItemTypeToAdd !== null) {
        return setSelecteditemTypeToadd(null)
      }

      return setOperation(null);
    }
  })

  const handleUndo = useEvent(() => {

  })

  const handleRedo = useEvent(() => {

  })

  useEffect(() => {
    const target = window;
    if (target) {

      const onKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') return handleEscape();
        if (ev.key === 'z' && ev.ctrlKey) return handleUndo();
        if (
          (ev.key === 'Z' && ev.ctrlKey) ||
          (ev.key === 'y' && ev.ctrlKey)) return handleRedo();
      }

      target.addEventListener('keydown', onKeyDown);

      return () => {
        target.removeEventListener('keydown', onKeyDown);
      }
    }
  }, [handleEscape, handleRedo, handleUndo])
}

export default useHandleKeys;