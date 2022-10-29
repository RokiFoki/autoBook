import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import useEvent from "../../../utils/hooks/useEvent";
import Table from "../Elements/Tables/Table";
import { selectedAddItem } from "../recoil/selectedAddItem";
import styles from "./EditorCanvas.module.css";

const useMouseOn = <T extends HTMLElement>() => {
  const [isOver, setIsOver] = useState(false);
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

  return { elementRef, isOver };
};

const useTablePreview = (
  rootRef: React.RefObject<HTMLElement>,
  isOver: boolean,
  tableRef: React.RefObject<HTMLDivElement>
) => {
  const boundingBoxRef = useRef<DOMRect | undefined>(undefined);

  const setPreview = useEvent((e: MouseEvent) => {
    if (tableRef.current && boundingBoxRef.current && isOver) {
      tableRef.current.style.display = "initial";
      tableRef.current.style.left = `${e.x - boundingBoxRef.current.x}px`;
      tableRef.current.style.top = `${e.y - boundingBoxRef.current.y}px`;
    }
  });

  useEffect(() => {
    if (isOver) {
      const onMouseMove = (e: MouseEvent) => {
        setPreview(e);
      };
      rootRef.current?.addEventListener("mousemove", onMouseMove);
      boundingBoxRef.current = rootRef.current?.getBoundingClientRect();

      const root = rootRef.current;
      return () => root?.removeEventListener("mousemove", onMouseMove);
    } else {
      if (tableRef.current) {
        tableRef.current.style.display = "none";
      }
    }
  }, [isOver, rootRef, boundingBoxRef, setPreview, tableRef]);
};

const EditorCanvas = () => {
  const [item] = useRecoilState(selectedAddItem);
  const { elementRef, isOver } = useMouseOn();
  const tableRef = useRef<HTMLDivElement>(null);
  useTablePreview(elementRef, isOver, tableRef);

  return (
    <article className={styles.EditorCanvas} ref={elementRef}>
      <div className={styles.editorCanvasContent}>
        <div ref={tableRef} className={styles.table}>
          {item && <Table type={item} />}
        </div>
      </div>
    </article>
  );
};

export default EditorCanvas;
