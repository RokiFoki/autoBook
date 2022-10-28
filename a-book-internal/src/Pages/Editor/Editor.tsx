import classNames from "classnames";
import { useRecoilState } from "recoil";
import layoutStyles from "../Shared/layout.module.css";
import styles from "./Editor.module.css";
import EditorMenu from "./EditorMenu/EditorMenu";
import { operationInProgress } from "./recoil/operation";
import SidePanel from "./SidePanel/SidePanel";

const Editor = () => {
  return (
    <main className={styles.Editor}>
      <EditorMenu />
      <section className={styles.content}>
        <SidePanel />
        <article className={layoutStyles.layoutPadding}>Editor</article>
      </section>
      <aside>right</aside>
    </main>
  );
};

export default Editor;
