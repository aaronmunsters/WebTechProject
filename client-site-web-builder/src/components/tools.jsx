import React, { Component } from "react";

import Button from "react-bootstrap/Button";

class Tools extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {this.props.tools.map(o => (
          <Button key={o.key} variant="light" onClick={o.onClick}>
            {o.title}
          </Button>
        ))}
      </React.Fragment>
    );
  }
}

export default Tools;
