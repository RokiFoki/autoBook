import { ItemGroupProps } from "../types";
import Item from "./Item/Item";

const ItemGroup = ({ label, items }: ItemGroupProps) => {
  return (
    <div>
      <div>{label}</div>
      <div>
        {items.map((item) => (
          <Item {...item} />
        ))}
      </div>
    </div>
  );
};

export default ItemGroup;
