import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

export const initializeLoginFramework = () => {
  if (firebase.app.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      var token = res.credential.accessToken;
      var user = res.user;
      const newUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };
      return newUser;
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      console.log(error.message);
      // ...
    });
};

// Fb login needs url
export const handleFbLogin = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(user);
      const newUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };
      return newUser;
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      console.log(error.message);
    });
};

export const handleCreateWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      updateCurrentUserInfo(name);
      const newUser = {
        name: name,
        email: email,
      };
      return newUser;
    })
    .catch((error) => {
      return error.message;
    });
};

export const handleSignInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUser = {
        name: res.user.displayName,
        email: res.user.email,
      };
      return newUser;
    })
    .catch(function (error) {
      return error.message;
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(function () {
      const newUser = {
        name: "",
        email: "",
      };
      return newUser;
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
    });
};

const updateCurrentUserInfo = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      // Update successful.
      console.log("Update Succesful");
    })
    .catch(function (error) {
      // An error happened.
      console.log("Update failed");
    });
};
