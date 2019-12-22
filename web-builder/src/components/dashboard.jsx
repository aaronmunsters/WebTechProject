import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";

/* ------------------------------------------------------------------
a simple card with some basic information about the website
-------------------------------------------------------------------*/
export default function Dashboard(props) {
  const { user, pages, woxComponents, users, viewTotal } = props;
  let usersAmount = users ? users.length : 0;
  let woxComponentsAmount = woxComponents ? woxComponents.length : 0;
  let pagesAmount = pages ? pages.length : 0;
  return (
    <Card>
      <Card.Header>
        Welcome to your dashboard
        <b> {user}</b>,
        <br />
        Here you can find some statistics about your website.
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>Total amount of visitors: {viewTotal}</ListGroup.Item>
        <ListGroup.Item>
          <Badge pill variant="success">
            {usersAmount}
          </Badge>{" "}
          user{usersAmount > 1 ? "s" : ""}
        </ListGroup.Item>
        <ListGroup.Item>
          <Badge pill variant="success">
            {woxComponentsAmount}
          </Badge>{" "}
          woxComponent{woxComponentsAmount > 1 ? "s" : ""}
        </ListGroup.Item>
        <ListGroup.Item>
          <Badge pill variant="success">
            {pagesAmount}
          </Badge>{" "}
          page{pagesAmount > 1 ? "s" : ""}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
