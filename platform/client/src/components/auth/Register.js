import React, { Fragment, Component } from "react";
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Notifications from "../../components/layout/Notifications";
import doSetRemoveNotifications from "../../thunks/notifications";
import doRegisterWithErrorCheck from "../../thunks/register";

class Register extends Component {
  _isMounted = false;

  constructor (props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
      submitted: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { feedback } = this.props;
    const { name, email, password, confirmPass } = this.state;
    password !== confirmPass
    ? this.props.onSetNotification("Passwords do not match!", "danger")
    : this.props.onRegister(name, email, password);

    if (password === confirmPass && password.length >= 6 && name.length > 5 && email.includes("@")) {
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
    const { name, email, password, confirmPass, submitted } = this.state;

    if (isAuthenticated) {
      return <Redirect to = "/events" />
    }

    return (
      <Fragment>
        <div className = "bg-img">
          <div className = "dark-overlay">
            <div className = "form-sign">
              <p className = "text-white lead">Create an account</p>
              <Notifications/>

              <form className = "form" onSubmit = { this.onSubmit }>
                <div className = "form-group">
                  <input
                    type = "text"
                    placeholder = "Name"
                    name = "name"
                    value = {name}
                    onChange = { this.onChange }
                    ref = { el => this.nameInput = el }
                    required
                  />
                </div>
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
                <div className = "form-group">
                  <input
                    type = "password"
                    placeholder = "Confirm Password"
                    name = "confirmPass"
                    minLength = "6"
                    value = {confirmPass}
                    onChange = { this.onChange }
                    required
                  />
                </div>
                <input
                  type = {submitted ? "button" : "submit"}
                  style = {{ width: "100%" }}
                  className = { submitted ? "btn btn-dim" : "btn btn-primary"}
                  value = {submitted ? "Registering..." : "Register"}
                />
              </form>
              <br/>
              <p className = "my-1 text-white">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Register.propTypes = {
  feedback: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  onRegister: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired
}

const mapStateToPropsRegister = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  feedback: state.entriesState.message
});

const mapDispatchToPropsRegister = dispatch => ({
  onSetNotification: (message, alert) =>
    dispatch(doSetRemoveNotifications(message, alert)),
  onRegister: (name, email, password) =>
    dispatch(doRegisterWithErrorCheck(name, email, password))
});

const ConnectedRegister = connect(mapStateToPropsRegister, mapDispatchToPropsRegister)(Register);

export default ConnectedRegister;
