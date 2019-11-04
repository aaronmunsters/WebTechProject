import React, { useState } from "react";
import Navigation from "./components/navigation";
import Page from "./components/Page";

export default function App(props) {
  const [destinationIndex, setDestinationIndex] = useState(0);

  return (
    <React.Fragment>
      <Navigation
        {...props}
        destinationIndex={destinationIndex}
        setDestinationIndex={setDestinationIndex}
      />
      <Page
        {...props}
        destinationIndex={destinationIndex}
        setDestinationIndex={setDestinationIndex}
      />
    </React.Fragment>
  );
}
