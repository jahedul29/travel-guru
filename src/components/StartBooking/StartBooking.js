import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./StartBooking.css";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "../../App";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const defaultvalues = {
  from: "",
  to: "",
  origin: "",
  destination: "",
};

const StartBooking = () => {
  const history = useHistory();
  const { register, handleSubmit, watch, errors, control } = useForm({
    defaultvalues,
  });
  const { selectedPlace } = useContext(UserContext);

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    from: "",
    to: "",
  });

  const onSubmit = (data) => {
    setFormData(data);
    history.push("/availableHotels");
  };

  console.log(formData);

  return (
    <Container className="booking-container" fluid>
      <section className="banner">
        <Row>
          <Col md={6}>
            <h1>{selectedPlace.placeName}</h1>
            <p>{selectedPlace.description}</p>
          </Col>
          <Col md={6}>
            <div
              style={{
                width: "420px",
                height: "280px",
                backgroundColor: "white",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <form
                style={{
                  width: "400px",
                  marginLeft: "30px",
                }}
                onSubmit={handleSubmit(onSubmit)}
              >
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
