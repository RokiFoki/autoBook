import { useRecoilState } from "recoil";
import Table from "../../Elements/Tables/Table";
import { selectedAddItemType } from "../../recoil/selectedAddItemType";
import styles from "./AddSidePanel.module.css";
import ItemSelector from "./ItemSelector/ItemSelector";

const AddSidePanel = () => {
  const [selectedItemType, setSelectedItemType] =
    useRecoilState(selectedAddItemType);

  return (
    <div className={styles.AddSidePanel}>
      <ItemSelector
        onItemSelect={(itemKey) => setSelectedItemType(itemKey)}
        selected={selectedItemType}
        itemGroups={[
          {
            items: [
              { content: <Table type="RoundedTable2" />, key: "RoundedTable2" },
              { content: <Table type="RoundedTable4" />, key: "RoundedTable4" },
              {
                content: <Table type="CorneredTable2" />,
                key: "CorneredTable2",
              },
              {
                content: <Table type="CorneredTable4" />,
                key: "CorneredTable4",
              },
            ],
            label: "Tables",
            key: "Tables",
          },
          {
            label: "Decoration",
            key: "Decoration",
            items: [{ content: <div>333</div>, key: "CorneredTable4" }],
          },

          {
            label: "Saved",
            key: "Saved",
            items: [{ content: <div>444</div>, key: "CorneredTable4" }],
          },
        ]}
      />
    </div>
  );
};

export default AddSidePanel;
