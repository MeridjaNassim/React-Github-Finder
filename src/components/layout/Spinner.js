import React from "react";
import spinner from "./spinner.gif";
const Spinner = () => {
  return (
    <>
      <img
        src={spinner}
        alt="loading..."
        style={{
          width: 200,
          margin: "auto",
          display: "block"
        }}
      ></img>
    </>
  );
};

export default Spinner;
