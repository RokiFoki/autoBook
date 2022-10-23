import "./App.less";
import styles from "./App.module.css";
import "./theme.css";
import { Route, Routes } from "react-router-dom";
import Editor from "./Pages/Editor/Editor";
import Header from "./Header/Header";
import Home from "./Pages/Home/Home";
import classNames from "classnames";

function App() {
  return (
    <div className={classNames(styles.App, "app-root")}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="editor" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
