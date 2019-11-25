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
    typeOfData: "Page",
    tableColumns: [
      { dataField: "pageId", text: "pageId", sort: true },
      { dataField: "title", text: "title", sort: true },
      { dataField: "creatorName", text: "creatorName", sort: true },
      { dataField: "published", text: "Published" },
      { dataField: "comps", text: "comps" },
      { dataField: "date", text: "date" }
    ]
  },
  {
    title: "WoxComponents",
    typeOfData: "WoxComponent",
    tableColumns: [
      { dataField: "componentId", text: "componentId", sort: true },
      { dataField: "creatorName", text: "creatorName", sort: true },
      { dataField: "content", text: "content", sort: true },
      { dataField: "pages", text: "pages" },
      { dataField: "date", text: "date" }
    ]
  },
  {
    title: "Users",
    typeOfData: "User",
    tableColumns: [
      { dataField: "name", text: "name", sort: true },
      { dataField: "email", text: "email", sort: true },
      { dataField: "password", text: "password", sort: true },
      { dataField: "role", text: "role" },
      { dataField: "date", text: "date" }
    ]
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
