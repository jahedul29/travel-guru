import React, { createContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Switch from "react-bootstrap/esm/Switch";
import Home from "./components/Home/Home";
import StartBooking from "./components/StartBooking/StartBooking";
import Login from "./components/Login/Login";
import AvailableHotels from "./components/AvailableHotels/AvailableHotels";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  return (
    <UserContext.Provider
      value={{ loggedInUser, setLoggedInUser, selectedPlace, setSelectedPlace }}
    >
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/book">
            <StartBooking />
          </Route>
          <Route path="/availableHotels">
            <AvailableHotels />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
