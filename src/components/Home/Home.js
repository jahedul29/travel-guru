import React, { useContext, useEffect, useState } from "react";
import { Col, Carousel, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserAndPlaceContext } from "../../App";
import fakePlaces from "../../fakedata/places";
import "./Home.css";

const Home = () => {
  // State for containning selected place
  const [places, setPlaces] = useState([]);

  // Receiving data from context
  const { setSelectedPlace } = useContext(UserAndPlaceContext);

  // hooks for changing location
  let history = useHistory();

  // Loading all places
  useEffect(() => {
    const loadedPlaces = fakePlaces;
    setPlaces(loadedPlaces);
  }, []);

  return (
    <Container className="banner-container" fluid>
      <section className="banner">
        {/* Carousel For containing place information */}
        <Carousel>
          {places.map((place) => (
            <Carousel.Item key={place.id} interval={1000}>
              <Row className="d-flex align-items-center">
                {/* Place Info */}
                <Col md={5}>
                  <h1>{place.placeName}</h1>
                  <p>{place.description}</p>
                  <button
                    onClick={() => {
                      setSelectedPlace(place);
                      history.push("/book");
                    }}
                    className="orange-button"
                  >
                    Booking →
                  </button>
                </Col>

                {/* place image */}
                <Col md={{ span: 5, offset: 1 }}>
                  <img className="carousel-img" src={place.photoUrl} alt="" />
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    </Container>
  );
};

export default Home;
