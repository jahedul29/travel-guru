import React, { useContext, useEffect, useState } from "react";
import { Col, Carousel, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import fakePlaces from "../../fakedata/places";
import "./Home.css";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const { setSelectedPlace } = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    const loadedPlaces = fakePlaces;
    setPlaces(loadedPlaces);
  }, []);

  return (
    <Container className="banner-container" fluid>
      <section className="banner">
        <Carousel>
          {places.map((place) => (
            <Carousel.Item key={place.id} interval={1000}>
              <Row className="d-flex align-items-center">
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
