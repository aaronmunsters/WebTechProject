import React, { Component } from "react";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import CompColRenderer from "./compColRenderer";
import { complementColor } from "./generalFunctions";
import "./woxLayout.css";

class ColumnsRenderer extends Component {
  state = {};

  // as according to react-bootstrap these must add up to 12
  state = { leftSize: null, middleSize: null, rightSize: null };

  defaultSizes = [[12], [3, 9], [9, 3], [3, 6, 3]];

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
    const { backgroundColor, columnType } = layout;
    const bgc = complementColor(backgroundColor);
    const comCollsStyle = { ...layout, backgroundColor: bgc };

    const leftCol = leftSize ? (
      <CompColRenderer style={comCollsStyle} ids={compsL} />
    ) : null;

    const middleCol = <CompColRenderer style={comCollsStyle} ids={compsM} />;

    const rightCol = rightSize ? (
      <CompColRenderer style={comCollsStyle} ids={compsR} />
    ) : null;

    /*## When the window is medium-to-large, small windows ##*/
    const sidebarSwitch = (l, m, r) => {
      if (l && r)
        return (
          <Row>
            <Col className="pageColumns" sm={4}>
              <Tabs className="justify-content-center" defaultActiveKey="Left">
                {leftSize ? (
                  <Tab eventKey="Left" title="████">
                    {l}
                  </Tab>
                ) : null}
                {rightSize ? (
                  <Tab eventKey="Right" title="████">
                    {r}
                  </Tab>
                ) : null}
              </Tabs>
            </Col>
            <Col className="pageColumns" sm={8}>
              {m}
            </Col>
          </Row>
        );
      if (l)
        return (
          <Row>
            {" "}
            <Col className="pageColumns" sm={4}>
              {l}
            </Col>
            <Col className="pageColumns" sm={8}>
              {m}
            </Col>
          </Row>
        );
      if (r)
        return (
          <Row>
            <Col className="pageColumns" sm={8}>
              {m}
            </Col>
            <Col className="pageColumns" sm={4}>
              {r}
            </Col>
          </Row>
        );
      return null;
    };
    if (columnType === "single")
      return (
        <Container fluid={true} className="pageColumns">
          {middleCol}
        </Container>
      );
    return (
      <Container fluid={true}>
        <div className="d-block d-md-none">
          {/*## When the window is smaller, mobile for example ##*/}
          <Tabs className="justify-content-center" defaultActiveKey="Middle">
            {leftSize ? (
              <Tab eventKey="Left" title="████">
                {leftCol}
              </Tab>
            ) : null}
            <Tab eventKey="Middle" title="███████">
              {middleCol}
            </Tab>
            {rightSize ? (
              <Tab eventKey="Right" title="████">
                {rightCol}
              </Tab>
            ) : null}
          </Tabs>
        </div>
        <div className="d-none d-md-block d-xl-none">
          {/*## When the window is medium-to-large, small windows ##*/}
          {sidebarSwitch(leftCol, middleCol, rightCol)}
        </div>
        <div className="d-none d-xl-block">
          {/*## When the window is larger ##*/}
          <Row>
            <Col md={leftSize} className="pageColumns">
              {leftCol}
            </Col>

            <Col md={middleSize} className="pageColumns">
              {middleCol}
            </Col>
            <Col md={rightSize} className="pageColumns">
              {rightCol}
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default ColumnsRenderer;
