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
  _onSelect: (area: Area) => unknown
) => {
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const selectedAreaRef = useStateRef(selectedArea);

  const onSelect = useEvent(_onSelect);
  const zoom = useRecoilValue(canvasZoom);

  useEffect(() => {
    if (ref.current) {
      const target = ref.current;
      const onMouseDown = (e: MouseEvent) => {
        const rect = target.getBoundingClientRect();
        setSelectedArea({
          startX: (e.clientX - rect.x) / zoom + target.scrollLeft,
          startY: (e.clientY - rect.y) / zoom + target.scrollTop,
          endX: (e.clientX - rect.x) / zoom + target.scrollLeft,
          endY: (e.clientY - rect.y) / zoom + target.scrollTop,
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
            endX: (e.clientX - rect.x) / zoom + target.scrollLeft,
            endY: (e.clientY - rect.y) / zoom + target.scrollTop,
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
  }, [onSelect, ref, selectedAreaRef, zoom]);

  return selectedArea;
};

export default useEditorSelectedArea;