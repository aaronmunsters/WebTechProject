import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import "./components/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

//import WoxComponentLists from "./components/woxComponentTables/woxComponentLists";

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
      { dataField: "published", text: "published", sort: true },
      { dataField: "date", text: "date", sort: true }
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
            formType: "select",
            inputType: "text",
            label: "Layout",
            key: "layout",
            options: "layouts"
          },
          {
            mdSize: 1.5,
            formType: "select",
            label: "published",
            key: "published",
            options: [
              { value: 1, label: "✅" },
              { value: 0, label: "❌" }
            ]
          }
        ]
      },
      {
        formType: "multipleselect",
        inputType: "text",
        contentType: "special",
        label: "Components",
        key: "comps",
        options: "woxComponents"
      },
      {
        formType: "Control",
        prependUrl: true,
        inputType: "text",
        label: "Url",
        key: "url"
      },
      {
        formType: "Control",
        inputType: "text",
        label: "Description",
        key: "description"
      }
    ]
  },
  {
    title: "WoxComponents",
    typeOfData: "woxComponent",
    tableColumns: [
      { dataField: "title", text: "title", sort: true },
      { dataField: "editor", text: "editor", sort: true },
      { dataField: "date", text: "date", sort: true }
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
            formType: "select",
            label: "Type",
            key: "type",
            options: [
              { value: "text", label: "text" },
              { value: "carrousel", label: "carrousel" },
              { value: "container", label: "container" },
              { value: "button", label: "button" },
              { value: "clickablePicture", label: "clickablePicture" },
              { value: "pictureFolder", label: "pictureFolder" }
            ]
          },
          {
            mdSize: 1.5,
            formType: "select",
            label: "Comments?",
            key: "commentable",
            options: [
              { value: 0, label: "❌" },
              { value: 1, label: "✅" }
            ]
          }
        ]
      },
      {
        formType: "textarea",
        contentType: "object",
        inputType: "text",
        label: "Content",
        key: "content"
      },
      {
        formType: "Control",
        inputType: "text",
        label: "Description",
        key: "description"
      }
    ]
  },
  {
    title: "Users",
    typeOfData: "user",
    tableColumns: [
      { dataField: "name", text: "name", sort: true },
      { dataField: "email", text: "email", sort: true },
      { dataField: "role", text: "role", sort: true },
      { dataField: "date", text: "date", sort: true }
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
          },
          {
            formType: "select",
            inputType: "role",
            label: "Role",
            key: "role",
            options: [
              { value: "user", label: "user" },
              { value: "admin", label: "admin" }
            ]
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
      { dataField: "title", text: "title", sort: true },
      { dataField: "editor", text: "editor", sort: true },
      { dataField: "date", text: "date", sort: true }
    ],
    newContent: [
      {
        group: true,
        groupElements: [
          {
            formType: "normal",
            inputType: "text",
            label: "Title",
            key: "title"
          },
          {
            mdSize: 2,
            formType: "select",
            label: "columnType",
            key: "columnType",
            options: [
              { value: "single", label: "███████" },
              { value: "small-left", label: "██ ████" },
              { value: "small-right", label: "████ ██" },
              { value: "triple", label: "█ ███ █" }
            ]
          }
        ]
      },

      {
        group: true,
        groupElements: [
          {
            mdSize: 3,
            formType: "select",
            label: "background Type",
            key: "backgroundType",
            options: [
              { value: "color", label: "color" },
              { value: "picture", label: "picture" }
            ]
          },
          {
            mdSize: 2,
            label: "color",
            key: "backgroundColor"
          },
          {
            formType: "select",
            label: "picture",
            key: "backgroundPicture",
            options: [
              { value: "1351651315584", label: "1351651315584" },
              { value: "otherpicture", label: "other picture" }
            ]
          }
        ]
      },
      {
        group: true,
        groupElements: [
          {
            mdSize: 1.5,
            formType: "select",
            label: "navbar",
            key: "navbar",
            options: [
              { value: 1, label: "✅" },
              { value: 0, label: "❌" }
            ]
          },
          {
            mdSize: 4,
            formType: "normal",
            inputType: "text",
            label: "Brand",
            key: "brand"
          },
          {
            formType: "multiselect",
            contentType: "object",
            label: "links",
            key: "navcontent",
            options: "pages"
          }
        ]
      },
      {
        group: true,
        groupElements: [
          {
            mdSize: 1.5,
            formType: "select",
            label: "footer",
            key: "footer",
            options: [
              { value: 1, label: "✅" },
              { value: 0, label: "❌" }
            ]
          },
          {
            formType: "normal",
            inputType: "text",
            label: "footcontent",
            key: "footcontent"
          }
        ]
      },
      {
        formType: "Control",
        inputType: "text",
        label: "Description",
        key: "description"
      }
    ]
  }
];

ReactDOM.render(
  <App key="app" destinations={DESTINATIONS} />,
  document.getElementById("root")
);
