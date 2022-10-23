import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { Button, Menu } from "antd";

const Header = () => {
  return (
    <header className={styles.Header}>
      <nav className={styles.Navigation}>
        <Menu mode="horizontal">
          <Menu.Item defaultChecked>
            <Link to="/">aBook</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/editor">Editor</Link>
          </Menu.Item>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
