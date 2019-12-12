import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
// /import "./components/style.css";
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
      { dataField: "date", text: "date", sort: true },
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
              { value: 1, title: "✅" },
              { value: 0, title: "❌" }
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
      { dataField: "pages", text: "pages", sort: true },
      { dataField: "date", text: "date", sort: true },
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
            formType: "select",
            label: "Type",
            key: "type",
            options: [
              { value: "text", title: "text" },
              { value: "carrousel", title: "carrousel" },
              { value: "container", title: "container" },
              { value: "general", title: "general" },
              { value: "button", title: "button" },
              { value: "clickablePicture", title: "clickablePicture" },
              { value: "pictureFolder", title: "pictureFolder" }
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
      },
      {
        formType: "Control",
        disabled: true,
        inputType: "text",
        contentType: "list",
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
      { dataField: "role", text: "role", sort: true },
      { dataField: "date", text: "date", sort: true },
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
      { dataField: "title", text: "Title", sort: true },
      { dataField: "editor", text: "Editor", sort: true },
      { dataField: "date", text: "Date", sort: true },
      { dataField: "buttons", text: " " }
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
              { value: "single", title: "███████" },
              { value: "small-left", title: "██ ████" },
              { value: "small-right", title: "████ ██" },
              { value: "triple", title: "█ ███ █" }
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
              { value: "color", title: "color" },
              { value: "picture", title: "picture" }
            ]
          },
          {
            mdSize: 2,
            formType: "select",
            label: "color",
            key: "backgroundColor",
            options: [
              { value: "rgb(50 , 50, 50)", title: "grey" },
              { value: "rgb(10 , 100, 50)", title: "other color" }
            ]
          },
          {
            formType: "select",
            label: "picture",
            key: "backgroundPicture",
            options: [
              { value: "1351651315584", title: "1351651315584" },
              { value: "otherpicture", title: "other picture" }
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
              { value: 1, title: "✅" },
              { value: 0, title: "❌" }
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
            formType: "select",
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
              { value: 1, title: "✅" },
              { value: 0, title: "❌" }
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
  <App destinations={DESTINATIONS} />,
  document.getElementById("root")
);
