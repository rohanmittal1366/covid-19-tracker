import React from "react";
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
// import {  } from "leaflet";
import { showDataOnMap } from "../../util";
import "./Map.css";

const Map = ({ countries, casesType, center, zoom }) => {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <LeafletMap
      casesType={casesType}
      className="map"
      center={center}
      zoom={zoom}
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {showDataOnMap(countries, casesType)}
    </LeafletMap>
  );
};

export default Map;
