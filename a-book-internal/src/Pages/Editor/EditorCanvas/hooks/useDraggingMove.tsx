import { useEffect, useRef } from "react";
import useStateRef from "../../../../utils/hooks/useStateRef";

type DragStartState = {
  mouseX: number;
  mouseY: number;
  scrollLeft: number;
  scrollTop: number;
};

const useDraggingMove = <T extends HTMLElement>(
  elementRef: React.RefObject<T>,
  enabled: boolean
) => {
  const {
    state: dragging,
    setter: setDragging,
    ref: draggingRef,
  } = useStateRef(false);

  const dragStartStateRef = useRef<DragStartState | null>(null);

  useEffect(() => {
    const target = elementRef?.current;

    if (target && enabled) {
      const onMouseDown = (ev: MouseEvent) => {
        setDragging(true);
        dragStartStateRef.current = {
          mouseX: ev.x,
          mouseY: ev.y,
          scrollLeft: target.scrollLeft,
          scrollTop: target.scrollTop,
        };
      };

      const onMouseUp = (ev: MouseEvent) => {
        setDragging(false);
      };

      const onMouseMove = (ev: MouseEvent) => {
        if (dragStartStateRef.current && draggingRef.current) {
          const diffX = ev.x - dragStartStateRef.current.mouseX;
          const diffY = ev.y - dragStartStateRef.current.mouseY;

          target.scrollLeft = dragStartStateRef.current.scrollLeft - diffX;
          target.scrollTop = dragStartStateRef.current.scrollTop - diffY;
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
  }, [draggingRef, elementRef, setDragging, enabled]);

  return dragging;
};

export default useDraggingMove;
