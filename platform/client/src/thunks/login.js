import { doLoginSuccess, doLoginFail } from "../actions/auth";
import { doSetValidEntries, doSetInvalidEntries, doClearEntries } from "../actions/entries"
import doSetRemoveNotification from "./notifications";
import { doLoadUserWithErrorCheck } from "./register";
import loginUser from "../apis/login";

const doLoginUserWithErrorCheck = (email, password) => {
  return async function(dispatch) {
    try {
      const token = await loginUser(email, password);
      dispatch(doLoginSuccess(token.data));
      dispatch(doLoadUserWithErrorCheck());
      dispatch(doSetValidEntries("Valid Entries"));
      dispatch(doClearEntries());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(doSetRemoveNotification(error.message || error.msg, "danger")));
        dispatch(doSetInvalidEntries("Invalid Entries"));
      }
      dispatch(doLoginFail());
    }
  }
};

export default doLoginUserWithErrorCheck;
