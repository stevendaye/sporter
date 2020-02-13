import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { doLogout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, isLoading, user }, onLogout }) => {
  const authLinks = (
    <ul>
      <li>
        <span>
          {user && user.name.split(" ")[0]}
        </span>
      </li>
      <li>
        <a href = "#/logout" onClick = { onLogout }>
          logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to = "/register" className = "hide-sm">
          Sign Up
        </Link>
      </li>
      <li>
        <Link to = "/login" className = "hide-sm">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className = "navbar bg-dark">
      <h1>
        <Link to = "/">
          Sports Poll
        </Link>
      </h1>
      { !isLoading && (
        <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>
      )}
    </nav>
  );
}

Navbar.propsTypes = {
  auth: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
}

const mapStateToPropsNavbar = state => ({
  auth: state.authState,
});

const mapDispatchToPropsNavbar = dispatch => ({
  onLogout: () => dispatch(doLogout())
});

const ConnectedNavbar = connect(mapStateToPropsNavbar, mapDispatchToPropsNavbar)(Navbar);

export default ConnectedNavbar;
