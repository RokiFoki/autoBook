import styles from "./AddSidePanel.module.css";
import ItemSelector from "./ItemSelector/ItemSelector";

const AddSidePanel = () => {
  return (
    <div className={styles.AddSidePanel}>
      <ItemSelector
        itemGroups={[
          {
            items: [
              { content: <div>123</div>, key: "123" },
              { content: <div>222</div>, key: "222" },
            ],
            label: "Tables",
            key: "Tables",
          },
          {
            label: "Decoration",
            key: "Decoration",
            items: [{ content: <div>333</div>, key: "333" }],
          },
        ]}
      />
    </div>
  );
};

export default AddSidePanel;
