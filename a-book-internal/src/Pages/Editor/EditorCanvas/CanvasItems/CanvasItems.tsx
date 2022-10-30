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
  const selectItem = (key: ItemData["key"]) => {
    if (operation === "Select") {
      setSelecteditems([key]);
    }
  };

  return (
    <>
      {items.map(({ x, y, itemType, key }) => (
        <div
          key={key}
          style={{ position: "absolute", top: y, left: x }}
          onClick={() => selectItem(key)}
          className={classNames(styles.item, {
            [styles.selectedItem]: selectedItems.includes(key),
          })}
        >
          <Table type={itemType} />
        </div>
      ))}
    </>
  );
};

export default CanvasItems;
