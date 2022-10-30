import { useRecoilState } from "recoil";
import {
  AddItemType,
  selectedAddItemType,
} from "../recoil/selectedAddItemType";
import styles from "./DetailsPanel.module.css";
import TableForm from "./Forms/TableForm/TableForm";

const DetailsPanel = () => {
  const [selectedItemType] = useRecoilState(selectedAddItemType);
  if (DetailsPanelContent({ type: selectedItemType }) == null) return null;

  return (
    <aside className={styles.DetailsPanel}>
      <DetailsPanelContent type={selectedItemType} />
    </aside>
  );
};

type Props = { type: AddItemType };
const DetailsPanelContent = ({ type }: Props) => {
  switch (type) {
    case "CorneredTable2":
    case "CorneredTable4":
    case "RoundedTable2":
    case "RoundedTable4":
      return <TableForm />;
    case null:
      return null;
    default: {
      const _exhaustiveCheck: never = type;
      return null;
    }
  }
};

export default DetailsPanel;
