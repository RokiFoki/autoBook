import classNames from "classnames";
import layoutStyles from "../Shared/layout.module.css";
import styles from "./Editor.module.css";
import EditorMenu from "./EditorMenu/EditorMenu";

const Editor = () => {
  return (
    <main className={styles.Editor}>
      <EditorMenu />
      <section
        className={classNames(styles.content, layoutStyles.layoutPadding)}
      >
        Editor
      </section>
      <aside>right</aside>
    </main>
  );
};

export default Editor;
