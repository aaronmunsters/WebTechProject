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
    typeOfData: "page",
    tableColumns: [
      { dataField: "title", text: "title", sort: true },
      { dataField: "editor", text: "editor", sort: true },
      { dataField: "published", text: "published" },
      { dataField: "date", text: "date" },
      { dataField: "buttons", text: " " }
    ],
    newContent: [
      {
        group: true,
        groupElements: [
          {
            formType: "Control",
            inputType: "text",
            label: "Title",
            key: "title"
          },
          {
            mdSize: 1.5,
            formType: "select",
            label: "published",
            key: "published",
            options: [
              { value: 1, title: "✅" },
              { value: 0, title: "❌" }
            ]
          }
        ]
      },
      {
        formType: "select",
        inputType: "text",
        isObject: true,
        label: "Components",
        key: "comps",
        options: "woxComponents"
      },
      {
        formType: "Control",
        inputType: "text",
        label: "Url",
        key: "url"
      }
    ]
  },
  {
    title: "WoxComponents",
    typeOfData: "woxComponent",
    tableColumns: [
      { dataField: "title", text: "title", sort: true },
      { dataField: "editor", text: "editor", sort: true },
      { dataField: "pages", text: "pages" },
      { dataField: "date", text: "date" },
      { dataField: "buttons", text: " " }
    ],
    newContent: [
      {
        group: true,
        groupElements: [
          {
            formType: "Control",
            inputType: "text",
            label: "Title",
            key: "title"
          },
          {
            mdSize: 2,
            formType: "Control",
            inputType: "text",
            label: "Type",
            key: "type"
          }
        ]
      },
      {
        group: true,
        groupElements: [
          {
            formType: "Control",
            inputType: "text",
            isObject: true,
            label: "Content",
            key: "content"
          },
          {
            formType: "Control",
            inputType: "text",
            isObject: true,
            label: "Tags",
            key: "tags"
          }
        ]
      },
      {
        formType: "Control",
        disabled: true,
        inputType: "text",
        isObject: true,
        label: "Pages",
        key: "pages"
      }
    ]
  },
  {
    title: "Users",
    typeOfData: "user",
    tableColumns: [
      { dataField: "name", text: "name", sort: true },
      { dataField: "email", text: "email", sort: true },
      { dataField: "role", text: "role" },
      { dataField: "date", text: "date" },
      { dataField: "buttons", text: " " }
    ],
    newContent: [
      {
        group: true,
        groupElements: [
          {
            formType: "Control",
            inputType: "text",
            label: "Name",
            key: "name"
          },
          {
            formType: "Control",
            inputType: "password",
            label: "Password",
            key: "password"
          }
        ]
      },
      {
        formType: "normal",
        inputType: "email",
        label: "Email",
        key: "email"
      }
    ]
  },
  {
    title: "Layout-Editor",
    typeOfData: "layout",
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
      {
        formType: "normal",
        inputType: "text",
        label: "Title",
        key: "title"
      },
      {
        formType: "select",
        label: "columnType",
        key: "columnType",
        options: [
          { value: "single", title: "███████" },
          { value: "small-left", title: "██ ████" },
          { value: "small-right", title: "████ ██" },
          { value: "triple", title: "█ ███ █" }
        ]
      }
    ]
  }
];

ReactDOM.render(
  <App destinations={DESTINATIONS} />,
  document.getElementById("root")
);
