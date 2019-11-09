import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import DropdownSelection from "./dropdownSelection";

class LayoutEditor extends Component {
  returnIdTitleEqualObject = s => ({ id: s, title: s });

  dropdownCallback = dataVal => choice => {
    let data = this.state.data;
    data[dataVal] = choice.id;
    this.setState({ data: data });
  };

  standards = {
    collTypeCallback: this.dropdownCallback("collType"),
    colorCallback: this.dropdownCallback("backgroundColor"),
    navbarCallback: this.dropdownCallback("navigationBar"),

    collTypesCorrect: [
      { id: "single", title: "███████" },
      { id: "small-left", title: "██ ████" },
      { id: "small-right", title: "████ ██" },
      { id: "triple", title: "█ ███ █" }
    ],

    backgroundColors: ["white", "black", "dark-blue", "dark-green"].map(
      this.returnIdTitleEqualObject
    ),

    navigationBars: ["none", "simple"].map(this.returnIdTitleEqualObject)
  };

  state = { serverFetched: false, data: {} };

  componentDidMount = async () => {
    let fetched = await axios.get("http://localhost:3001/layout");
    this.setState({ serverFetched: true, data: fetched.data });
  };

  saveLayoutFunction = () => {
    axios.post("http://localhost:3001/layout", this.state.data);
  };

  findFetched = (array, fetched) => {
    return array.findIndex(choice => choice.id === fetched);
  };

  renderEditor() {
    const { data } = this.state;
    const { standards, findFetched } = this;
    const { collTypesCorrect, backgroundColors, navigationBars } = standards;
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
              selectedIdx={findFetched(collTypesCorrect, data.collType)}
              choices={collTypesCorrect}
              generalCallback={standards.collTypeCallback}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Choose your backgroundcolor</h2>
          </Col>
          <Col>
            <DropdownSelection
              selectedIdx={findFetched(backgroundColors, data.backgroundColor)}
              choices={backgroundColors}
              generalCallback={standards.colorCallback}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Choose your navigation bar</h2>
          </Col>
          <Col>
            <DropdownSelection
              selectedIdx={findFetched(navigationBars, data.navigationBar)}
              choices={navigationBars}
              generalCallback={standards.navbarCallback}
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
