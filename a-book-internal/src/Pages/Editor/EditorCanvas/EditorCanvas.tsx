import styles from "./EditorCanvas.module.css";

const EditorCanvas = () => {
  return (
    <article className={styles.EditorCanvas}>
      <div className={styles.editorCanvasContent}></div>
    </article>
  );
};

export default EditorCanvas;
