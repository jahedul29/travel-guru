import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./StartBooking.css";
import { Controller, useForm } from "react-hook-form";
import { UserAndPlaceContext } from "../../App";
import ReactDatePicker from "react-datepicker";
import { addDays } from "date-fns";

// importing datepicker css
import "react-datepicker/dist/react-datepicker.css";

const StartBooking = () => {
  const history = useHistory();

  // Receiving data from context
  const { selectedPlace, setHeaderStyle, setBookingInfo } = useContext(
    UserAndPlaceContext
  );

  // destructuring required data
  const { placeName, description } = selectedPlace;

  // hooks for react-hooks-form
  const { register, handleSubmit, errors, control, getValues } = useForm({});

  useEffect(() => {
    setHeaderStyle("");
  }, [setHeaderStyle]);

  // Function to handle form submit
  const onSubmit = (data) => {
    setBookingInfo(data);
    history.push("/availableHotels");
  };

  return (
    <Container className="banner-container" fluid>
      <section className="banner">
        <Row>
          {/* Booking place details */}
          <Col md={6} className="mb-1">
            <div className="m-auto">
              <h1>{placeName}</h1>
              <p>{description}</p>
            </div>
          </Col>

          {/* Booking Form */}
          <Col md={6} className="mb-1">
            <div className="booking-form-container m-auto">
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
                  readOnly
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
                      defaultValue=""
                      name="from"
                      rules={{
                        required: {
                          value: true,
                          message: "From required",
                        },
                      }}
                      render={(props) => (
                        <ReactDatePicker
                          className="form-control"
                          placeholderText="From"
                          minDate={new Date()}
                          maxDate={addDays(new Date(), 7)}
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
                      defaultValue=""
                      name="to"
                      rules={{
                        required: {
                          value: true,
                          message: "To required",
                        },
                        validate: () =>
                          getValues("from") < getValues("to") ||
                          "To must be less then from.",
                      }}
                      render={(props) => (
                        <ReactDatePicker
                          className="form-control ml-3"
                          placeholderText="To"
                          minDate={new Date()}
                          maxDate={addDays(new Date(), 7)}
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
