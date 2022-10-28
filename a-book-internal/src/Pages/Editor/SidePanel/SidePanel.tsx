import { useRecoilState } from "recoil";
import { operationInProgress } from "../recoil/operation";
import AddSidePanel from "./AddSidePanel/AddSidePanel";

const SidePanel = () => {
  const [operation] = useRecoilState(operationInProgress);

  switch (operation) {
    case "Add":
      return <AddSidePanel />;
    case null:
      return null;
    default: {
      const _exhaustiveCheck: never = operation;
      return null;
    }
  }
};

export default SidePanel;
