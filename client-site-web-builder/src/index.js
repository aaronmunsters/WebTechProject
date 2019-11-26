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
    newContent: [
      { id: "title", type: "text", formType: "Control" },
      { id: "id", type: "text", formType: "Control" }
    ]
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
    newContent: [
      { id: "title", type: "text", formType: "Control" },
      { id: "type", type: "text", formType: "Control" }
    ]
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
    newContent: [
      { id: "email", type: "email", formType: "Control" },
      { id: "password", type: "password", formType: "Control" }
    ]
  },
  {
    title: "Layout-Editor",
    typeOfData: "Layout",
    tableColumns: [
      { dataField: "id", text: "id" },
      { dataField: "columnType", text: "columnType", sort: true },
      { dataField: "backgroundType", text: "backgroundType", sort: true },
      { dataField: "backgroundColor", text: "backgroundColor", sort: true },
      { dataField: "backgroundPicture", text: "backgroundPicture" },
      { dataField: "navBar", text: "navBar" },
      { dataField: "navContent", text: "navContent" },
      { dataField: "footer", text: "footer" },
      { dataField: "footerContent", text: "footerContent" }
    ],
    newContent: [
      { id: "id", type: "text", content: <h1>yeet</h1> },
      { id: "footer", type: "text", formType: "Control" }
    ]
  }
];

ReactDOM.render(
  <App destinations={DESTINATIONS} />,
  document.getElementById("root")
);
