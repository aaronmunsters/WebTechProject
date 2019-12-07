import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CompColRenderer from "./compColRenderer";
class ColumnsRenderer extends Component {
  state = {};

  // as according to react-bootstrap these must add up to 12
  leftSize = null;
  middleSize = null;
  rightSize = null;

  defaultSizes = [[12], [2, 10], [10, 2], [3, 6, 3]];

  componentDidMount = () => {
    switch (this.props.columnType) {
      case "single":
        this.middleSize = this.defaultSizes[0][0];
        break;
      case "small-left":
        this.leftSize = this.defaultSizes[1][0];
        this.middleSize = this.defaultSizes[1][1];
        break;
      case "small-right":
        this.middleSize = this.defaultSizes[2][0];
        this.rightSize = this.defaultSizes[2][1];
        break;
      case "triple":
        this.leftSize = this.defaultSizes[3][0];
        this.middleSize = this.defaultSizes[3][1];
        this.rightSize = this.defaultSizes[3][2];
        break;
      default:
        this.leftSize = 6;
        this.middleSize = 6;
        this.rightSize = 6;
    }
  };

  render() {
    const { leftSize, middleSize, rightSize } = this;
    return (
      <Container fluid={true} style={{ padding: "1rem" }}>
        <Row>
          {leftSize ? (
            <Col sm={leftSize}>
              <CompColRenderer ids={this.props.compsL} />
            </Col>
          ) : null}
          <Col sm={middleSize}>
            <CompColRenderer ids={this.props.compsM} />
          </Col>
          {rightSize ? (
            <Col sm={rightSize}>
              <CompColRenderer ids={this.props.compsR} />
            </Col>
          ) : null}
        </Row>
      </Container>
    );
  }
}

export default ColumnsRenderer;
