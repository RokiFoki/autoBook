import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.Header}>
      <nav className={styles.Navigation}>
        <Link to="/">aBook</Link>
        <Link to="/editor">Editor</Link>
      </nav>
    </header>
  );
};

export default Header;
