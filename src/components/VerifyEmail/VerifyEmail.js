import React, { useContext, useEffect } from "react";
import { UserAndPlaceContext } from "../../App";
import { sendEmailVerification } from "../Login/loginManager";

const VerifyEmail = () => {
  const { setHeaderStyle } = useContext(UserAndPlaceContext);

  useEffect(() => {
    setHeaderStyle("white");
  }, [setHeaderStyle]);

  return (
    <div className="form-container">
      <div className="text-center">
        <p>Please check your email and confirm your account</p>
        <button
          onClick={sendEmailVerification}
          className="w-75 btn btn-success"
        >
          Resend
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
