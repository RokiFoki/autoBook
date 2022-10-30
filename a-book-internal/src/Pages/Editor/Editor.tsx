import DetailsPanel from "./DetailsPanel/DetailsPanel";
import styles from "./Editor.module.css";
import EditorCanvas from "./EditorCanvas/EditorCanvas";
import EditorMenu from "./EditorMenu/EditorMenu";
import RecoilController from "./recoil/RecoilController";
import SidePanel from "./SidePanel/SidePanel";

const Editor = () => {
  return (
    <main className={styles.Editor}>
      <RecoilController />
      <EditorMenu />
      <section className={styles.content}>
        <SidePanel />
        <EditorCanvas />
      </section>
      <DetailsPanel />
    </main>
  );
};

export default Editor;
