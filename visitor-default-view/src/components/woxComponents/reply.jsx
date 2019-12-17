import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { postApiObject } from "../generalFunctions";

const Reply = props => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const response = {};
      const values = Object.keys(form)
        .map(id => ({ id: form[id].id, value: form[id].value }))
        .filter(o => !!o.value);
      values.forEach(obj => {
        response[obj.id] = obj.value; // prepare response
      });
      const required = {
        author: response.firstName + response.lastName,
        content: JSON.stringify({ reaction: response.reaction }),
        component: "l2"
      };
      postApiObject("comment", required);
      setTimeout(async () => {
        values.forEach(obj => (form[obj.id].value = "")); // close (and thus clear) form});
        if (props.handleVisible) props.handleVisible();
        if (props.handleReply) await props.handleReply();
      }, 1000);
    }
    setValidated(true);
    // firstName, lastName, email, reaction
  };

  return (
    <div style={{ margin: "1rem", width: "50%" }}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control required type="text" placeholder="First name" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control required type="text" placeholder="Last name" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" placeholder="Email" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="9" controlId="reaction">
            <Form.Label>Reaction</Form.Label>
            <Form.Control type="text" placeholder="..." required />
          </Form.Group>
          <Form.Group as={Col} md="3">
            {/*to make sure this form looks correct*/}
            <Form.Label
              style={{ opacity: 0, display: "inline-block", width: "100%" }}
            >
              send!
            </Form.Label>
            <Button type="submit">send!</Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
};

export default Reply;
