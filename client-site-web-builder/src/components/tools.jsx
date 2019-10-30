import React, { Component } from "react";

class Tools extends Component {
  state = {
    options: [
      {
        id: "insert new Div"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "Other option"
      },
      {
        id: "insertDiv"
      }
    ]
  };

  render() {
    return (
      <div>
        {this.state.options.map(o => (
          <button className="btn btn-light">{o.id}</button>
        ))}
      </div>
    );
  }
}

export default Tools;
