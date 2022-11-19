import classNames from "classnames";
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import Table from "../../Elements/Tables/Table";
import { operationInProgress } from "../../recoil/operation";
import { canvasItems, ItemData } from "../../recoil/canvas/canvasItems";
import styles from "./CanvasItems.module.css";
import { selectedCanvasItems } from "../../recoil/canvas/selectedCanvasItems";
import Draggable, { DraggOffset } from "../utils/Draggable";
import { Area } from "../SelectionArea/useEditorSelectedArea";
import { useEffect, useRef } from "react";
import getBoxFromArea from "../SelectionArea/utils/getBoxFromArea";

type CanvasItemsProps = {
  items: ItemData[];
  selectedArea: Area | null;
};

const useUpdateSelectedItemsFromArea = (
  area: CanvasItemsProps["selectedArea"],
  items: ItemData[],
  selectedItems: number[],
  setSelectedItems: SetterOrUpdater<number[]>
) => {
  // this could be converted into a reactive approach using recil selector (area + items) => selectedItems
  useEffect(() => {
    if (area) {
      const box = getBoxFromArea(area);
      const newSelectedItems = items
        .filter(
          (item) =>
            item.x >= box.left &&
            item.x <= box.left + box.width &&
            item.y >= box.top &&
            item.y <= box.top + box.height
        )
        .map((item) => item.id);

      if (
        newSelectedItems.some((item, i) => selectedItems[i] !== item) ||
        newSelectedItems.length !== selectedItems.length
      ) {
        setSelectedItems(newSelectedItems.sort());
      }
    }
  }, [area, setSelectedItems, items, selectedItems]);
};

const CanvasItems = ({ items, selectedArea }: CanvasItemsProps) => {
  const operation = useRecoilValue(operationInProgress);
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCanvasItems);
  useUpdateSelectedItemsFromArea(
    selectedArea,
    items,
    selectedItems,
    setSelectedItems
  );

  const selectItem = (id: ItemData["id"]) => {
    if (operation === "Select") {
      setSelectedItems([id]);
    }
  };
  const setItems = useSetRecoilState(canvasItems);
  const updateItems = (updatedItems: ItemData[]) => {
    const updateditemsMap = updatedItems.reduce((a, c) => {
      a[c.id] = c;
      return a;
    }, {} as Record<ItemData["id"], ItemData>);

    setItems((items) => items.map((item) => updateditemsMap[item.id] ?? item));
  };

  const updateItemPosition = (items: ItemData[]) => (position: DraggOffset) => {
    updateItems(
      items.map((item) => ({
        ...item,
        x: Math.round(item.x + position.x),
        y: Math.round(item.y + position.y),
      }))
    );
  };

  const onItemClick =
    (id: ItemData["id"]): React.MouseEventHandler =>
    (e) => {
      selectItem(id);
    };

  const selectdItems = items.filter(({ id }) => selectedItems.includes(id));
  const notSelectdItems = items.filter(({ id }) => !selectedItems.includes(id));

  return (
    <>
      <Draggable enable onDrag={updateItemPosition(selectdItems)}>
        {selectdItems.map((item) => {
          const { x, y, itemType, id, rotation } = item;
          return (
            <TransformDiv
              key={id}
              x={x}
              y={y}
              rotation={rotation}
              divProps={{
                onClick: onItemClick(id),
                className: classNames(styles.selectedItem),
              }}
            >
              <Table type={itemType} />
            </TransformDiv>
          );
        })}
      </Draggable>

      {notSelectdItems.map((item) => {
        const { x, y, itemType, id, rotation } = item;
        return (
          <TransformDiv
            key={id}
            x={x}
            y={y}
            rotation={rotation}
            divProps={{
              onClick: onItemClick(id),

              className: classNames(styles.item, {
                [styles.selectable]: operation === "Select",
              }),
            }}
          >
            <Table type={itemType} />
          </TransformDiv>
        );
      })}
    </>
  );
};

type TransformDivProps = {
  x: number;
  y: number;
  rotation: number;
  stopPropagationOnMouseDown?: boolean;
  divProps: React.HTMLProps<HTMLDivElement>;
};
const TransformDiv = ({
  x,
  y,
  rotation,
  stopPropagationOnMouseDown = true,
  children,
  divProps,
}: React.PropsWithChildren<TransformDivProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && stopPropagationOnMouseDown) {
      const target = ref.current;
      const onMouseDown = (e: MouseEvent) => {
        e.stopPropagation();
      };

      target.addEventListener("mousedown", onMouseDown);
      return () => {
        target.removeEventListener("mousedown", onMouseDown);
      };
    }
  }, [ref, stopPropagationOnMouseDown]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: y,
        left: x,
        transform: `rotate(${rotation}deg)`,
      }}
      {...divProps}
    >
      {children}
    </div>
  );
};

export default CanvasItems;
