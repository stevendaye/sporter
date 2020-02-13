import React, { Fragment } from "react";

const NotFound = () =>
  <Fragment>
    <div style = {{ textAlign: "center" }}>
      <h1 className = "x-large text-primary">
        <span style ={{ display: "block" }}> &#9785; </span>
        Page Not Found
      </h1>
      <p className = "large">
        Sorry, you have taken a wrong turn
      </p>
    </div>
  </Fragment>

export default NotFound;
