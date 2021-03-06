import React, { Component } from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";

/* ------------------------------------------------------------------
  the admin needs to log in before being able to do anything on the page,
  when the credentials are incorrect. An alert is given back.
  -------------------------------------------------------------------*/
export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  state = {
    email: "",
    password: "",
    showAlert: false
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { axios, onCorrectCredentials } = this.props;
    const login = await axios.login(email, password);
    if (login) onCorrectCredentials();
    else this.setState({ showAlert: true });
  };

  handleInputChange(event) {
    let target = event.currentTarget;
    let value = target.value;
    let name = target.name;
    if (this.state.showAlert === true) this.setState({ showAlert: false });
    this.setState({ [name]: value });
  }
  render() {
    const { loggedIn } = this.props.axios.state;
    return (
      <Modal centered className={"loginModal"} show={!loggedIn}>
        <Alert show={this.state.showAlert} key="incorrect" variant="danger">
          Incorrect email or password!
        </Alert>
        <Modal.Body>
          <div />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={this.handleInputChange}
                placeholder="example@example.com"
                defaultValue={this.state.email}
                type="email"
                name="email"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={this.handleInputChange}
                placeholder=""
                defaultValue={this.state.password}
                type="password"
                name="password"
                required
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
