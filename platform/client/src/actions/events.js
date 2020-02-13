import { EVENTS_STORE, EVENTS_GET, EVENT_VOTE, EVENTS_ERROR } from "../constants/types";

const doStoreEvents = payload => ({
  type: EVENTS_STORE,
  payload
});

const doSetEvents = payload => ({
  type: EVENTS_GET,
  payload
});

const doVoteEventSuccess = payload => ({
  type: EVENT_VOTE,
  payload
});

const doEventActionFail = () => ({
  type: EVENTS_ERROR
});

export { doStoreEvents, doSetEvents, doVoteEventSuccess, doEventActionFail };
