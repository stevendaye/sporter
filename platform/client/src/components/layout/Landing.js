import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to = "/events"/>
  }

  return (
    <Fragment>
      <section className = "landing">
        <div className = "dark-overlay">
          <div className = "landing-inner">
            <h1 className = "large">
              The true champion believes in the impossible
            </h1>
            <p className = "lead">
              VOTE LIKE A CHAMPION TODAY!
            </p>
            <div className = "buttons">
              <Link to = "/events" className = "btn btn-primary hide-sm show-md">
                Start voting your team
              </Link>
              <Link to = "/register" className = "btn btn-primary show-sm hide-default">
                Register Now
              </Link>
              <br/> <br/>
              <Link to = "/login" className = "btn btn-primary show-sm hide-default">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToPropsLanding = state => ({
  isAuthenticated: state.authState.isAuthenticated
});

const ConnectedLanding = connect(mapStateToPropsLanding)(Landing);

export default ConnectedLanding;
