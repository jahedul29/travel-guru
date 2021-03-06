import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserAndPlaceContext } from "../../App";
import "./Login.css";
import {
  handleCreateWithEmailAndPassword,
  handleFbLogin,
  handleGoogleSignIn,
  handleSignInWithEmailAndPassword,
  initializeLoginFramework,
} from "./loginManager";

// Initializing firebase
initializeLoginFramework();

const Login = () => {
  // Hooks for react-form-hooks
  const { register, handleSubmit, errors, getValues } = useForm();
  // state for toggling new user and registered user
  const [isNewUser, setIsNewUser] = useState(true);

  // state for storing logged in user data
  const { loggedInUser, setLoggedInUser, setHeaderStyle } = useContext(
    UserAndPlaceContext
  );

  useEffect(() => {
    setHeaderStyle("white");
  }, [setHeaderStyle]);

  // State for storing login error message
  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const onSubmit = (data) => {
    const newUser = {
      name: data.firstName + " " + data.lastName,
      email: data.email,
      password: data.password,
    };

    isNewUser
      ? createWithEmailAndPassword(
          newUser.name,
          newUser.email,
          newUser.password
        )
      : signInWithEmailAndPassword(newUser.email, newUser.password);
  };

  const createWithEmailAndPassword = (name, email, password) => {
    handleCreateWithEmailAndPassword(name, email, password)
      .then((res) => {
        if (typeof res === "string") {
          setErrorMessage(res);
        } else {
          setErrorMessage("");
          history.replace("/verifyEmail");
        }
      })
      .catch((error) => {});
  };

  const signInWithEmailAndPassword = (email, password) => {
    handleSignInWithEmailAndPassword(email, password)
      .then((res) => {
        if (typeof res === "string") {
          setErrorMessage(res);
        } else {
          setLoggedInUser(res);
          setErrorMessage("");
          history.replace(from);
        }
      })
      .catch((error) => {});
  };

  // Function to handle google signIN
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  // Function to handle Facebook signIN
  //! Fb login needs url
  const fbLoginIn = () => {
    handleFbLogin().then((res) => {
      console.log(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  return (
    <Container className="login-container">
      <div className="form-container">
        <div className="m-auto input-form-container">
          <h4>{isNewUser ? "Create an account" : "Sign In"}</h4>
          <form className="signing-form" onSubmit={handleSubmit(onSubmit)}>
            {isNewUser && (
              <input
                placeholder="First Name"
                className="form-control"
                name="firstName"
                ref={register({
                  required: "Name is required",
                  pattern: {
                    value: /[A-Za-z]{3}/,
                    message:
                      "Name must contain minimum 3 letter and only letter", // <p>error message</p>
                  },
                })}
              />
            )}
            {errors.firstName && (
              <span className="error">{errors.firstName.message}</span>
            )}

            {isNewUser && (
              <input
                placeholder="Last Name"
                className="form-control"
                name="lastName"
                ref={register({
                  required: "Name is required",
                  pattern: {
                    value: /[A-Za-z]{3}/,
                    message:
                      "Name must contain minimum 3 letter and only letter", // <p>error message</p>
                  },
                })}
              />
            )}
            {errors.lastName && (
              <span className="error">{errors.lastName.message}</span>
            )}

            <input
              placeholder="Your Email"
              className="form-control"
              name="email"
              ref={register({
                required: "Email required",
                pattern: {
                  value: /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}

            <input
              placeholder="Enter a password"
              type="password"
              className="form-control"
              name="password"
              ref={register({
                required: "Password required",
                pattern: {
                  value: /^([a-zA-Z0-9@*#]{8,15})$/,
                  message:
                    "Password must contain Small and capital letter, Number and any character. It should be 8-15 char long",
                },
              })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}

            {isNewUser && (
              <input
                placeholder="Confirm password"
                type="password"
                className="form-control"
                name="confirm"
                ref={register({
                  required: true,
                  validate: (val) =>
                    val === getValues("password") || "Password don't match",
                })}
              />
            )}
            {errors.confirm && (
              <span className="error">{errors.confirm.message}</span>
            )}

            <input
              className="form-control submit-btn"
              type="submit"
              value={isNewUser ? "Sign Up" : "Sign In"}
            />
            <input
              onClick={() => {
                setIsNewUser(!isNewUser);
                setErrorMessage("");
              }}
              type="button"
              className="form-control toggle-btn text-center"
              value={
                isNewUser ? "Already have an account?" : "Create new account"
              }
            ></input>
          </form>
          {errorMessage && (
            <span className="error">
              {errorMessage} <br />{" "}
            </span>
          )}
          {!isNewUser && <Link to="/resetPassword">Forget password?</Link>}
          {!isNewUser && (
            <div>
              <h6 className="or-line">
                <span>Or</span>
              </h6>
              <div onClick={googleSignIn} className="login-alternative">
                <img src="https://i.imgur.com/P9ZVhek.png" alt="" />
                <h6 className="mt-1">Sign in with google</h6>
              </div>
              <div onClick={fbLoginIn} className="login-alternative">
                <img src="https://i.imgur.com/oozxCkP.png" alt="" />
                <h6 className="mt-1">Sign in with facebook</h6>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Login;
