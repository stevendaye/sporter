import { combineReducers } from "redux";
import authReducer from "./auth";
import eventsReducer from "./events";
import entriesReducer from "./entries";
import notificationsReducer from "./notifications";

const rootReducer = combineReducers({
  authState: authReducer,
  eventsState: eventsReducer,
  entriesState: entriesReducer,
  notificationsState: notificationsReducer,
});

export default rootReducer;
