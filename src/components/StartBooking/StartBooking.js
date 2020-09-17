import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./StartBooking.css";
import { Controller, useForm } from "react-hook-form";
import { UserAndPlaceContext } from "../../App";
import ReactDatePicker from "react-datepicker";

// importing datepicker css
import "react-datepicker/dist/react-datepicker.css";

// default values for useForms parameter
const defaultvalues = {
  from: "",
  to: "",
  origin: "",
  destination: "",
};

const StartBooking = () => {
  const history = useHistory();

  // hooks for react-hooks-form
  const { register, handleSubmit, errors, control } = useForm({
    defaultvalues,
  });

  // Receiving data from context
  const { selectedPlace } = useContext(UserAndPlaceContext);

  // State for getting form data
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    from: "",
    to: "",
  });

  // Function to handle form submit
  const onSubmit = (data) => {
    setFormData(data);
    history.push("/availableHotels");
  };

  // destructuring required data
  const { placeName, description } = selectedPlace;

  return (
    <Container className="booking-container" fluid>
      <section className="banner">
        <Row>
          {/* Booking place details */}
          <Col md={6}>
            <h1>{placeName}</h1>
            <p>{description}</p>
          </Col>

          {/* Booking Form */}
          <Col md={6}>
            <div className="booking-form-container">
              <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="form-control"
                  placeholder="Origin"
                  name="origin"
                  ref={register({ required: "Origin required" })}
                />
                {errors.origin && (
                  <span className="error">{errors.origin.message}</span>
                )}
                <input
                  className="form-control mt-4"
                  placeholder="Destination"
                  defaultValue={selectedPlace.placeName}
                  name="destination"
                  ref={register({ required: "Destination required" })}
                />
                {errors.destination && (
                  <span className="error">{errors.destination.message}</span>
                )}

                {/* React detepickers */}
                <div style={{ width: "355px", margin: "15px 0px" }}>
                  <div style={{ float: "left", width: "50%" }}>
                    <Controller
                      control={control}
                      name="from"
                      register={register({ required: "From required" })}
                      render={(props) => (
                        <ReactDatePicker
                          className="form-control"
                          placeholderText="From"
                          minDate={new Date()}
                          dateFormat="dd/MM"
                          onChange={(e) => props.onChange(e)}
                          selected={props.value}
                        />
                      )}
                    />
                    {errors.from && (
                      <span className="error">{errors.from.message}</span>
                    )}
                  </div>
                  <div
                    style={{
                      float: "right",
                      width: "50%",
                    }}
                  >
                    <Controller
                      control={control}
                      name="to"
                      register={register({ required: "To required" })}
                      render={(props) => (
                        <ReactDatePicker
                          className="form-control ml-3"
                          placeholderText="To"
                          minDate={new Date()}
                          dateFormat="dd/MM"
                          onChange={(e) => props.onChange(e)}
                          selected={props.value}
                        />
                      )}
                    />
                    {errors.to && (
                      <span className="error">{errors.to.message}</span>
                    )}
                  </div>
                </div>
                <br />
                <input
                  type="submit"
                  value="Start Booking"
                  className="form-control mt-4"
                  style={{ backgroundColor: "orange" }}
                />
              </form>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default StartBooking;
