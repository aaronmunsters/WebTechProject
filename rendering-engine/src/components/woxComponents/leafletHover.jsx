import React, { Component } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Card } from "react-bootstrap";

class LeafletHover extends Component {
  state = { mapOpen: false };

  toggleMap = () => {
    const newState = this.state;
    newState.mapOpen = !newState.mapOpen;
    this.setState(newState);
  };

  // to render the map
  leafletMap = position => (
    <Map
      style={{
        width: "100%",
        height: "100%"
      }}
      center={position}
      zoom={13}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} />
    </Map>
  );

  render() {
    const map = this.state.mapOpen ? (
      <Card
        style={{
          width: "90vw",
          height: "70vh",
          marginLeft: "5vw",
          marginRight: "5vw"
        }}
      >
        <Card.Body>{this.leafletMap(this.props.location)}</Card.Body>
      </Card>
    ) : null;

    const openMapButton = (
      <Button
        style={{ height: "3rem", color: "black", margin: "1rem" }}
        onClick={this.toggleMap}
      >
        {this.state.mapOpen ? (
          <b>X</b>
        ) : (
          <img
            style={{ width: "1rem", height: "1rem" }}
            src="http://images.clipartpanda.com/google-location-icon-location_black.png"
            alt="location"
          />
        )}
      </Button>
    );

    return (
      <div
        style={{
          position: "fixed",
          top: "1rem",
          zIndex: "10",
          margin: "1rem"
        }}
      >
        <h1 style={{ color: "white" }}>{this.props.caption}</h1>
        {this.props.location ? (
          <div>
            {openMapButton}
            {map}
          </div>
        ) : null}
      </div>
    );
  }
}

export default LeafletHover;
