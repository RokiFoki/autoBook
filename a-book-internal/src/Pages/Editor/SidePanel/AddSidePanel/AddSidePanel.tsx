import styles from "./AddSidePanel.module.css";
import ItemSelector from "./ItemSelector/ItemSelector";

const AddSidePanel = () => {
  return (
    <div className={styles.AddSidePanel}>
      <ItemSelector
        itemGroups={[
          { items: [{ content: <div>123</div>, key: "123" }], label: "Tables" },
        ]}
      />
    </div>
  );
};

export default AddSidePanel;
