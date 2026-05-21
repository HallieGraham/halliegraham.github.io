import "@fontsource-variable/inter";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { RouteProvider } from "@/providers/route-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import App from "@/App";
import "@/styles/globals.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('Root element "#root" not found');

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <HashRouter>
      <RouteProvider>
        <ThemeProvider darkModeClass="dark" defaultTheme="light">
          <App />
        </ThemeProvider>
      </RouteProvider>
    </HashRouter>
  </React.StrictMode>
);
