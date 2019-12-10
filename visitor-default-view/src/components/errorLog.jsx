import React from "react";
import { infoLogPage } from "../defaults.json";

const ErrorLog = props => {
  const severitieMsg = ["Info", "Note", "Warning", "ERROR"];
  const severities = ["black", "blue", "orange", "red"];
  const sevirityIdx = props.severity ? props.severity : 0;
  const severity = severities[sevirityIdx];
  const style = { color: severity };
  if (JSON.parse(infoLogPage)) {
    return (
      <div>
        <h1 style={style}>
          {severitieMsg[sevirityIdx]}: {props.main}
        </h1>
        <h2 style={style}>Details: {props.det}</h2>
      </div>
    );
  }
  console.log(
    severitieMsg[sevirityIdx] + ":" + props.main + "\nDetails:" + props.det
  );
  return null;
};

export default ErrorLog;
