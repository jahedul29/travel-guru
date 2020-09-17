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
  const { loggedInUser, setLoggedInUser } = useContext(UserAndPlaceContext);
  let history = useHistory();

  const handleLoggingButton = () => {
    if (loggedInUser.email) {
      handleSignOut();
      setLoggedInUser({});
      history.push("/");
    } else {
      history.push("/login");
    }
  };

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
          <FormControl type="text" placeholder="Search" />
          <FontAwesomeIcon
            icon={faSearch}
            style={searchIconStyle}
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
          <Nav.Link
            onClick={handleLoggingButton}
            className="orange-link-button"
            href="#pricing"
          >
            {loggedInUser.email ? "LogOut" : "Login"}
          </Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Header;
