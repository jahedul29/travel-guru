import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserAndPlaceContext } from "../../App";
import fakePlaces from "../../fakedata/places";
import "./Home.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  // State for containing selected place
  const [places, setPlaces] = useState([]);

  // Receiving data from context
  const { setSelectedPlace, setHeaderStyle } = useContext(UserAndPlaceContext);

  // hooks for changing location
  let history = useHistory();

  // Loading all places
  useEffect(() => {
    const loadedPlaces = fakePlaces;
    setPlaces(loadedPlaces);
    setHeaderStyle("");
  }, [setHeaderStyle]);

  const activePlace = places.find((place) => place.id === activeSlide);

  return (
    <Container className="banner-container " fluid>
      <section className="banner">
        <Row>
          <Col md={4} className="d-none d-md-block my-auto">
            <div>
              <h1>{activePlace && activePlace.placeName}</h1>
              <p>{activePlace && activePlace.description}</p>
              <button
                onClick={() => {
                  setSelectedPlace(activePlace);
                  history.push("/book");
                }}
                className="orange-button"
              >
                Booking →
              </button>
            </div>
          </Col>
          <Col sm={12} md={8}>
            <Swiper
              tag="section"
              wrapperTag="ul"
              spaceBetween={1}
              centeredSlides={true}
              autoplay={{ delay: 3000 }}
              slidesPerView={"auto"}
              navigation
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => setActiveSlide(swiper.activeIndex + 1)}
              onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex + 1)}
            >
              {places.map((place) => (
                <SwiperSlide tag="li" key={place.id}>
                  <img
                    style={{ borderRadius: "20px" }}
                    src={place.photoUrl}
                    alt=""
                  />
                  <h5>{place.placeName}</h5>
                  <button
                    onClick={() => {
                      setSelectedPlace(activePlace);
                      history.push("/book");
                    }}
                    className="d-md-none d-sm-block orange-button"
                  >
                    Booking →
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Home;
