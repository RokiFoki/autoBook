import classNames from "classnames";
import { useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { canvasItems, ItemData } from "../recoil/canvas/canvasItems";
import { selectedCanvasItems } from "../recoil/canvas/selectedCanvasItems";
import { operationInProgress } from "../recoil/operation";
import CanvasItems from "./CanvasItems/CanvasItems";
import FooterControls from "./Controls/FooterControls/FooterControls";
import styles from "./EditorCanvas.module.css";
import useDraggingMove from "./hooks/useDraggingMove";
import useMouseOn from "./hooks/useMouseOn";
import ItemPreview from "./ItemPreview/ItemPreview";
import canvasZoom from "./recoil/canvasZoom";
import SelectionArea from "./SelectionArea/SelectionArea";
import useEditorSelectedArea from "./SelectionArea/useEditorSelectedArea";
import useHandleKeys from "./useHandleKeys";
import {
  CanvasHeight,
  CanvasWitdh,
} from "./utils/canvasTransformHelpers/canvasDimensions";
import CursorEditorMovment from "./utils/canvasTransformHelpers/CursorEditorMovment";

const EditorCanvas = () => {
  const operation = useRecoilValue(operationInProgress);
  const [items, setItems] = useRecoilState(canvasItems);
  const setSelectedItems = useSetRecoilState(selectedCanvasItems);
  const editorRef = useRef<HTMLElement>(null);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  const { isMouseOver } = useMouseOn(editorRef);
  const dragging = useDraggingMove(scrollableContainerRef, operation === null);
  const selectedArea = useEditorSelectedArea(
    scrollableContainerRef,
    operation === "Select",
    (area) => {
      //console.log(area);
    }
  );

  useHandleKeys(isMouseOver, editorRef);
  const addItem = (item: ItemData) => {
    setItems([...items, item]);
    setSelectedItems([item.id]);
  };

  const onDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  const zoom = useRecoilValue(canvasZoom);

  return (
    <article className={styles.EditorCanvas} ref={editorRef}>
      <div
        ref={scrollableContainerRef}
        className={styles.EditorCanvasScrollable}
        style={{
          height: `100%`, // has to be style, for some reason :thinking:
          width: `100%`,
          overflow: "auto",
        }}
      >
        <div
          className={classNames(
            styles.editorCanvasContent,
            operation && styles[operation],
            {
              [styles["draggable"]]: !dragging && operation === null,
              [styles["dragging"]]: dragging,
            }
          )}
          style={{
            width: `${CanvasWitdh}px`,
            height: `${CanvasHeight}px`,
            transform: `scale(${zoom})`,
            transformOrigin: "left top",
          }}
          onDragOver={onDragOver}
          onDrop={() => null}
        >
          <CursorEditorMovment editorRef={editorRef} />
          <CanvasItems items={items} selectedArea={selectedArea} />

          <SelectionArea area={selectedArea} />
        </div>
        <ItemPreview
          onAddItem={addItem}
          scrollableContainerRef={scrollableContainerRef}
          show={isMouseOver && operation === "Add"}
        />
      </div>
      <FooterControls />
    </article>
  );
};

export default EditorCanvas;
