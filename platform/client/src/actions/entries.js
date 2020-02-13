import { SET_INVALID_ENTRIES, SET_VALID_ENTRIES, CLEAR_ENTRIES } from "../constants/types";

const doSetInvalidEntries = payload => ({
  type: SET_INVALID_ENTRIES,
  payload
});

const doSetValidEntries = payload => ({
  type: SET_VALID_ENTRIES,
  payload
});

const doClearEntries = () => ({
  type: CLEAR_ENTRIES
});

export { doSetInvalidEntries, doSetValidEntries, doClearEntries };
