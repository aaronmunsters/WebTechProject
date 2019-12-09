import React from "react";

const ErrorLog = props => {
  const severitieMsg = ["Info", "Note", "Warning", "ERROR"];
  const severities = ["black", "blue", "orange", "red"];
  const sevirityIdx = props.severity ? props.severity : 0;
  const severity = severities[sevirityIdx];
  const style = { color: severity };
  return (
    <React.Fragment>
      <h1 style={style}>
        {severitieMsg[sevirityIdx]}: {props.main}
      </h1>
      <h2 style={style}>Details: {props.det}</h2>
    </React.Fragment>
  );
};

export default ErrorLog;
