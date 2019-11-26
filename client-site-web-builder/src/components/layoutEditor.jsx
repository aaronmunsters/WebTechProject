import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import DropdownSelection from "./dropdownSelection";
import NavbarEditor from "./navbarEditor";
import BootstrapTable from "react-bootstrap-table-next";
import ContentTable from "./contentTable";
import NewContentModal from "./newContentModal";

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
          <div>
            {data.navigationBar !== navigationBars[0].id ? (
              <NavbarEditor
                navbarType={data.navigationBar}
                navbarContent={data.navbarContent}
                updateContent={newContent => {
                  let dataCopy = this.state.data;
                  dataCopy.navbarContent = newContent;
                  this.setState({ data: dataCopy });
                }}
              />
            ) : null}
          </div>
        </Row>
        <Row>
          <Button variant="success" onClick={this.saveLayoutFunction}>
            SAVE
          </Button>
        </Row>
      </Col>
    );
  }

  render2() {
    if (!this.state.serverFetched) {
      return <h1>Hold on now ...</h1>;
    }
    return this.renderEditor();
  }

  render() {
    return (
      <React.Fragment>
        <NewContentModal
          show={true}
          typeOfContent={console.log("oi")}
          onSubmit={console.log("lol")}
        >
          Hello everybody ;)
        </NewContentModal>
        <ContentTable
          list={{
            Title: "Default",
            Author: "WoxPace",
            Date: "Beginning of time ...",
            Content: "this is a steaming pile of content",
            Published: <Button>View use</Button>
          }}
        ></ContentTable>
      </React.Fragment>
    );
  }
}

export default LayoutEditor;
