import { DAppProvider } from "@usedapp/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import config from "./dapp.config";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>
);
