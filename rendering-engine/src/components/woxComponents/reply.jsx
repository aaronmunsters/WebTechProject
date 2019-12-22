import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { postApiObject } from "../generalFunctions";
import "./../woxLayout.css";

const Reply = props => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    event.preventDefault(); // default behaviour would be to refresh page
    const form = event.target;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const { component, replyId, handleReply, handleVisible } = props;
      const response = {};
      const values = Object.keys(form)
        .map(id => ({ id: form[id].id, value: form[id].value }))
        .filter(o => !!o.value);
      values.forEach(obj => {
        response[obj.id] = obj.value; // prepare response
      });
      const { firstName, lastName, reaction } = response;
      const required = {
        author: firstName + " " + lastName,
        content: JSON.stringify({ reaction: reaction }),
        component: component
      };
      const id = replyId ? replyId : "";
      postApiObject("comment", id, required);
      setTimeout(async () => {
        values.forEach(obj => (form[obj.id].value = "")); // clear form;
        if (handleVisible) handleVisible(); // close form
        if (handleReply) await handleReply(); // refresh comment section
      }, 1000);
    }
    setValidated(true);
    // firstName, lastName, email, reaction
  };

  return (
    <div className="replyForm">
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
            <Form.Label className="fakeHeader">send!</Form.Label>
            <Button type="submit">send!</Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
};

export function ReplyButton(props) {
  return (
    <Button variant="secondary" className="replyButton" onClick={props.onClick}>
      <img
        width="20rem"
        height="20rem"
        src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-reply-512.png"
        alt="reply-icon"
      />
    </Button>
  );
}

export default Reply;
