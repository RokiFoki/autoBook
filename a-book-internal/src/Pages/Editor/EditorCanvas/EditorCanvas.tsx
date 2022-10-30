import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { canvasItems } from "../recoil/canvas/canvasItems";
import { operationInProgress } from "../recoil/operation";
import CanvasItems from "./CanvasItems/CanvasItems";
import styles from "./EditorCanvas.module.css";
import ItemPreview from "./ItemPreview/ItemPreview";

const useMouseOn = <T extends HTMLElement>() => {
  const [isMouseOver, setIsOver] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (elementRef.current) {
      const onMouseOver = (e: MouseEvent) => {
        setIsOver(true);
      };

      const onMouseLeave = (e: MouseEvent) => {
        setIsOver(false);
      };

      elementRef.current.addEventListener("mouseover", onMouseOver);
      elementRef.current.addEventListener("mouseleave", onMouseLeave);

      const element = elementRef.current;
      return () => {
        element.removeEventListener("mouseover", onMouseOver);
        element.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [elementRef]);

  return { elementRef, isMouseOver };
};

const EditorCanvas = () => {
  const [operation] = useRecoilState(operationInProgress);
  const [items, setItems] = useRecoilState(canvasItems);

  const { elementRef, isMouseOver } = useMouseOn();

  return (
    <article className={styles.EditorCanvas} ref={elementRef}>
      <div
        className={classNames(
          styles.editorCanvasContent,
          operation && styles[operation]
        )}
      >
        <CanvasItems items={items} />

        <ItemPreview
          onAddItem={(item) => setItems([...items, item])}
          rootRef={elementRef}
          show={isMouseOver && operation === "Add"}
        />
      </div>
    </article>
  );
};

export default EditorCanvas;
