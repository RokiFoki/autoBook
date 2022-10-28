import styles from "./EditorMenu.module.css";
import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { Operation, operationInProgress } from "../recoil/operation";

type Options = Array<{
  icon: React.ReactElement;
  text: string;
  key: Operation;
}>;
const options: Options = [
  { icon: <PlusOutlined />, text: "Add new", key: "Add" },
];

const EditorMenu = () => {
  const [selectedOption, setOption] = useRecoilState(operationInProgress);

  const toggleOption = (option: Operation) => {
    if (selectedOption === option) setOption(null);
    else setOption(option);
  };

  return (
    <aside
      className={classNames(styles.EditorMenu, {
        [styles.EditorMenuExpanded]: selectedOption !== null,
      })}
    >
      <ul className={styles.list}>
        {options.map((option) => (
          <MenuItem
            key={option.key}
            icon={option.icon}
            text={option.text}
            selected={selectedOption === option.key}
            onClick={() => toggleOption(option.key)}
          />
        ))}
      </ul>
    </aside>
  );
};

type MenuItemProps = {
  icon: React.ReactElement;
  text: string;
  selected: boolean;
  onClick: () => unknown;
};
const MenuItem = ({ icon, text, selected, onClick }: MenuItemProps) => {
  return (
    <li
      className={classNames({ [styles.selected]: selected })}
      onClick={() => onClick()}
    >
      {icon} <span className={styles.menuItemText}>{text}</span>
    </li>
  );
};

export default EditorMenu;
