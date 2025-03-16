import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Router>
    <ThemeProvider>
      <ToastContainer className="z-[10000]" />
      <App />
    </ThemeProvider>
  </Router>
);
