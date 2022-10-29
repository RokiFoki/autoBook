import styles from "./DetailsPanel.module.css";

const DetailsPanel = () => {
  if (DetailsPanelContent() == null) return null;

  return (
    <aside className={styles.DetailsPanel}>
      <DetailsPanelContent />
    </aside>
  );
};

const DetailsPanelContent = () => {
  return null;
};

export default DetailsPanel;
