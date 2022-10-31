import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { canvasItems, ItemData } from "../recoil/canvas/canvasItems";
import { selectedCanvasItems } from "../recoil/canvas/selectedCanvasItems";
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
  const operation = useRecoilValue(operationInProgress);
  const [items, setItems] = useRecoilState(canvasItems);
  const setSelectedItems = useSetRecoilState(selectedCanvasItems);

  const { elementRef, isMouseOver } = useMouseOn();
  const addItem = (item: ItemData) => {
    setItems([...items, item]);
    setSelectedItems([item.id]);
  };

  const onDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };
  return (
    <article className={styles.EditorCanvas} ref={elementRef}>
      <div
        className={classNames(
          styles.editorCanvasContent,
          operation && styles[operation]
        )}
        onDragOver={onDragOver}
        onDrop={() => null}
      >
        <CanvasItems items={items} />

        <ItemPreview
          onAddItem={addItem}
          rootRef={elementRef}
          show={isMouseOver && operation === "Add"}
        />
      </div>
    </article>
  );
};

export default EditorCanvas;
