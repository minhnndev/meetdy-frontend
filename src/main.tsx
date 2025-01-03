import "./index.css";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

const el = document.getElementById("root");
if (el) {
    const root = createRoot(el);
    root.render(<App />);
} else {
    throw new Error("Could not find root element");
}
