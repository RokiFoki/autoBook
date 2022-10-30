import { useRecoilValue } from "recoil";
import type { ItemData } from "../recoil/canvas/canvasItems";

import styles from "./DetailsPanel.module.css";
import TableForm from "./Forms/TableForm/TableForm";
import getDetailsData from "./recoil/getDetailsData";

const DetailsPanel = () => {
  const selecteditem = useRecoilValue(getDetailsData);
  if (DetailsPanelContent({ itemData: selecteditem }) == null) return null;

  return (
    <aside className={styles.DetailsPanel}>
      <DetailsPanelContent itemData={selecteditem} />
    </aside>
  );
};

type Props = { itemData?: ItemData };
const DetailsPanelContent = ({ itemData }: Props) => {
  if (itemData == null) return null;
  switch (itemData.itemType) {
    case "CorneredTable2":
    case "CorneredTable4":
    case "RoundedTable2":
    case "RoundedTable4":
      return <TableForm data={itemData} />;
    case null:
      return null;
    default: {
      const _exhaustiveCheck: never = itemData.itemType;
      return null;
    }
  }
};

export default DetailsPanel;
