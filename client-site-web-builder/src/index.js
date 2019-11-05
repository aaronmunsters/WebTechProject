import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

const DESTINATIONS = [
  {
    title: "Dashboard"
  },
  {
    title: "Pages"
  },
  {
    title: "WoxComponents"
  },
  {
    title: "Users"
  },
  {
    title: "Layout-Editor"
  }
];

ReactDOM.render(
  <App destinations={DESTINATIONS} />,
  document.getElementById("root")
);
