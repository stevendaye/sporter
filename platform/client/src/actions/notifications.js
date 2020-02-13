import { SET_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from "../constants/types";

const doSetNotification = (id, message, alert) => ({
  type: SET_NOTIFICATIONS,
  payload: { id, message, alert }
});

const doRemoveNotification = id => ({
  type: REMOVE_NOTIFICATIONS,
  payload: id
});

export { doSetNotification, doRemoveNotification };
