import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import StartBooking from "./components/StartBooking/StartBooking";
import Login from "./components/Login/Login";
import AvailableHotels from "./components/AvailableHotels/AvailableHotels";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFound from "./components/NotFound/NotFound";
import PasswordRecovery from "./components/PasswordRecovery/PasswordRecovery";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";

export const UserAndPlaceContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [headerStyle, setHeaderStyle] = useState("");
  // State for getting form data
  const [bookingInfo, setBookingInfo] = useState({});

  return (
    <UserAndPlaceContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        selectedPlace,
        setSelectedPlace,
        headerStyle,
        setHeaderStyle,
        bookingInfo,
        setBookingInfo,
      }}
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
          <Route path="/resetPassword">
            <PasswordRecovery />
          </Route>
          <Route path="/verifyEmail">
            <VerifyEmail />
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
