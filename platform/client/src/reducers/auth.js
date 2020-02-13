import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_TOKEN_ERROR,
  LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT
} from "../constants/types";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true
}

const doApplyAuthenticateSuccess = (state, payload) => {
  localStorage.setItem("token", payload.token);
  return {
    ...state,
    ...payload,
    isAuthenticated: true,
    isLoading: false
  }
};

const doApplyLoadUser = (state, payload) => ({
  ...state,
  isAuthenticated: true,
  user: payload,
  isLoading: false
});

const doApplyAuthenticateFail = state => {
  localStorage.removeItem("token");
  return {
    ...state,
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false
  }
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return doApplyAuthenticateSuccess(state, payload);
    case USER_LOADED:
      return doApplyLoadUser(state, payload);
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_TOKEN_ERROR:
      return doApplyAuthenticateFail(state);
    default:
      return state;
  }
}

export default authReducer;
