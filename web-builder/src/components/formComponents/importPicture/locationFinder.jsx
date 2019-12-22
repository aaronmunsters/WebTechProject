import React from "react";
import AsyncSelect from "react-select/async";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder";

/* ------------------------------------------------------------------
Location gets a string and searches via the Leaflet api to a location
wich corresponds to the given string. It gives back the long and lat
of the location
-------------------------------------------------------------------*/
export default function Location(props) {
  const geocoder = L.Control.Geocoder.nominatim();
  const getAnswers = inputValue => {
    return new Promise((resolve, reject) => {
      geocoder.geocode(inputValue, results => {
        // The required attribute for the results is a label which is displayed as search options
        resolve(
          results.map(result => ({ label: result.name, value: result.center }))
        );
      });
    });
  };
  const handleChange = event => {
    const { onChange } = props;
    let value = event && event.value !== undefined ? event.value : event;
    onChange(value);
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
