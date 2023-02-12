import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store.js";
import App from "./app/App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const root = createRoot(document.getElementById("app"));

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a4783",
    },
    secondary: {
      main: "#435679",
    },
  },
});

root.render(
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </Router>
);
