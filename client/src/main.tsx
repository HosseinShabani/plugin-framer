import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import AppState from "./context/AppState";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppState>
      <App />
    </AppState>
  </React.StrictMode>
);
