import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { Menu, MenuProps } from "antd";

const navigationItems: MenuProps["items"] = [
  {
    key: "/",
    label: <Link to="/">aBook</Link>,
  },
  {
    key: "/editor",
    label: <Link to="/editor">Editor</Link>,
  },
];

const Header = () => {
  const selectedKey = useLocation().pathname;

  return (
    <header className={styles.Header}>
      <nav className={styles.Navigation}>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={navigationItems}
        ></Menu>
      </nav>
    </header>
  );
};

export default Header;
