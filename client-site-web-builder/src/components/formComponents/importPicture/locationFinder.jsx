import React from "react";
import AsyncSelect from "react-select/async";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder";

const Location = () => {
  const geocoder = L.Control.Geocoder.nominatim();

  const getAnswers = async inputValue => {
    let answers = [];
    geocoder.geocode(inputValue, results => {
      answers = results.map(result => {
        return { value: result.name, name: result.name };
      });
      console.log("results", results, answers);
    });
    return answers;
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(getAnswers(inputValue));
      }, 1000);
    });
  return (
    <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
  );
};

export default Location;
