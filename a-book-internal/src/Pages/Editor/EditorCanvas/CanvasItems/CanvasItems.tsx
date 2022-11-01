import classNames from "classnames";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Table from "../../Elements/Tables/Table";
import { operationInProgress } from "../../recoil/operation";
import { canvasItems, ItemData } from "../../recoil/canvas/canvasItems";
import styles from "./CanvasItems.module.css";
import { selectedCanvasItems } from "../../recoil/canvas/selectedCanvasItems";
import Draggable, { DraggOffset } from "../utils/Draggable";

type CanvasItemsProps = {
  items: ItemData[];
};

const CanvasItems = ({ items }: CanvasItemsProps) => {
  const operation = useRecoilValue(operationInProgress);
  const [selectedItems, setSelecteditems] = useRecoilState(selectedCanvasItems);
  const selectItem = (id: ItemData["id"]) => {
    if (operation === "Select") {
      setSelecteditems([id]);
    }
  };
  const setItems = useSetRecoilState(canvasItems);
  const updateItem = (updatedItem: ItemData) => {
    setItems((items) =>
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const updateItemPosition = (item: ItemData) => (position: DraggOffset) => {
    updateItem({
      ...item,
      x: Math.round(item.x + position.x - 3), // todo: this needs fixing
      y: Math.round(item.y + position.y - 3),
    });
  };

  return (
    <>
      {items.map((item) => {
        const { x, y, itemType, id, rotation } = item;
        const isSelected = selectedItems.includes(id);
        return (
          <Draggable enable key={id} onDrag={updateItemPosition(item)}>
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
                [styles.selectedItem]: isSelected,
                [styles.selectable]: !isSelected && operation === "Select",
              })}
            >
              <Table type={itemType} />
            </div>
          </Draggable>
        );
      })}
    </>
  );
};

export default CanvasItems;