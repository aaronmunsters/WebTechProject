import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder";

const Location = () => {
  const geocoder = L.Control.Geocoder.nominatim();

  const searchString = "VUB Brussel"; // Known to work

  console.log(
    geocoder.geocode(searchString, results => {
      console.log(results);
    })
  );
  return null;
};

export default Location;
