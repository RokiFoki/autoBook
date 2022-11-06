import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import useEvent from "../../../../utils/hooks/useEvent";
import canvasZoom from "../recoil/canvasZoom";
import styles from "./Draggable.module.css";

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

  let zoom = useRecoilValue(canvasZoom);

  useEffect(() => {
    if (ref.current && enable) {
      const target = ref.current;

      let duplicatedDiv: HTMLDivElement;
      const onDragStart = (e: DragEvent) => {
        if (e.dataTransfer && ref.current) {
          duplicatedDiv = ref.current.cloneNode(true) as HTMLDivElement;
          const firstChild = ref.current.firstChild as HTMLDivElement;
          const rect = firstChild.getBoundingClientRect();
          (duplicatedDiv.firstChild as HTMLDivElement).className = "";
          duplicatedDiv.classList.add(styles.draggableIcon);
          (
            duplicatedDiv.firstChild as HTMLDivElement
          ).style.transform = `scale(${zoom})`;
          (duplicatedDiv.firstChild as HTMLDivElement).style.transformOrigin =
            "left top";
          document.body.appendChild(duplicatedDiv);

          e.dataTransfer.setDragImage(
            duplicatedDiv,
            rect.width / 2,
            rect.height / 2
          );
          startPositionRef.current = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };
        }
      };

      const onDragEnd = (e: DragEvent) => {
        if (!startPositionRef.current) return;

        onDrag({
          x: (e.x - startPositionRef.current.x) / zoom,
          y: (e.y - startPositionRef.current.y) / zoom,
        });

        if (duplicatedDiv) {
          duplicatedDiv.remove();
        }
      };

      target.addEventListener("dragstart", onDragStart);
      target.addEventListener("dragend", onDragEnd);
      return () => {
        target.removeEventListener("dragstart", onDragStart);
        target.removeEventListener("dragend", onDragEnd);
      };
    }
  }, [ref, enable, onDrag, zoom]);

  return (
    <div ref={ref} draggable="true">
      {children}
    </div>
  );
};

export default Draggable;
