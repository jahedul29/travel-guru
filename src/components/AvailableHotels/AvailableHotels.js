import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserAndPlaceContext } from "../../App";
import fakeHotels from "../../fakedata/hotels";
import fakeLocations from "../../fakedata/location";
import Hotel from "../Hotel/Hotel";
import { Map, Marker, TileLayer } from "react-leaflet";
import "./AvailableHotels.css";

const AvailableHotels = () => {
  // Receiving data from context
  const { selectedPlace } = useContext(UserAndPlaceContext);
  // State for storing all hotels information
  const [hotels, setHotels] = useState([]);
  // State for storing location information
  const [selectedLocation, setSelectedLocation] = useState({
    id: "",
    lat: "",
    long: "",
  });

  // Loading all hotels information
  useEffect(() => {
    const loadedHotels = fakeHotels;
    setHotels(loadedHotels);
  }, []);

  // Loading location information of selected
  useEffect(() => {
    const loadedLocation = fakeLocations.find(
      (location) => location.id === selectedPlace.id
    );
    setSelectedLocation(loadedLocation);
  }, [selectedPlace.id]);

  return (
    <Container>
      <Row>
        {/* Available hotel information */}
        <Col md={6}>
          <h5>Stay in {selectedPlace.placeName}</h5>
          {hotels.map((hotel) => (
            <Hotel key={hotel.id} hotel={hotel} />
          ))}
        </Col>

        {/* Google map */}
        <Col md={6}>
          <div className="map-container">
            <Map
              center={[selectedLocation.lat, selectedLocation.long]}
              zoom={12}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[selectedLocation.lat, selectedLocation.long]}
              ></Marker>
            </Map>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AvailableHotels;
