import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

const DESTINATIONS = [
  {
    title: "Dashboard",
    typeOfData: "noData"
  },
  {
    title: "Pages",
    typeOfData: "Page"
  },
  {
    title: "WoxComponents",
    typeOfData: "WoxComponent"
  },
  {
    title: "Users",
    typeOfData: "User"
  },
  {
    title: "Layout-Editor",
    typeOfData: "noData"
  }
];

ReactDOM.render(
  <App destinations={DESTINATIONS} />,
  document.getElementById("root")
);
