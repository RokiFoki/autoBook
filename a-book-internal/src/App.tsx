import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Editor from './Pages/Editor/Editor';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="editor" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
