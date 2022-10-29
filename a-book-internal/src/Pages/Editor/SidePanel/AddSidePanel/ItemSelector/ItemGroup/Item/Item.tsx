import classNames from "classnames";
import { ItemProps } from "../../types";
import styles from "./Item.module.css";

const Item = <ITEM_KEY extends string>({
  content,
  selected,
  onSelect,
}: ItemProps<ITEM_KEY>) => {
  return (
    <div
      className={classNames(styles.Item, { [styles.selected]: selected })}
      onClick={() => onSelect()}
    >
      {content}
    </div>
  );
};

export default Item;
