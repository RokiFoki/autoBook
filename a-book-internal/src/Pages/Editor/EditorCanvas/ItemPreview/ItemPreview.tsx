import { MouseEventHandler, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import useEvent from "../../../../utils/hooks/useEvent";
import usePersistentState from "../../../../utils/hooks/usePersistentState";
import Table from "../../Elements/Tables/Table";
import { selectedAddItemType } from "../../recoil/selectedAddItemType";
import { ItemData } from "../../recoil/canvas/canvasItems";
import styles from "./ItemPreview.module.css";
import canvasZoom from "../recoil/canvasZoom";

const useTablePreview = (
  containerRef: React.RefObject<HTMLElement>,
  show: boolean,
  tableRef: React.RefObject<HTMLDivElement>
) => {
  const boundingBoxRef = useRef<DOMRect | undefined>(undefined);
  const zoom = useRecoilValue(canvasZoom);

  const setPreview = useEvent((e: MouseEvent) => {
    if (tableRef.current && boundingBoxRef.current && show) {
      tableRef.current.style.display = "initial";
      tableRef.current.style.left = `${e.x}px`;
      tableRef.current.style.top = `${e.y}px`;
    }
  });

  useEffect(() => {
    if (show) {
      const onMouseMove = (e: MouseEvent) => {
        setPreview(e);
      };
      containerRef.current?.addEventListener("mousemove", onMouseMove);
      boundingBoxRef.current = containerRef.current?.getBoundingClientRect();

      const root = containerRef.current;
      return () => root?.removeEventListener("mousemove", onMouseMove);
    } else {
      if (tableRef.current) {
        tableRef.current.style.display = "none";
      }
    }
  }, [show, containerRef, boundingBoxRef, setPreview, tableRef]);
};

type ItemPreviewProps = {
  show: boolean;
  scrollableContainerRef: React.RefObject<HTMLElement>;
  onAddItem: (item: ItemData) => unknown;
};
const ItemPreview = ({
  show,
  scrollableContainerRef,
  onAddItem,
}: ItemPreviewProps) => {
  const [cnt, setCnt] = usePersistentState<number>(1, "Editor/ItemPreview/cnt");
  const item = useRecoilValue(selectedAddItemType);

  const tableRef = useRef<HTMLDivElement>(null);
  useTablePreview(scrollableContainerRef, show, tableRef);
  const zoom = useRecoilValue(canvasZoom);

  const addItem: MouseEventHandler = (e) => {
    if (!tableRef.current || !item || !scrollableContainerRef.current) return;
    const { x, y, width, height } = tableRef.current.getBoundingClientRect();
    const { x: rootX, y: rootY } =
      scrollableContainerRef.current.getBoundingClientRect();

    setCnt(cnt + 1);
    onAddItem({
      id: cnt,
      name: `Table${cnt}`,
      itemType: item,
      x: Math.round(
        (x - rootX - width / 2 + scrollableContainerRef.current.scrollLeft) /
          zoom
      ),
      y: Math.round(
        (y - rootY - height / 2 + scrollableContainerRef.current.scrollTop) /
          zoom
      ),
      rotation: 0,
    });
  };

  return (
    <div
      ref={tableRef}
      className={styles.table}
      onClick={addItem}
      style={{ transform: `scale(${zoom})`, transformOrigin: "left top" }}
    >
      {item && <Table type={item} />}
    </div>
  );
};

export default ItemPreview;
