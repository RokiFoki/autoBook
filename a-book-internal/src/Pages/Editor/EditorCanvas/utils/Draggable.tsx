import React, { useEffect, useRef } from "react";
import useEvent from "../../../../utils/hooks/useEvent";

type Position = { x: number; y: number };
export type DraggOffset = Position;

type DraggableProps = {
  enable: boolean;
  onDrag: (offset: DraggOffset) => unknown;
};
const Draggable = ({
  enable,
  children,
  onDrag: _onDrag,
}: React.PropsWithChildren<DraggableProps>) => {
  const ref = useRef<HTMLDivElement>(null);
  const startPositionRef = useRef<Position | null>(null);
  const onDrag = useEvent(_onDrag);

  useEffect(() => {
    if (ref.current && enable) {
      const target = ref.current;

      const X = "clientX";
      const Y = "clientY";
      const onDragStart = (e: DragEvent) => {
        startPositionRef.current = { x: e[X], y: e[Y] };
      };

      const onDragEnd = (e: DragEvent) => {
        if (!startPositionRef.current) return;

        onDrag({
          x: e[X] - startPositionRef.current.x,
          y: e[Y] - startPositionRef.current.y,
        });
      };

      target.addEventListener("dragstart", onDragStart);
      target.addEventListener("dragend", onDragEnd);

      return () => {
        target.removeEventListener("dragstart", onDragStart);
        target.removeEventListener("dragend", onDragEnd);
      };
    }
  }, [ref, enable, onDrag]);

  return (
    <div ref={ref} draggable="true">
      {children}
    </div>
  );
};

export default Draggable;
