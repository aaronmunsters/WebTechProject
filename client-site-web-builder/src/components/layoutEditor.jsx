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
    collType: this.standards.collTypes[0],
    backgroundColor: this.standards.backgroundColors[0],
    navigationBar: this.standards.navigationBars[1]
  };

  componentDidMount = async () => {
    this.setState(await axios.get("http://localhost:3001/layout").data);
    console.log("Fetched data is:", this.state);
  };

  saveLayoutFunction = () => {
    axios.post("http://localhost:3001/layout", this.state);
    console.log("Sent data is:", this.state);
  };

  generateButtons = () => {
    let onClickF = idx => {
      return () => {
        this.setState({ columns: idx });
      };
    };

    function giveButton(idx) {
      return <Button onClick={onClickF(idx)}>{idx}</Button>;
    }

    return Array(this.standards.maxColls)
      .fill(null)
      .map((v, idx) => giveButton(idx + 1));
  };

  render() {
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
              title={this.state.collType.look}
              id="bg-nested-dropdown"
            >
              {this.standards.collTypes.map(collT => (
                <Dropdown.Item
                  key={collT.id}
                  eventKey={collT.id}
                  onClick={() => this.setState({ collType: collT })}
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
              title={this.state.backgroundColor}
              id="bg-nested-dropdown"
            >
              {this.standards.backgroundColors.map(bgC => (
                <Dropdown.Item
                  key={bgC}
                  eventKey={bgC}
                  onClick={() => this.setState({ backgroundColor: bgC })}
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
              title={this.state.navigationBar}
              id="bg-nested-dropdown"
            >
              {this.standards.navigationBars.map(nbT => (
                <Dropdown.Item
                  key={nbT}
                  eventKey={nbT}
                  onClick={() => this.setState({ navigationBar: nbT })}
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
}

export default LayoutEditor;
