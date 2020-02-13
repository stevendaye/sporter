import { SET_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from "../constants/types";

const initialState = {};

const doApplySetNotifications = (state, payload) => {
  const { id } = payload;
  return { ...state, [id]: payload };
};

const doApplyRemoveNotifications = (state, payload) => {
  const { [payload]: notificationToRemove, ...restNotifications } = state;
  return restNotifications;
};

const notificationsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_NOTIFICATIONS:
      return doApplySetNotifications(state, payload);
    case REMOVE_NOTIFICATIONS:
      return doApplyRemoveNotifications(state, payload);
    default:
      return state;
  }
};

export default notificationsReducer;
