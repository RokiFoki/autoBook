import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useEvent from '../../../../utils/hooks/useEvent';
import useStateRef from '../../../../utils/hooks/useStateRef';
import canvasZoom from '../recoil/canvasZoom';

export type Area = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

const useEditorSelectedArea = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  enabled: boolean,
  _onSelect: (area: Area) => unknown
) => {
  const { ref: selectedAreaRef, state: selectedArea, setter: setSelectedArea } = useStateRef<Area | null>(null);

  const onSelect = useEvent(_onSelect);
  const zoom = useRecoilValue(canvasZoom);

  useEffect(() => {
    if (ref.current && enabled) {
      const target = ref.current;
      const onMouseDown = (e: MouseEvent) => {
        const rect = target.getBoundingClientRect();
        setSelectedArea({
          startX: (e.clientX - rect.x + target.scrollLeft) / zoom,
          startY: (e.clientY - rect.y + target.scrollTop) / zoom,
          endX: (e.clientX - rect.x + target.scrollLeft) / zoom,
          endY: (e.clientY - rect.y + target.scrollTop) / zoom,
        });
      };

      const onMouseUp = (e: MouseEvent) => {
        if (selectedAreaRef.current) {
          onSelect(selectedAreaRef.current);
          setSelectedArea(null);
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        if (selectedAreaRef.current) {
          const rect = target.getBoundingClientRect();
          setSelectedArea({
            ...selectedAreaRef.current,
            endX: (e.clientX - rect.x + target.scrollLeft) / zoom,
            endY: (e.clientY - rect.y + target.scrollTop) / zoom,
          });
        }
      };

      target.addEventListener("mousedown", onMouseDown);
      target.addEventListener("mouseup", onMouseUp);
      target.addEventListener("mousemove", onMouseMove);
      return () => {
        target.removeEventListener("mousedown", onMouseDown);
        target.removeEventListener("mouseup", onMouseUp);
        target.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, [enabled, onSelect, ref, selectedAreaRef, setSelectedArea, zoom]);

  return selectedArea;
};

export default useEditorSelectedArea;