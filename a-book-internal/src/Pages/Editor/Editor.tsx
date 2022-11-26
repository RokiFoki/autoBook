import DetailsPanel from "./DetailsPanel/DetailsPanel";
import styles from "./Editor.module.css";
import EditorCanvas from "./EditorCanvas/EditorCanvas";
import EditorMenu from "./EditorMenu/EditorMenu";
import RecoilController from "./recoil/RecoilController";
import SidePanel from "./SidePanel/SidePanel";
import TableView from "./TableView/TableView";

const Editor = () => {
  return (
    <main className={styles.Editor}>
      <RecoilController />
      <EditorMenu />
      <section className={styles.content}>
        <div className={styles.panelAndCanvas}>
          <SidePanel />
          <EditorCanvas />
        </div>
        <TableView />
      </section>
      <DetailsPanel />
    </main>
  );
};

export default Editor;
