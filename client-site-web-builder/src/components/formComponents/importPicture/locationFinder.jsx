import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder";

// For each of these location retrievers, global geocoder
const geocoder = L.Control.Geocoder.nominatim();

export default function Location(props) {
  const getAnswers = inputValue => {
    return new Promise((resolve, reject) => {
      geocoder.geocode(inputValue, results => {
        console.log(results, "result");
        // The required attribute for the results is a label which is displayed as search options
        resolve(
          results.map(result => ({ label: result.name, value: result.center }))
        );
      });
    });
  };
  const handleChange = event => {
    let value = event && event.value !== undefined ? event.value : event;
    console.log(value, "value");
  };
  return (
    <AsyncSelect
      cacheOptions
      onChange={handleChange}
      // cb is callback which is applied to results once they're loaded
      loadOptions={async (input, cb) => cb(await getAnswers(input))}
      defaultOptions
    />
  );
}
