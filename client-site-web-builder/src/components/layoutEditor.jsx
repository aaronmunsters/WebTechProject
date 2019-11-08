import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

class DropdownSelection extends Component {
  /* props required are: selectedIdx, choices: [{id, callback, title}] */
  state = { selected: this.props.choices[this.props.selectedIdx] };
  render() {
    return (
      <DropdownButton title={this.state.selected.title}>
        {this.props.choices.map(choice => (
          <Dropdown.Item
            key={choice.id}
            onClick={() => {
              this.setState({ selected: choice });
              if (this.props.generalCallback) {
                this.props.generalCallback(choice);
              } else {
                choice.callback(choice);
              }
            }}
          >
            {choice.title}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }
}

class LayoutEditor extends Component {
  standards = {
    collTypeCallback: choice => {
      let data = this.state.data;
      data.collType = choice.id;
      this.setState({ data: data });
    },

    collTypesCorrect: [
      { id: "single", title: "███████" },
      { id: "small-left", title: "██ ████" },
      { id: "small-right", title: "████ ██" },
      { id: "triple", title: "█ ███ █" }
    ],

    colorCallback: choice => {
      let data = this.state.data;
      data.backgroundColor = choice.id;
      this.setState({ data: data });
    },

    backgroundColors: [
      { id: "white", title: "white" },
      { id: "black", title: "black" },
      { id: "dark-blue", title: "dark-blue" },
      { id: "dark-green", title: "dark-green" }
    ],

    navbarCallback: choice => {
      let data = this.state.data;
      data.navigationBar = choice.id;
      this.setState({ data: data });
    },

    navigationBars: [
      { id: "none", title: "none" },
      { id: "simple", title: "simple" }
    ]
  };

  state = {
    serverFetched: false,
    data: {
      collType: "uninitialised",
      backgroundColor: "uninitialised",
      navigationBar: "uninisialised"
    }
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
            <DropdownSelection
              selectedIdx={this.standards.collTypesCorrect.findIndex(
                choice => choice.id === this.state.data.collType
              )}
              choices={this.standards.collTypesCorrect}
              generalCallback={this.standards.collTypeCallback}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Choose your backgroundcolor</h2>
          </Col>
          <Col>
            <DropdownSelection
              selectedIdx={this.standards.backgroundColors.findIndex(
                choice => choice.id === this.state.data.backgroundColor
              )}
              choices={this.standards.backgroundColors}
              generalCallback={this.standards.colorCallback}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Choose your navigation bar</h2>
          </Col>
          <Col>
            <DropdownSelection
              selectedIdx={this.standards.navigationBars.findIndex(
                choice => choice.id === this.state.data.navigationBar
              )}
              choices={this.standards.navigationBars}
              generalCallback={this.standards.navbarCallback}
            />
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
