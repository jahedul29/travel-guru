import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { UserAndPlaceContext } from "../../App";
import { handleSignOut } from "../Login/loginManager";
import "./Header.css";

const searchIconStyle = {
  position: "relative",
  right: "10%",
  color: "black",
};

const Header = () => {
  const { loggedInUser, setLoggedInUser, headerStyle } = useContext(
    UserAndPlaceContext
  );
  let history = useHistory();

  const handleLoggingButton = () => {
    if (loggedInUser.name) {
      handleSignOut();
      setLoggedInUser({});
      history.push("/");
    } else {
      history.push("/login");
    }
  };

  return (
    <Container fluid style={{ marginBottom: "50px" }}>
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand href="">
          <Link to="/">
            <img
              className={headerStyle ? "brand-img-black" : "brand-img"}
              src="https://i.imgur.com/51EpLUJ.png"
              alt=""
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Form inline style={{ width: "100%" }}>
              <FormControl type="text" placeholder="Search" />
              <FontAwesomeIcon
                icon={faSearch}
                style={searchIconStyle}
              ></FontAwesomeIcon>
            </Form>
          </Nav>
          <Nav style={{ width: "60%" }}>
            <Nav.Link
              className={
                headerStyle ? "orange-link-black" : "orange-link-button"
              }
            >
              News
            </Nav.Link>
            <Nav.Link
              className={
                headerStyle ? "orange-link-black" : "orange-link-button"
              }
            >
              Destination
            </Nav.Link>
            <Nav.Link
              className={
                headerStyle ? "orange-link-black" : "orange-link-button"
              }
            >
              Blog
            </Nav.Link>
            <Nav.Link
              className={
                headerStyle ? "orange-link-black" : "orange-link-button"
              }
            >
              Contact
            </Nav.Link>
            <Nav.Link
              onClick={handleLoggingButton}
              className={
                headerStyle ? "orange-link-black" : "orange-link-button"
              }
            >
              {loggedInUser.name ? "LogOut" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;
