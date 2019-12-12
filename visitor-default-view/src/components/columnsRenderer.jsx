import React, { Component } from "react";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import CompColRenderer from "./compColRenderer";
import { complementColor } from "./generalFunctions";

class ColumnsRenderer extends Component {
  state = {};

  // as according to react-bootstrap these must add up to 12
  state = { leftSize: null, middleSize: null, rightSize: null };

  defaultSizes = [[12], [2, 10], [10, 2], [3, 6, 3]];

  componentDidMount = () => {
    const choiceHandler = {
      single: { middleSize: this.defaultSizes[0][0] },
      "small-left": {
        leftSize: this.defaultSizes[1][0],
        middleSize: this.defaultSizes[1][1]
      },
      "small-right": {
        middleSize: this.defaultSizes[2][0],
        rightSize: this.defaultSizes[2][1]
      },
      triple: {
        leftSize: this.defaultSizes[3][0],
        middleSize: this.defaultSizes[3][1],
        rightSize: this.defaultSizes[3][2]
      }
    };
    const validChoice = choiceHandler[this.props.layout.columnType];
    if (validChoice) {
      this.setState(validChoice);
    } else {
      this.setState({
        leftSize: 4,
        middleSize: 4,
        rightSize: 4
      });
    }
  };

  render() {
    const { leftSize, middleSize, rightSize } = this.state;
    const { compsL, compsM, compsR, layout } = this.props;
    const { followstyle, backgroundColor, columnType } = layout;

    let bgc = backgroundColor;
    if (followstyle) bgc = complementColor(bgc);
    const collsStyle = { ...layout, backgroundColor: bgc, margin: "1%" };

    const leftCol = leftSize ? (
      <Col md={leftSize}>
        <CompColRenderer style={collsStyle} ids={compsL} />
      </Col>
    ) : null;

    const middleCol = (
      <Col md={middleSize}>
        <CompColRenderer style={collsStyle} ids={compsM} />
      </Col>
    );

    const rightCol = rightSize ? (
      <Col md={rightSize}>
        <CompColRenderer style={collsStyle} ids={compsR} />
      </Col>
    ) : null;

    if (columnType === "single") return middleCol;
    return (
      <Container fluid={true} style={{ padding: "1rem" }}>
        <div className="d-block d-md-none">
          {/*## When the window is smaller, mobile for example ##*/}
          <Tabs
            className="justify-content-center"
            defaultActiveKey="Middle"
            id="uncontrolled-tab-example"
          >
            {leftSize ? (
              <Tab eventKey="Left" title="<____">
                {leftCol}
              </Tab>
            ) : null}
            <Tab eventKey="Middle" title="__________">
              {middleCol}
            </Tab>
            {rightSize ? (
              <Tab eventKey="Right" title="____>">
                {rightCol}
              </Tab>
            ) : null}
          </Tabs>
        </div>
        <div className="d-none d-md-block">
          {/*## When the window is larger ##*/}
          <Row>
            {leftCol}
            {middleCol}
            {rightCol}
          </Row>
        </div>
      </Container>
    );
  }
}

export default ColumnsRenderer;
