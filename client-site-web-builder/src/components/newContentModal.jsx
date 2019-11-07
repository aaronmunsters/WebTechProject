import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function NewContentModal(props) {
  const { show, onHide, typeOfContent } = props;
  let cells;
  switch (typeOfContent) {
    case "Page":
      cells = ["Title", "Author", "Created", "Published", "Content"];
      break;
    case "WoxComponent":
      cells = ["Title", "Author", "Created"];
      break;
    case "User":
      cells = ["User"];
      break;
    default:
      cells = ["Error"];
  }
  return (
    <Modal
      //{...props}
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closebutton="true">
        <Modal.Title id="insert new content">New Page</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {cells.map(element => (
            <Form.Group controlId={element} key={element}>
              <Form.Label>{element}</Form.Label>
              <Form.Control placeholder={element}></Form.Control>
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
