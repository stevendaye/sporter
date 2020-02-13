import axios from "axios";

const STORE_EVENTS_URL = "/events/store";
const GET_EVENTS_URL = "/events/fetch/list";
const VOTE_EVENT_URL = "/events/vote";

const storeEvents = async events => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ data: events });

  return await axios.post(STORE_EVENTS_URL, body, config);
};

const getEvents = async () => {
  return await axios.get(GET_EVENTS_URL);
};

const voteEvent = async (object_id, poll) => {
  return await axios.put(`${VOTE_EVENT_URL}/${object_id}/${poll}`);
};

export default storeEvents;
export { getEvents, voteEvent };
