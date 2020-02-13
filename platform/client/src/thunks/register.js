/* Create fat thunks to call the register api while cheking for errors */
import { doRegisterSuccess, doRegisterFail, doSetAuthError, doLoadUser } from "../actions/auth";
import { doSetInvalidEntries, doSetValidEntries, doClearEntries } from "../actions/entries";
import doSetRemoveNotification from "./notifications";
import registerUser, { getUser } from "../apis/register";
import setAuthTokenHeader from "../utils/setAuthTokenHeader";

// Register user in the backend and token sent back to store and local storage
const doRegisterUserWithErrorCheck = (name, email, password) => {
  return async function (dispatch) {
    try {
      const token = await registerUser(name, email, password);
      dispatch(doRegisterSuccess(token.data));
      dispatch(doLoadUserWithErrorCheck());
      dispatch(doSetValidEntries("Valid Entries"));
      dispatch(doClearEntries());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(doSetRemoveNotification(error.message || error.msg, "danger")));
        dispatch(doSetInvalidEntries("Invalid Entries"));
      }
      dispatch(doRegisterFail());
    }
  }
}

// Then loads the user info after checking if the sent token is available in the header from the local storage;
const doLoadUserWithErrorCheck = () => {
  if (localStorage.token) {
    setAuthTokenHeader(localStorage.token);
  }
  return async function(dispatch) {
    try {
      const user = await getUser();
      dispatch(doLoadUser(user.data));
    } catch (err) {
      dispatch(doSetAuthError());
    }
  }
};

export default doRegisterUserWithErrorCheck;
export { doLoadUserWithErrorCheck };
