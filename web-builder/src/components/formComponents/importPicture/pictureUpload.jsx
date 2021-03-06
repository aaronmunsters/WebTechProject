import React, { Component } from "react";
import { Form, Button, Container, Modal, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Location from "./locationFinder";

/* ------------------------------------------------------------------
A formik form wich wraped in a modal wich will on submit try to 
upload the given file(picture). The form has a locationAdded attribute
so it knows if it should give back the long and lat 
-------------------------------------------------------------------*/
export default class PictureUpload extends Component {
  state = {
    show: false,
    error: false
  };
  render() {
    const { axios, onUpload } = this.props;
    return (
      <div>
        <Button onClick={() => this.setState({ show: true })}>
          Upload Picture
        </Button>
        <Modal
          centered
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Alert
            show={this.state.error ? true : false}
            key="incorrect"
            variant="danger"
          >
            {this.state.error}
          </Alert>
          <Formik
            initialValues={{
              file: null,
              title: "",
              long: 0,
              lat: 0,
              locationAdded: false
            }}
            onSubmit={async values => {
              let data = new FormData();
              data.append("image", values.file);
              data.append("title", values.title);
              if (values.locationAdded) {
                data.append("long", values.long);
                data.append("lat", values.lat);
              }
              let responce = await axios.uploadPicture("post", data);
              if (responce.error) {
                this.setState({ error: responce.error });
              } else {
                this.setState({ show: false });
                onUpload(responce.id);
              }
            }}
            validationSchema={yup.object().shape({
              file: yup.mixed().required()
            })}
          >
            {({ handleSubmit, values, setFieldValue }) => {
              return (
                <Container>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        required
                        onChange={event => {
                          this.setState({ error: false });
                          setFieldValue("title", event.currentTarget.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Location</Form.Label>
                      <Location
                        onChange={coords => {
                          this.setState({ error: false });
                          setFieldValue("locationAdded", true);
                          setFieldValue("long", coords.lng);
                          setFieldValue("lat", coords.lat);
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor="file">Upload Picture</Form.Label>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={event => {
                          this.setState({ error: false });
                          setFieldValue("file", event.currentTarget.files[0]);
                        }}
                        className="form-control"
                      />
                    </Form.Group>
                    <Button type="submit">Upload</Button>
                  </Form>
                </Container>
              );
            }}
          </Formik>
        </Modal>
      </div>
    );
  }
}
