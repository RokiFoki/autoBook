import { useRecoilState } from "recoil";
import { AddItemType, selectedAddItem } from "../recoil/selectedAddItem";
import styles from "./DetailsPanel.module.css";

const DetailsPanel = () => {
  const [selectedItem] = useRecoilState(selectedAddItem);
  if (DetailsPanelContent({ item: selectedItem }) == null) return null;

  return (
    <aside className={styles.DetailsPanel}>
      <DetailsPanelContent item={selectedItem} />
    </aside>
  );
};

type Props = { item: AddItemType };
const DetailsPanelContent = ({ item }: Props) => {
  switch (item) {
    case "CorneredTable2":
    case "CorneredTable4":
    case "RoundedTable2":
    case "RoundedTable4":
      return <div></div>;
    case null:
      return null;
    default: {
      const _exhaustiveCheck: never = item;
      return null;
    }
  }
};

export default DetailsPanel;
