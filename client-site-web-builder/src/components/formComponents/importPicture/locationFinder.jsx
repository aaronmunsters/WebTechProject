import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder";

// For each of these location retrievers, global geocoder
const geocoder = L.Control.Geocoder.nominatim();

const Location = () => {
  const getAnswers = inputValue => {
    return new Promise((resolve, reject) => {
      geocoder.geocode(inputValue, results => {
        // The required attribute for the results is a label which is displayed as search options
        resolve(results.map(result => ({ label: result.name })));
      });
    });
  };

  return (
    <AsyncSelect
      cacheOptions
      // cb is callback which is applied to results once they're loaded
      loadOptions={async (input, cb) => cb(await getAnswers(input))}
      defaultOptions
    />
  );
};

export default Location;
