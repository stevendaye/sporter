import { EVENTS_STORE, EVENTS_GET, EVENT_VOTE, EVENTS_ERROR } from "../constants/types";

const initialState = {
  events: [],
  event: null,
  isLoading: true,
  message: ""
};

const doApplyStoreEvents = (state, payload) => ({
  ...state,
  message: payload.message
});

const doApplyGetEvents = (state, payload) => ({
  ...state,
  events: payload,
  isLoading: false
});

const doApplyVoteEvent = (state, payload) => ({
  ...state,
  event: { ...state.event, votes: payload.votes },
  isLoading: false
});

const doApplySetEventError = state => ({
  ...state,
  event: null,
  isLoading: false
});

const eventsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case EVENTS_STORE:
      return doApplyStoreEvents(state, payload);
    case EVENTS_GET:
      return doApplyGetEvents(state, payload);
    case EVENT_VOTE:
      return doApplyVoteEvent(state, payload);
    case EVENTS_ERROR:
      return doApplySetEventError(state);
    default:
      return state;
  }
};

export default eventsReducer;
