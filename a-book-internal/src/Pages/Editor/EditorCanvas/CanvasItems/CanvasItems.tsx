import classNames from "classnames";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import Table from "../../Elements/Tables/Table";
import { operationInProgress } from "../../recoil/operation";
import { ItemData } from "../../recoil/canvas/canvasItems";
import styles from "./CanvasItems.module.css";
import { selectedCanvasItems } from "../../recoil/canvas/selectedCanvasItems";
import Draggable, { DraggOffset } from "../utils/Draggable";
import { Area } from "../SelectionArea/useEditorSelectedArea";
import { useEffect, useRef } from "react";
import getBoxFromArea from "../SelectionArea/utils/getBoxFromArea";
import { selectedAddItemType } from "../../recoil/selectedAddItemType";
import useUpdateTableItems from "../../DetailsPanel/Forms/TableForm/hooks/useUpdateTableItems";

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
  const [operation, setOperation] = useRecoilState(operationInProgress);
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCanvasItems);
  const selectedTypeToAdd = useRecoilValue(selectedAddItemType);
  useUpdateSelectedItemsFromArea(
    selectedArea,
    items,
    selectedItems,
    setSelectedItems
  );

  const selectItem = (
    id: ItemData["id"],
    ev: React.MouseEvent<Element, MouseEvent>
  ) => {
    if (
      operation === null ||
      (operation === "Add" && selectedTypeToAdd === null)
    ) {
      setOperation("Select");
      setSelectedItems([id]);
    }

    if (operation === "Select") {
      if (ev.ctrlKey) {
        return setSelectedItems((itemIds) => {
          if (itemIds.includes(id))
            return itemIds.filter((item) => item !== id);

          return [...itemIds, id];
        });
      }

      setSelectedItems([id]);
    }
  };

  const updateItems = useUpdateTableItems();

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
      selectItem(id, e);
    };

  const selectedItemsData = items.filter(({ id }) =>
    selectedItems.includes(id)
  );
  const notSelectdItems = items.filter(({ id }) => !selectedItems.includes(id));

  return (
    <>
      <Draggable enable onDrag={updateItemPosition(selectedItemsData)}>
        {selectedItemsData.map((item) => {
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
                [styles.selectable]:
                  operation === "Select" || operation == null,
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
