import RedoOutlined from "@ant-design/icons/lib/icons/RedoOutlined";
import UndoOutlined from "@ant-design/icons/lib/icons/UndoOutlined";
import { Button } from "antd";
import { useSetRecoilState } from "recoil";
import useUndoRedoActions from "../../../recoil/history/useUndoRedoActions";
import canvasZoom from "../../recoil/canvasZoom";
import updateCanvasZoom from "../../utils/canvasTransformHelpers/updateCanvasZoom";
import styles from "./FooterControls.module.css";

const FooterControls = () => {
  const setCanvasZoom = useSetRecoilState(canvasZoom);
  const updateZoom =
    (offset: number): React.MouseEventHandler =>
    (e) => {
      e.stopPropagation();
      updateCanvasZoom(setCanvasZoom, offset);
    };

  const undoRedo = useUndoRedoActions();

  return (
    <section className={styles.FooterControls}>
      <Button
        size="small"
        disabled={!undoRedo.undo.enabled}
        onClick={() => undoRedo.undo.action()}
      >
        <UndoOutlined />
      </Button>
      <Button
        size="small"
        disabled={!undoRedo.redo.enabled}
        onClick={() => undoRedo.redo.action()}
      >
        <RedoOutlined />
      </Button>
      <div style={{ flexGrow: 1 }}></div>
      <div>
        <Button size="small" onClick={updateZoom(0.1)}>
          +
        </Button>
        <Button size="small" onClick={updateZoom(-0.1)}>
          -
        </Button>
      </div>
    </section>
  );
};

export default FooterControls;
