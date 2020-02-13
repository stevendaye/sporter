import util from "util";
import DBG from "debug";
import * as eventModel from "../models/events-sequelize";

const debug = DBG("sportspoll:events-controllers");
const flush = DBG("sportspoll:events-error");
debug.useColors = flush.useColors = true;

export default {
  // @access Public
  // @route /events/store
  // @desc Store events in the local database at server startup
  async store(req, res, next) {
    try {
      const data = req.body.data;
      data.map(async doc => {
        // @desc First check if the event alredy exists in the database
        let sport_event = await eventModel.find(doc.objectId);
        if (!sport_event.found) {
          // @desc If there is no event of such objectIds, then store it once the server boots
          return await eventModel.store(doc.id, doc.objectId, doc.sport, doc.name,
            doc.awayName, doc.homeName, doc.country, doc.group, doc.state,
            doc.createdAt, []
          );
        }
      });
      res.json({ message: "Events currently available in the database" });
      debug(`store events -- ${util.inspect(data)}`);
    } catch (err) {
      flush(err.stack);
      res.status(500).send("Server Error! Something got wrong when storing events in database");
    }
  },

  // @access Public
  // @route /events/fetch/list
  // @desc Read and fetch all events
  async fetchAll(req, res, next) {
    try {
      let eventList = await eventModel.fetchAll();
      if (!eventList) {
        eventList = [];
      }
      debug(`read and fetch events -- ${util.inspect(eventList)}`);
      res.json(eventList);
    } catch (err) {
      flush(err.stack);
      res.status(500).send("Server Error! Something got wrong when reading events");
    }
  },

  // @access Private
  // @route /events/vote/:object_id/:poll
  // @desc Vote an event
  async vote(req, res, next) {
    try {
      let event = await eventModel.find(req.params.object_id);
      if (event.found) {
        event = event.sport_event;
        const votes = JSON.parse(event.votes);
        if (votes.filter(vote => vote.userid === req.user.id).length > 0) {
          return res.status(400).json({ errors: [{ message: "YOU CAN OLNY VOTE ONCE!" }] });
        }
        event = await eventModel.vote(req.user.id, req.params.object_id, req.params.poll);
        debug(`vote event of id ${req.params.object_id} -- ${util.inspect(event)}`);
        res.status(200).json({
          votes: JSON.parse(event.votes),
          message: "YOUR VOTE WAS SENT SUCCESSFULLY. GOOD LUCK!"
        });
      } else {
        res.status(404).json({ message: event.message });
      }
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: `No event found. It may have been deleted!` });
      }
      flush(err.stack);
      res.status(500).send("Server Error! Something got wrong when voting this event");
    }
  }
}
