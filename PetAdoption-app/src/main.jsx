import React from "react";
import ReactDOM from "react-dom/client";
// 1. Import HashRouter instead of BrowserRouter
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2. Use BrowserRouter as an alias for HashRouter */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* your other routes */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
