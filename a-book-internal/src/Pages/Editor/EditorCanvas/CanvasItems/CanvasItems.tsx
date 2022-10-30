import classNames from "classnames";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Table from "../../Elements/Tables/Table";
import { operationInProgress } from "../../recoil/operation";
import { ItemData } from "../EditorCanvas";
import styles from "./CanvasItems.module.css";

type CanvasItemsProps = {
  items: ItemData[];
};

const CanvasItems = ({ items }: CanvasItemsProps) => {
  const [operation] = useRecoilState(operationInProgress);
  const [selectedItems, setSelecteditems] = useState<ItemData["key"][]>([]);
  const selectItem = (key: ItemData["key"]) => {
    if (operation === "Select") {
      setSelecteditems([key]);
    }
  };

  return (
    <>
      {items.map(({ x, y, itemType, key }) => (
        <div
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
