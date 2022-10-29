import { useEffect, useRef, useState } from "react";
import Table from "../Elements/Tables/Table";
import { AddItem } from "../recoil/selectedAddItem";
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
  itemKey: Exclude<AddItem, null>;
  x: number;
  y: number;
};
const EditorCanvas = () => {
  const { elementRef, isMouseOver } = useMouseOn();

  const [items, setItems] = useState<ItemData[]>([]);

  return (
    <article className={styles.EditorCanvas} ref={elementRef}>
      <div className={styles.editorCanvasContent}>
        {items.map(({ x, y, itemKey }) => (
          <div style={{ position: "absolute", top: y, left: x }}>
            <Table type={itemKey} />
          </div>
        ))}

        <ItemPreview
          onAddItem={(item) => setItems([...items, item])}
          rootRef={elementRef}
          show={isMouseOver}
        />
      </div>
    </article>
  );
};

export default EditorCanvas;
