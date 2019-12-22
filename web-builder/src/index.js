import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import "./components/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

const DESTINATIONS = [
  /* --------------------------------------------------------------------------------------------------------
  for every type of editable content that the admins are able to edit, we keep its 
    - title: Whats it called in the navbar and titlebar
    - typeOfData: this correlates exactly to how the data is stored in the database/backend
    - tableColumns: wich data needs to gets fetched to put in the tables 
    - newContent: how the form to handle edits to new or old components of this type looks like.
                  this relates to a react-bootstrap form for most entries but there are some exceptions,
                  these are handled when the form Component is Created
  ----------------------------------------------------------------------------------------------------------*/

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
              { value: "editor", label: "editor" },
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
            mdSize: 1.5,
            formType: "select",
            label: "Icon",
            key: "customIcon",
            options: [
              { value: 1, label: "✅" },
              { value: 0, label: "❌" }
            ]
          },
          {
            formType: "picture",
            key: "iconId"
          },
          {
            mdSize: 2,
            label: "backgroundcolor",
            key: "backgroundColor"
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
