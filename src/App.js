import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import StartBooking from "./components/StartBooking/StartBooking";
import Login from "./components/Login/Login";
import AvailableHotels from "./components/AvailableHotels/AvailableHotels";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFound from "./components/NotFound/NotFound";

export const UserAndPlaceContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  return (
    <UserAndPlaceContext.Provider
      value={{ loggedInUser, setLoggedInUser, selectedPlace, setSelectedPlace }}
    >
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/book">
            <StartBooking />
          </Route>
          <PrivateRoute path="/availableHotels">
            <AvailableHotels />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserAndPlaceContext.Provider>
  );
}

export default App;
