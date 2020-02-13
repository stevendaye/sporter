import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Notifications = ({ notifications, isAuthenticated }) =>
  notifications !== null && notifications.length > 0 &&
  <div style = {{ position: "relative" }}>
    {notifications.map(notification =>
      <div key = {notification.id} className = {`alert alert-${notification.alert}`}>
        {notification.message}
      </div>
    )}
  </div>

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool
};

// Create a seletor to select only the notification state
const getNotifications = state =>
  getArrayOfObject(state.notificationsState);

// Create mapStateToPropsNotifications to return a substate of the Notification state
const mapStateToPropsNotifications = state => ({
  notifications: getNotifications(state),
  isAuthenticated: state.authState.isAuthenticated
});

// Convert the Notification state object in an array
function getArrayOfObject(object) {
  return Object.keys(object).map(key => object[key]);
}

const ConnectedNotifications = connect(mapStateToPropsNotifications)(Notifications);

export default ConnectedNotifications;
