import React from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Thumb from "./thumb";
import Location from "./locationFinder";

export default function PictureUpload(props) {
  const { axios } = props;
  return (
    <Modal centered show={props.show} onHide={props.onCancel}>
      <Formik
        initialValues={{ file: null, title: "" }}
        onSubmit={async values => {
          let data = new FormData();
          data.append("image", values.file);
          data.append("title", values.title);
          let responce = await axios.uploadPicture("post", data);
          props.onUpload(responce.id);
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
                      setFieldValue("title", event.currentTarget.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Location />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="file">Upload Picture</Form.Label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={event => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                    className="form-control"
                  />
                  <Thumb file={values.file} />
                </Form.Group>
                <Button type="submit">Upload</Button>
              </Form>
            </Container>
          );
        }}
      </Formik>
    </Modal>
  );
}
