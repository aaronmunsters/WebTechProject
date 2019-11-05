import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function NewContentModal(props) {
  const { show, onHide, cells } = props;
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
