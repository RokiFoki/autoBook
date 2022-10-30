import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { operationInProgress } from "../recoil/operation";
import { AddItemType } from "../recoil/selectedAddItem";
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

export type ItemData = {
  key: string;
  itemType: Exclude<AddItemType, null>;
  x: number;
  y: number;
};
const EditorCanvas = () => {
  const [operation] = useRecoilState(operationInProgress);
  const { elementRef, isMouseOver } = useMouseOn();

  const [items, setItems] = useState<ItemData[]>([]);

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
