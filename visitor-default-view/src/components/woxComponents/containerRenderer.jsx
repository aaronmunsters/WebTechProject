import React from "react";
import { Col, Row } from "react-bootstrap";
import ComponentRenderer from "../componentRenderer.jsx";
import ErrorLog from "../errorLog.jsx";

const ContainerRenderer = props => {
  const { style, ids } = props.content;
  let ReactComp = Row;
  if (style === "horizontal") ReactComp = Col;
  if (style === "vertical") ReactComp = Row;
  return (
    <ReactComp>
      {ids.map(id => {
        return id !== props.parent ? (
          <Col key={id}>
            <div key={id}>
              <ComponentRenderer key={id} id={id} />
            </div>
          </Col>
        ) : (
          <ErrorLog
            key={id}
            statement={"Container tried to render self"}
            details={"Component id: " + id}
            severity={2}
          />
        );
      })}
    </ReactComp>
  );
};

export default ContainerRenderer;
