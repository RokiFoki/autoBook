import ItemGroup from "./ItemGroup/ItemGroup";
import { ItemSelectorProps } from "./types";
import usePersistentState from "utils/hooks/usePersistentState";
import { useEffect } from "react";

type ItemGroupKey = ItemSelectorProps["itemGroups"][number]["key"];
const ItemSelector = ({ itemGroups }: ItemSelectorProps) => {
  const [expanded, setExpanded] = usePersistentState<Array<ItemGroupKey>>(
    [],
    "AddSidePanel/ItemSelector/Expanded"
  );

  const onItemGroupToggle = (key: ItemGroupKey) => {
    if (expanded.includes(key)) {
      setExpanded(expanded.filter((eKey) => eKey !== key));
    } else {
      setExpanded([...expanded, key]);
    }
  };

  return (
    <section>
      {itemGroups.map((itemGroup) => (
        <ItemGroup
          {...itemGroup}
          expanded={expanded.includes(itemGroup.key)}
          onToggle={() => onItemGroupToggle(itemGroup.key)}
        />
      ))}
    </section>
  );
};

export default ItemSelector;
