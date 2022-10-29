import { ItemProps } from "../../types";
import styles from "./Item.module.css";

const Item = <ITEM_KEY extends string>({ content }: ItemProps<ITEM_KEY>) => {
  return <div className={styles.Item}>{content}</div>;
};

export default Item;
