import { useState } from "react";
import styles from "./EditorMenu.module.css";
import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";

const Options = [{ icon: <PlusOutlined />, text: "Add new" }] as const;

type OptionTypes = typeof Options[number]["text"];

const EditorMenu = () => {
  const [selectedOption, setOption] = useState<OptionTypes | null>(null);

  const toggleOption = (option: OptionTypes) => {
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
        {Options.map((option) => (
          <MenuItem
            icon={<PlusOutlined />}
            text="Add New"
            selected={selectedOption === option.text}
            onClick={() => toggleOption(option.text)}
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
