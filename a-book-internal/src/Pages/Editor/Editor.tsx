import classNames from "classnames";
import layoutStyles from "../Shared/layout.module.css";
import styles from "./Editor.module.css";
import EditorCanvas from "./EditorCanvas/EditorCanvas";
import EditorMenu from "./EditorMenu/EditorMenu";
import SidePanel from "./SidePanel/SidePanel";

const Editor = () => {
  return (
    <main className={styles.Editor}>
      <EditorMenu />
      <section className={styles.content}>
        <SidePanel />
        <EditorCanvas />
      </section>
      <aside>right</aside>
    </main>
  );
};

export default Editor;
