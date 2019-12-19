import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder";

// For each of these location retrievers, global geocoder
const geocoder = L.Control.Geocoder.nominatim();

class Location extends Component {
  getAnswers = inputValue => {
    return new Promise((resolve, reject) => {
      geocoder.geocode(inputValue, results => {
        // The required attribute for the results is a label which is displayed as search options
        resolve(results.map(result => ({ label: result.name })));
      });
    });
  };

  loadLocations = async (inputValue, callback) =>
    callback(await this.getAnswers(inputValue));
  render() {
    return (
      <AsyncSelect
        cacheOptions
        loadOptions={this.loadLocations}
        defaultOptions
      />
    );
  }
}

export default Location;
