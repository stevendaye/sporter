import events from "../config/events.json";
import doSetRemoveNotification from "../thunks/notifications";
import storeEvents, { getEvents, voteEvent } from "../apis/event";
import { doStoreEvents, doSetEvents, doVoteEventSuccess, doEventActionFail } from "../actions/events";

const doStoreEventsWithErrorCheck = () => {
  return async function(dispatch) {
    try {
      const res = await storeEvents(events);
      dispatch(doStoreEvents(res.data));
    } catch (err) {
      console.log({errors: [{ message: "Something got wrong when storing events" }]});
      dispatch(doEventActionFail());
    }
  }
};

const doGetEventsWithErrorCheck = () => {
  return async function(dispatch) {
    try {
      const res = await getEvents();
      dispatch(doSetEvents(res.data));
    } catch (err) {
      console.log({errors: [{ message: "Something got wrong when storing events" }]});
      dispatch(doEventActionFail());
    }
  }
};

const doVoteEventWithErrorCheck = (object_id, poll) => {
  return async function(dispatch) {
    try {
      const res = await voteEvent(object_id, poll);
      dispatch(doVoteEventSuccess(res.data));
      dispatch(doGetEventsWithErrorCheck());
      dispatch(doSetRemoveNotification(res.data.message, "success"));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(doSetRemoveNotification(error.message || error.msg, "failure")));
        dispatch(doEventActionFail());
      }
    }
  }
};

export default doStoreEventsWithErrorCheck;
export { doGetEventsWithErrorCheck, doVoteEventWithErrorCheck };
