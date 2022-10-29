import classNames from "classnames";
import { ItemGroupProps } from "../types";
import Item from "./Item/Item";
import styles from "./ItemGroup.module.css";

const ItemGroup = <ITEM_KEY extends string>({
  label,
  items,
  expanded,
  onToggle,
}: ItemGroupProps<ITEM_KEY>) => {
  return (
    <article
      className={classNames(styles.ItemGroup, {
        [styles.expanded]: expanded,
      })}
    >
      <div onClick={() => onToggle()} className={styles.groupLabel}>
        {label}
      </div>
      <div className={classNames(styles.groupContent)}>
        {items.map((item) => (
          <Item {...item} />
        ))}
      </div>
    </article>
  );
};

export default ItemGroup;
