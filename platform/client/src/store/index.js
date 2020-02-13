import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";

const logger = createLogger();
const middlewares = [ thunk, logger ];

const store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
