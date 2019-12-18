import React, { Component } from "react";
import { Form, Button, Col, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Thumb from "./thumb";

export default class PictureUpload extends Component {
  render() {
    return (
      <div className="container">
        <Formik
          initialValues={{ file: null }}
          onSubmit={values => {
            alert(
              JSON.stringify({
                fileName: values.file.name,
                type: values.file.type,
                size: `${values.file.size} bytes`
              })
            );
          }}
          validationSchema={yup.object().shape({
            file: yup.mixed().required()
          })}
          render={({ handleSubmit, values, setFieldValue }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label for="file">File upload</Form.Label>
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
            );
          }}
        />
      </div>
    );
  }
}
