import classNames from "classnames";
import { useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { canvasItems, ItemData } from "../recoil/canvas/canvasItems";
import { selectedCanvasItems } from "../recoil/canvas/selectedCanvasItems";
import { operationInProgress } from "../recoil/operation";
import CanvasItems from "./CanvasItems/CanvasItems";
import FooterControls from "./Controls/FooterControls/FooterControls";
import styles from "./EditorCanvas.module.css";
import useMouseOn from "./hooks/useMouseOn";
import ItemPreview from "./ItemPreview/ItemPreview";
import canvasZoom from "./recoil/canvasZoom";
import SelectionArea from "./SelectionArea/SelectionArea";
import useEditorSelectedArea from "./SelectionArea/useEditorSelectedArea";

const EditorCanvas = () => {
  const operation = useRecoilValue(operationInProgress);
  const [items, setItems] = useRecoilState(canvasItems);
  const setSelectedItems = useSetRecoilState(selectedCanvasItems);
  const editorRef = useRef<HTMLElement>(null);

  const { isMouseOver } = useMouseOn(editorRef);
  const selectedArea = useEditorSelectedArea(editorRef, (area) => {
    //console.log(area);
  });

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
        className={classNames(
          styles.editorCanvasContent,
          operation && styles[operation]
        )}
        style={{ transform: `scale(${zoom})`, transformOrigin: "left top" }}
        onDragOver={onDragOver}
        onDrop={() => null}
      >
        <CanvasItems items={items} selectedArea={selectedArea} />

        <ItemPreview
          onAddItem={addItem}
          rootRef={editorRef}
          show={isMouseOver && operation === "Add"}
        />

        <SelectionArea area={selectedArea} />
      </div>
      <FooterControls />
    </article>
  );
};

export default EditorCanvas;
