import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import useEvent from "../../../../utils/hooks/useEvent";
import canvasZoom from "../recoil/canvasZoom";
import styles from "./Draggable.module.css";

type Position = { x: number; y: number };
export type DraggOffset = Position;

type DraggableProps = {
  enable: boolean;
  onDrag: (offset: DraggOffset) => unknown;
  containerRef: React.RefObject<HTMLElement>;
};
const Draggable = ({
  enable,
  children,
  onDrag: _onDrag,
  containerRef,
}: React.PropsWithChildren<DraggableProps>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const startPositionRef = useRef<Position | null>(null);
  const onDrag = useEvent(_onDrag);

  let zoom = useRecoilValue(canvasZoom);

  useEffect(() => {
    if (ref.current && enable && containerRef.current) {
      const target = ref.current;
      const editorBoundingRect = containerRef.current.getBoundingClientRect();
      const onMouseMove = (e: MouseEvent) => {
        if (duplicatedDiv && startPositionRef.current && containerRef.current) {
          const x =
            editorBoundingRect.x +
            e.x -
            startPositionRef.current.x -
            containerRef.current.scrollLeft;
          const y =
            editorBoundingRect.y +
            e.y -
            startPositionRef.current.y -
            containerRef.current.scrollTop;
          duplicatedDiv.style.left = `${x.toString()}px`;
          duplicatedDiv.style.top = `${y.toString()}px`;
        }
      };

      let duplicatedDiv: HTMLDivElement;
      const onDragStart = (e: MouseEvent) => {
        if (ref.current && containerRef.current) {
          setDragging(true);
          duplicatedDiv = ref.current.cloneNode(true) as HTMLDivElement;

          duplicatedDiv.classList.add(styles.draggableIcon);

          duplicatedDiv.style.transform = `scale(${zoom})`;
          duplicatedDiv.style.transformOrigin = "left top";

          const x = editorBoundingRect.x - containerRef.current.scrollLeft;
          const y = editorBoundingRect.y - containerRef.current.scrollTop;
          duplicatedDiv.style.left = `${x.toString()}px`;
          duplicatedDiv.style.top = `${y.toString()}px`;
          duplicatedDiv.style.opacity = "0.5";
          const fullWidthDiv = document.createElement("div");
          fullWidthDiv.classList.add(styles.fullWidthDiv);
          duplicatedDiv.appendChild(fullWidthDiv);

          document.body.appendChild(duplicatedDiv);

          duplicatedDiv.addEventListener("mousemove", onMouseMove);
          duplicatedDiv.addEventListener("mouseup", onDragEnd);

          startPositionRef.current = { x: e.x, y: e.y };
        }

        return e.preventDefault();
      };

      const onDragEnd = (e: MouseEvent) => {
        setDragging(false);
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
      return () => {
        target.removeEventListener("dragstart", onDragStart);
      };
    }
  }, [ref, enable, onDrag, zoom, containerRef]);

  return (
    <div ref={ref} className={classNames({ [styles.dragging]: dragging })}>
      {children}
    </div>
  );
};

export default Draggable;
