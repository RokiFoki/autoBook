import classNames from "classnames";
import { ItemGroupProps } from "../types";
import Item from "./Item/Item";
import styles from "./ItemGroup.module.css";

const ItemGroup = ({ label, items, expanded, onToggle }: ItemGroupProps) => {
  return (
    <div>
      <div onClick={() => onToggle()}>{label}</div>
      <div
        className={classNames(styles.groupContent, {
          [styles.expanded]: expanded,
        })}
      >
        {items.map((item) => (
          <Item {...item} />
        ))}
      </div>
    </div>
  );
};

export default ItemGroup;
