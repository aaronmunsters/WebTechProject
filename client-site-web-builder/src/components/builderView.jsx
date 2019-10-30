import React, { Component } from "react";

import ResultView from "./resultView";
import Elements from "./elements";
import Tools from "./tools";
import Navigation from "./navigation";

import Containter from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./builder.css";

class BuilderView extends Component {
  state = {
    webResult: [<h1>Hello World</h1>]
  };

  tools = [
    {
      title: "Add title",
      key: "Save",
      onClick: () => {
        this.setState({
          webResult: this.state.webResult.concat(<h1>Hello World</h1>)
        });
      }
    },
    {
      title: "Add header",
      key: "Save",
      onClick: () => {
        this.setState({
          webResult: this.state.webResult.concat(<h2>Sup! I'm a header ;-)</h2>)
        });
      }
    },
    {
      title: "Add button",
      key: "Save",
      onClick: () => {
        this.setState({
          webResult: this.state.webResult.concat(<Button>Clickedyclick</Button>)
        });
      }
    }
  ];

  renderBuild(webResult) {
    return <React.Fragment>{webResult.map(el => el)}</React.Fragment>;
  }

  render() {
    return (
      <Containter fluid={true} className="Main-app">
        <Navigation
          regionName="Editor"
          selections={[
            { btnType: "primary", title: "Save", key: "Save" },
            { btnType: "danger", title: "Start Over", key: "Start Over" },
            { btnType: "info", title: "Help", key: "Help" },
            { btnType: "dark", title: "Mobile View", key: "Mobile View" },
            {
              btnType: "light",
              title: (
                <img
                  src="https://img.icons8.com/metro/26/000000/visible.png"
                  alt="eye icon"
                />
              ),
              key: "View"
            }
          ]}
        ></Navigation>
        <Row className="justify-content-center">
          <Col md={10} xs={6} className="result-view">
            <ResultView />
            {this.renderBuild(this.state.webResult)}
          </Col>
          <Col md={2} xs={6} className="tools">
            <Tools tools={this.tools} />
          </Col>
        </Row>
        <Row>
          <Col className="elements">
            <Elements />
          </Col>
        </Row>
      </Containter>
    );
  }
}

export default BuilderView;
