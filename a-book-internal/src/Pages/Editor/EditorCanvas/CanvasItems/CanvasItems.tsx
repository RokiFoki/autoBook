import classNames from "classnames";
import { useRecoilState } from "recoil";
import Table from "../../Elements/Tables/Table";
import { operationInProgress } from "../../recoil/operation";
import { ItemData } from "../../recoil/canvas/canvasItems";
import styles from "./CanvasItems.module.css";
import { selectedCanvasItems } from "../../recoil/canvas/selectedCanvasItems";

type CanvasItemsProps = {
  items: ItemData[];
};

const CanvasItems = ({ items }: CanvasItemsProps) => {
  const [operation] = useRecoilState(operationInProgress);
  const [selectedItems, setSelecteditems] = useRecoilState(selectedCanvasItems);
  const selectItem = (id: ItemData["id"]) => {
    if (operation === "Select") {
      setSelecteditems([id]);
    }
  };

  return (
    <>
      {items.map(({ x, y, itemType, id, rotation }) => (
        <div
          key={id}
          style={{
            position: "absolute",
            top: y,
            left: x,
            transform: `rotate(${rotation}deg)`,
          }}
          onClick={() => selectItem(id)}
          className={classNames(styles.item, {
            [styles.selectedItem]: selectedItems.includes(id),
          })}
        >
          <Table type={itemType} />
        </div>
      ))}
    </>
  );
};

export default CanvasItems;
