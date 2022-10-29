import ItemGroup from "./ItemGroup/ItemGroup";
import { ItemSelectorProps } from "./types";
import usePersistentState from "utils/hooks/usePersistentState";

const ItemSelector = <ITEM_KEY extends string, GROUP_KEY extends string>({
  itemGroups,
  selected,
  onItemSelect,
}: ItemSelectorProps<ITEM_KEY, GROUP_KEY>) => {
  const [expanded, setExpanded] = usePersistentState<Array<GROUP_KEY>>(
    [],
    "AddSidePanel/ItemSelector/Expanded"
  );

  const onItemGroupToggle = (key: GROUP_KEY) => {
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
          onItemSelect={onItemSelect}
          selected={selected}
          expanded={expanded.includes(itemGroup.key)}
          onToggle={() => onItemGroupToggle(itemGroup.key)}
        />
      ))}
    </section>
  );
};

export default ItemSelector;
