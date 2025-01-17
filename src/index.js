import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          preventDuplicate
        >
          <Router>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </Router>
        </SnackbarProvider>
  </React.StrictMode>,
   document.getElementById("root")
);
