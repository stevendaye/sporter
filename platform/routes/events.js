import express from "express";
import config from "config";
import * as utils from "../middlewares/utilities";
import event from "../controllers/events";

const router = express.Router();

const eventsRoutes = app => {
  router.post(`${config.get("routes.event.store")}`, event.store);
  router.get(config.get("routes.event.fetchAll"), event.fetchAll);
  router.put(`${config.get("routes.event.vote")}/:object_id/:poll`, [utils.checkAuthentication], event.vote);

  app.use(router);
};

export default eventsRoutes;
