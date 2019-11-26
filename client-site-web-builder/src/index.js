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
      { dataField: "id", text: "id", sort: true },
      { dataField: "author", text: "author", sort: true },
      { dataField: "title", text: "title", sort: true },
      { dataField: "published", text: "published" },
      { dataField: "comps", text: "components" },
      { dataField: "date", text: "date" },
      { dataField: "url", text: "url" }
    ],
    newContent: [{ id: "title" }, { id: "id" }]
  },
  {
    title: "WoxComponents",
    typeOfData: "WoxComponent",
    tableColumns: [
      { dataField: "id", text: "id", sort: true },
      { dataField: "author", text: "author", sort: true },
      { dataField: "title", text: "title", sort: true },
      { dataField: "tags", text: "tags" },
      { dataField: "type", text: "type" },
      { dataField: "content", text: "content" },
      { dataField: "pages", text: "pages" },
      { dataField: "date", text: "date" }
    ],
    newContent: [{ id: "title" }, { id: "id" }]
  },
  {
    title: "Users",
    typeOfData: "User",
    tableColumns: [
      { dataField: "id", text: "id" },
      { dataField: "name", text: "name", sort: true },
      { dataField: "email", text: "email", sort: true },
      { dataField: "password", text: "password", sort: true },
      { dataField: "role", text: "role" },
      { dataField: "date", text: "date" }
    ],
    newContent: [{ id: "title" }, { id: "id" }]
  },
  {
    title: "Layout-Editor",
    typeOfData: "layout",
    tableColumns: [
      { dataField: "layoutId", text: "layoutId", sort: true },
      { dataField: "creatorName", text: "creatorName", sort: true },
      { dataField: "content", text: "content", sort: true },
      { dataField: "pages", text: "pages" },
      { dataField: "date", text: "date" }
    ],
    newContent: [{ id: "title" }, { id: "content" }]
  }
];

ReactDOM.render(
  <App destinations={DESTINATIONS} />,
  document.getElementById("root")
);
