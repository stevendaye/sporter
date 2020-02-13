import React, { Fragment, Component } from "react";
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Notifications from "../../components/layout/Notifications";
import doLoginWithErrorCheck from "../../thunks/login";
import facebookLogo from "../../assets/vendor/facebook/facebook_logo_white.png";
import twiiterLogo from "../../assets/vendor/twitter/twitter_logo_white.png";

class Login extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      submitted: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { feedback } = this.props;
    const { email, password } = this.state;
    this.props.onLogin(email, password);

    if (email !== "" && email.includes("@") && password.length >= 6) {
      this.setState({ submitted: true });
    }

    if (feedback === "Invalid Entries") {
      this.setState({ submitted: false });
    } else if (feedback === "Valid Entries") {
      this.setState({ submitted: true });
    }
  }
  UNSAFE_componentWillReceiveProps(props) {
    if (props.feedback === "Invalid Entries") {
      this.setState({ submitted: false });
    } else if (props.feedback === "Valid Entries") {
      this.setState({ submitted: true });
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    const { email, password, submitted } = this.state;

    if (isAuthenticated) {
      return <Redirect to = "/events"/>
    }

    return (
      <Fragment>
        <div className = "bg-img">
          <div className = "dark-overlay">
            <div className = "form-sign">
              <p className = "lead text-white"> Log into your account</p>
              <Notifications/>

              <form className = "form" onSubmit={ this.onSubmit }>
                <div className = "form-group">
                  <input
                    type = "email"
                    placeholder = "Email Address"
                    name = "email"
                    value = {email}
                    onChange = { this.onChange }
                    required
                  />
                </div>
                <div className = "form-group">
                  <input
                    type = "password"
                    placeholder = "Password"
                    name = "password"
                    minLength = "6"
                    value = {password}
                    onChange = { this.onChange }
                    required
                  />
                </div>
                <input
                  type = {submitted ? "button" : "submit"}
                  style = {{ width: "100%" }}
                  className = {submitted ? "btn btn-dim" : "btn btn-primary"}
                  value = {submitted ? "Loging in..." : "Login"}
                />
              </form>
              <div style = {{ margin: "25px 0 0 0" }} className = "social-login text-white">
                <div className = "login-with">
                  <hr/>
                  <span> Or With </span>
                  <hr/>
                </div>
                <a href = "/users/auth/login/facebook">
                  <button style = {{ margin: "15px 0 0 0", display: "flex", justifyContent: "center" }} className = "fa-facebook">
                    <div style = {{ border: "none", width: "20px", height: "20px", margin: "0.5px 2px 0 0" }}>
                      <img src = {facebookLogo} alt = "" title = "" />
                    </div>
                    facebook
                  </button>
                </a>
                <a href = "/users/auth/login/twitter">
                  <button style = {{ margin: "15px 0 0 0", display: "flex", justifyContent: "center" }} className = "fa-twitter">
                    <div style = {{ border: "none", width: "20px", height: "20px", margin: "2px 7px 0 0" }}>
                      <img src = {twiiterLogo} alt = "" title = "" />
                    </div>
                    twitter
                  </button>
                </a>
              </div>
              <br/>
              <p className = "my-1 text-white">
                Don't have an account? <Link to = "/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  feedback: PropTypes.string,
  onLogin: PropTypes.func.isRequired
}

const mapStateToPropsLogin = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  feedback: state.entriesState.message
});

const mapDispatchToPropsLogin = dispatch => ({
  onLogin: (email, password) =>
    dispatch(doLoginWithErrorCheck(email, password))
});

const ConnectedLogin = connect(mapStateToPropsLogin, mapDispatchToPropsLogin)(Login);

export default ConnectedLogin;
