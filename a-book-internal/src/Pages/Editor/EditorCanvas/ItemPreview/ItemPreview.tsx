import { MouseEventHandler, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import useEvent from "../../../../utils/hooks/useEvent";
import usePersistentState from "../../../../utils/hooks/usePersistentState";
import Table from "../../Elements/Tables/Table";
import { selectedAddItemType } from "../../recoil/selectedAddItemType";
import { ItemData } from "../../recoil/canvas/canvasItems";
import styles from "./ItemPreview.module.css";

const useTablePreview = (
  rootRef: React.RefObject<HTMLElement>,
  show: boolean,
  tableRef: React.RefObject<HTMLDivElement>
) => {
  const boundingBoxRef = useRef<DOMRect | undefined>(undefined);

  const setPreview = useEvent((e: MouseEvent) => {
    if (tableRef.current && boundingBoxRef.current && show) {
      tableRef.current.style.display = "initial";
      tableRef.current.style.left = `${e.x - boundingBoxRef.current.x}px`;
      tableRef.current.style.top = `${e.y - boundingBoxRef.current.y}px`;
    }
  });

  useEffect(() => {
    if (show) {
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
  }, [show, rootRef, boundingBoxRef, setPreview, tableRef]);
};

type ItemPreviewProps = {
  show: boolean;
  rootRef: React.RefObject<HTMLElement>;
  onAddItem: (item: ItemData) => unknown;
};
const ItemPreview = ({ show, rootRef, onAddItem }: ItemPreviewProps) => {
  const [cnt, setCnt] = usePersistentState<number>(1, "Editor/ItemPreview/cnt");
  const item = useRecoilValue(selectedAddItemType);

  const tableRef = useRef<HTMLDivElement>(null);
  useTablePreview(rootRef, show, tableRef);

  const addItem: MouseEventHandler = (e) => {
    if (!tableRef.current || !item || !rootRef.current) return;
    const { x, y, width, height } = tableRef.current.getBoundingClientRect();
    const { x: rootX, y: rootY } = rootRef.current.getBoundingClientRect();

    setCnt(cnt + 1);
    onAddItem({
      id: cnt,
      name: `Table${cnt}`,
      itemType: item,
      x: Math.round(x - rootX - width / 2),
      y: Math.round(y - rootY - height / 2),
      rotation: 0,
    });
  };

  return (
    <div ref={tableRef} className={styles.table} onClick={addItem}>
      {item && <Table type={item} />}
    </div>
  );
};

export default ItemPreview;
