import React, { Component } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

class LayoutEditor extends Component {
  standards = {
    collTypes: [
      { id: "single", look: "███████" },
      { id: "small-left", look: "██ ████" },
      { id: "small-right", look: "████ ██" },
      { id: "triple", look: "█ ███ █" }
    ],

    backgroundColors: ["white", "black", "dark-blue", "dark-green"],
    navigationBars: ["none", "simple"]
  };

  state = {
    serverFetched: false,
    data: {}
  };

  componentDidMount = async () => {
    let fetched = await axios.get("http://localhost:3001/layout");
    this.setState({ serverFetched: true, data: fetched.data });
  };

  saveLayoutFunction = () => {
    axios.post("http://localhost:3001/layout", this.state.data);
    console.log("Sent data is:", this.state);
  };

  renderEditor() {
    return (
      <Col>
        <Row>
          <h4>Edit the site below, finally hit save!</h4>
        </Row>
        <Row>
          <Col>
            <h2>Choose the your type of columns</h2>
          </Col>
          <Col>
            <DropdownButton
              as={ButtonGroup}
              title={this.state.data.collType.look}
              id="bg-nested-dropdown"
            >
              {this.standards.collTypes.map(collT => (
                <Dropdown.Item
                  key={collT.id}
                  eventKey={collT.id}
                  onClick={() => {
                    let data = this.state.data;
                    data.collType = collT;
                    this.setState({ data: data });
                  }}
                >
                  {collT.look}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Choose your backgroundcolor</h2>
          </Col>
          <Col>
            <DropdownButton
              as={ButtonGroup}
              title={this.state.data.backgroundColor}
              id="bg-nested-dropdown"
            >
              {this.standards.backgroundColors.map(bgC => (
                <Dropdown.Item
                  key={bgC}
                  eventKey={bgC}
                  onClick={() => {
                    let data = this.state.data;
                    data.backgroundColor = bgC;
                    this.setState({ data: data });
                  }}
                >
                  {bgC}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Choose your navigation bar</h2>
          </Col>
          <Col>
            <DropdownButton
              as={ButtonGroup}
              title={this.state.data.navigationBar}
              id="bg-nested-dropdown"
            >
              {this.standards.navigationBars.map(nbT => (
                <Dropdown.Item
                  key={nbT}
                  eventKey={nbT}
                  onClick={() => {
                    let data = this.state.data;
                    data.navigationBar = nbT;
                    this.setState({ data: data });
                  }}
                >
                  {nbT}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          <Button variant="success" onClick={this.saveLayoutFunction}>
            SAVE
          </Button>
        </Row>
      </Col>
    );
  }

  render() {
    if (!this.state.serverFetched) {
      return <h1>Hold on now ...</h1>;
    }
    return this.renderEditor();
  }
}

export default LayoutEditor;
