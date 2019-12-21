import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";

export default function Dashboard(props) {
  const { user, pages, woxComponents, users } = props;
  return (
    <Card>
      <Card.Header>
        Welcome to your dashboard
        <b> {user}</b>,
        <br />
        Here you can find some statistics about your page.
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Badge pill variant="success">
            {pages ? pages.length : 0}
          </Badge>{" "}
          pages
        </ListGroup.Item>
        <ListGroup.Item>
          <Badge pill variant="success">
            {woxComponents ? woxComponents.length : 0}
          </Badge>{" "}
          woxComponents
        </ListGroup.Item>
        <ListGroup.Item>
          <Badge pill variant="success">
            {users ? users.length : 0}
          </Badge>{" "}
          users
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
