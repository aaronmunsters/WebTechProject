import React from "react";
import { Card, Dropdown, Container, Row, Col } from "react-bootstrap";

export default function Index(props) {
  const { destinations, destinationIndex: current } = props;

  const renderItem = (destination, index) => {
    return (
      <Dropdown.Item
        onSelect={() => props.setDestinationIndex(index)}
        key={index}
        className={index === current ? "active" : "none"}
      >
        {destination.title}
      </Dropdown.Item>
    );
  };

  const renderIndex = () => {
    return (
      <Card>
        <Card.Body>
          <Dropdown>
            {destinations.map((destination, index) =>
              renderItem(destination, index)
            )}
          </Dropdown>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container>
      <Row>
        <Col>{renderIndex()}</Col>
      </Row>
    </Container>
  );
}
