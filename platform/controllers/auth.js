import DBG from "debug";
import * as UsersModel from "../models/users-queries";

const debug = DBG("sportspoll:controller-index");
const flush = DBG("sportspoll:error-index");
debug.useColors = flush.useColors = true;

export default {
  // @access Private
  // @route GET /auth
  async index(req, res, next) {
    try {
      const user = await UsersModel.findById(req.user.id);
      res.json(user.sanitize);
      debug(`find user: ${user}`);
    } catch (err) {
      flush(`An error occurred when getting the credentials of user ${req.user.id}`);
      res.status(500).send("Server Error");
    }
  }
}
