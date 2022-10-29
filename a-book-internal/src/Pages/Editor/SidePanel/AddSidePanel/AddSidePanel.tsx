import Table from "../../Elements/Tables/Table";
import styles from "./AddSidePanel.module.css";
import ItemSelector from "./ItemSelector/ItemSelector";

const AddSidePanel = () => {
  return (
    <div className={styles.AddSidePanel}>
      <ItemSelector
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
            items: [{ content: <div>333</div>, key: "333" }],
          },

          {
            label: "Saved",
            key: "Saved",
            items: [{ content: <div>444</div>, key: "444" }],
          },
        ]}
      />
    </div>
  );
};

export default AddSidePanel;
