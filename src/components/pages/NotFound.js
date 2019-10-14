import React from "react";

const NotFound = () => {
  return (
    <>
      <h1
        style={{
          color: "#358bdc"
        }}
      >
        <i className="far fa-times-circle"></i> PAGE NOT FOUND
      </h1>
      <p className="lead">The page you are looking for does not exist</p>
    </>
  );
};

export default NotFound;
