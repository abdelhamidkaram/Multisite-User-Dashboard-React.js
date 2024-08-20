import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import { RouterProvider } from "react-router-dom";
import RouterTree from "./Router/RouterTree";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={RouterTree()} />
  </React.StrictMode>
);
