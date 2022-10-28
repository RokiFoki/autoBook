import ItemGroup from "./ItemGroup/ItemGroup";
import { ItemSelectorProps } from "./types";

const ItemSelector = ({ itemGroups }: ItemSelectorProps) => {
  return (
    <section>
      {itemGroups.map((itemGroup) => (
        <ItemGroup key={itemGroup.key ?? itemGroup.label} {...itemGroup} />
      ))}
    </section>
  );
};

export default ItemSelector;
