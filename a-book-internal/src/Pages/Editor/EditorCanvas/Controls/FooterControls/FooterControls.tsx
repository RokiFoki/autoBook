import { Button } from "antd";
import { useSetRecoilState } from "recoil";
import canvasZoom from "../../recoil/canvasZoom";
import styles from "./FooterControls.module.css";

const FooterControls = () => {
  const setCanvasZoom = useSetRecoilState(canvasZoom);
  const updateZoom =
    (offset: number): React.MouseEventHandler =>
    (e) => {
      e.stopPropagation();
      setCanvasZoom((zoom) => {
        return Math.max(Math.min(zoom + offset, 2), 0.5);
      });
    };

  return (
    <section className={styles.FooterControls}>
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
