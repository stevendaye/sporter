import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_TOKEN_ERROR,
  LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT
} from "../constants/types";

// Register Action Creators
const doRegisterSuccess = payload => ({
  type: REGISTER_SUCCESS,
  payload
});

const doRegisterFail = () => ({
  type: REGISTER_FAIL
});

// Login User Action Creators
const doLoginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload
});

const doLoginFail = () => ({
  type: LOGIN_FAIL
});


// Load User Info Action Creators
const doLoadUser = payload => ({
  type: USER_LOADED,
  payload
});

const doSetAuthError = () => ({
  type: AUTH_TOKEN_ERROR
});

// Logout user
const doLogout = () => ({
  type: LOGOUT
});

export { doRegisterSuccess, doRegisterFail, doLoadUser, doSetAuthError,
  doLoginSuccess, doLoginFail, doLogout
};
