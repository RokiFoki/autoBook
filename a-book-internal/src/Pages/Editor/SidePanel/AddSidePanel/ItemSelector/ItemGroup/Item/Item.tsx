import { ItemProps } from "../../types";
import styles from "./Item.module.css";

const Item = ({ content }: ItemProps) => {
  return <div className={styles.Item}>{content}</div>;
};

export default Item;
