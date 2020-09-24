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
  const { selectedPlace, setHeaderStyle, bookingInfo } = useContext(
    UserAndPlaceContext
  );
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
    const loadedHotels = fakeHotels.filter(
      (hotel) => hotel.placeId === selectedPlace.id
    );
    setHotels(loadedHotels);
    setHeaderStyle("white");
  }, [selectedPlace.id, setHeaderStyle]);

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
        <Col md={6} className="mb-4">
          {!hotels.length ? (
            <h3>No hotels are free</h3>
          ) : (
            <div>
              <h5>Stay in {selectedPlace.placeName}</h5>
              <p>
                from{" "}
                {bookingInfo.from.getDate() + "/" + bookingInfo.from.getMonth()}{" "}
                to {bookingInfo.to.getDate() + "/" + bookingInfo.to.getMonth()}
              </p>
              {hotels.map((hotel) => (
                <Hotel key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
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
