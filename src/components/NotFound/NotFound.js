import React, { useContext, useEffect } from "react";
import { UserAndPlaceContext } from "../../App";

const NotFound = () => {
  const { setHeaderStyle } = useContext(UserAndPlaceContext);

  useEffect(() => {
    setHeaderStyle("white");
  }, [setHeaderStyle]);

  return (
    <div>
      <h3>This page not exist</h3>
    </div>
  );
};

export default NotFound;
