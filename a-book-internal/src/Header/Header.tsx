import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { Button, Menu } from "antd";

const Header = () => {
  const selectedKey = useLocation().pathname;

  return (
    <header className={styles.Header}>
      <nav className={styles.Navigation}>
        <Menu mode="horizontal" selectedKeys={[selectedKey]}>
          <Menu.Item key="/">
            <Link to="/">aBook</Link>
          </Menu.Item>
          <Menu.Item key="/editor">
            <Link to="/editor">Editor</Link>
          </Menu.Item>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
