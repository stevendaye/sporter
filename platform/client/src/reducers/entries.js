import { SET_INVALID_ENTRIES, SET_VALID_ENTRIES, CLEAR_ENTRIES } from "../constants/types";

const initialState = {
  isAuthenticating: false,
  message: null,
  isLoading: false
};

const doApplySetInvalidEntries = (state, payload) => ({
  ...state,
  isAuthenticating: true,
  message: payload
});

const doApplySetValidEntries = (state, payload) => ({
  ...state,
  isAuthenticating: true,
  isLoading: true,
  message: payload
});

const doApplyClearEntries = state => ({
  ...state,
  isAuthenticating: false,
  isLoading: false,
  message: null
});

const entriesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_INVALID_ENTRIES:
      return doApplySetInvalidEntries(state, payload);
    case SET_VALID_ENTRIES:
      return doApplySetValidEntries(state, payload);
    case CLEAR_ENTRIES:
      return doApplyClearEntries(state);
    default:
      return state;
  }
};

export default entriesReducer;
