import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CompColRenderer from "./compColRenderer";
class ColumnsRenderer extends Component {
  state = {};

  // as according to react-bootstrap these must add up to 12
  state = { leftSize: null, middleSize: null, rightSize: null };

  defaultSizes = [[12], [2, 10], [10, 2], [3, 6, 3]];

  componentDidMount = () => {
    const choiceHandler = {
      single: this.setState({ middleSize: this.defaultSizes[0][0] }),
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
    const validChoice = choiceHandler[this.props.columnType];
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
