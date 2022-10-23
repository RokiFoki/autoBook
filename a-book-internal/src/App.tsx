import React from "react";
import "./App.css";
import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import Editor from "./Pages/Editor/Editor";
import Header from "./Header/Header";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="editor" element={<Editor />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
