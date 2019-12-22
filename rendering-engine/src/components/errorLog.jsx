import React from "react";
import { infoLogPage, development } from "../defaults.json";

const ErrorLog = props => {
  const severitieMsg = ["Info", "Note", "Warning", "ERROR"];
  const severities = ["black", "blue", "orange", "red"];
  const sevirityIdx = props.severity ? props.severity : 0;
  const severity = severities[sevirityIdx];
  const style = { color: severity };
  if (infoLogPage) {
    return (
      <div>
        <h1 style={style}>
          {severitieMsg[sevirityIdx]}: {props.statement}
        </h1>
        <h2 style={style}>Details: {props.details}</h2>
      </div>
    );
  }
  if (development)
    console.log(
      severitieMsg[sevirityIdx] +
        ":" +
        props.statement +
        "\nDetails:" +
        props.details
    );
  return null;
};

export default ErrorLog;
