import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedCanvasItems } from "./canvas/selectedCanvasItems";
import { operationInProgress } from "./operation";

const RecoilController = () => {
  const operation = useRecoilValue(operationInProgress);
  const setSelectedItems = useSetRecoilState(selectedCanvasItems);

  useEffect(() => {
    if (operation !== "Select") setSelectedItems([]);
  }, [operation]);

  return null;
};

export default RecoilController;
