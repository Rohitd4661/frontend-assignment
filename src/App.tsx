import React, { useState } from "react";

import "./App.css";
import InputPage from "./Pages/InputPage";
import TablePage from "./Pages/TablePage";

function App() {
  const [page, setPage] = useState<"input" | "table">("input");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className={`app ${theme}`}>
      <nav className="navbar">
        <div className="nav-center">
          <button
            className={`nav-btn ${page === "input" ? "active" : ""}`}
            onClick={() => setPage("input")}
          >
            Input
          </button>
          <button
            className={`nav-btn ${page === "table" ? "active" : ""}`}
            onClick={() => setPage("table")}
          >
            DataTable
          </button>
        </div>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </nav>

      <main className="main-content">
        {page === "input" ? <InputPage theme={theme} /> : <TablePage />}
      </main>
    </div>
  );
}

export default App;
