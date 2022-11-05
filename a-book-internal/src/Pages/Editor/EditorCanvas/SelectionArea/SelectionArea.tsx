import type { Area } from "./useEditorSelectedArea";
import styles from "./SelectionArea.module.css";
import { useRecoilValue } from "recoil";
import { operationInProgress } from "../../recoil/operation";
import getBoxFromArea from "./utils/getBoxFromArea";

type SelectionAreaProps = {
  area: Area | null;
};

const SelectionArea = ({ area }: SelectionAreaProps) => {
  const operation = useRecoilValue(operationInProgress);
  if (area == null || operation !== "Select") return null;

  const { top, left, width, height } = getBoxFromArea(area);

  return (
    <div
      className={styles.SelectionArea}
      style={{
        top,
        left,
        width,
        height,
      }}
    ></div>
  );
};

export default SelectionArea;
