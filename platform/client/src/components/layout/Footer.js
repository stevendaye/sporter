import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Footer = () =>
  <Fragment>
    <footer className = "footer">
      <Link to = "#/policy">Privacy &amp; Policy</Link> &nbsp;&nbsp;&nbsp;
      <Link to = "#/feedback">Feedback &amp; Suggestions</Link> &nbsp;&nbsp;&nbsp;
      &copy; 2019 Sports Poll, All Right Reserved
    </footer>
  </Fragment>

export default Footer;
