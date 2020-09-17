import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <Container fluid>
      <Navbar style={{ margin: "0 4%" }}>
        <Navbar.Brand style={{ width: "10%" }} href="">
          <Link to="/">
            <img
              className="brand-img"
              src="https://i.imgur.com/51EpLUJ.png"
              alt=""
            />
          </Link>
        </Navbar.Brand>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="" />
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              position: "relative",
              right: "10%",
              color: "black",
            }}
          ></FontAwesomeIcon>
        </Form>
        <Nav>
          <Nav.Link className="orange-link-button" href="#home">
            News
          </Nav.Link>
          <Nav.Link className="orange-link-button" href="#features">
            Destination
          </Nav.Link>
          <Nav.Link className="orange-link-button" href="#pricing">
            Blog
          </Nav.Link>
          <Nav.Link className="orange-link-button" href="#pricing">
            Contact
          </Nav.Link>
          <Nav.Link className="orange-link-button" href="#pricing">
            Login
          </Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Header;
