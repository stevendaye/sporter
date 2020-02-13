import { validationResult } from "express-validator";
import gravatar from "gravatar";
import uuid from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import DBG from "debug";
import config from "config";
import util from "util";
import * as UserModel from "../models/users-queries";

const debug = DBG("platolio:users-controllers");
const flush = DBG("platolio:error-controllers");
debug.useColors = flush.useColors = true;

export default {
  // @access Public
  // @route POST /users/register
  async register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, password } = req.body;
      const id = uuid();
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      const timestamp = new Date();
      const provider = "local";

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      let user = await UserModel.find(email);
      if (user.found) {
        debug(`User exists -- ${util.inspect(user)}`);
        return res.status(400).json({ errors: [{ message: user.message }] });
      }
      user = await UserModel.create(id, name, email, encryptedPassword, provider, avatar, timestamp);

      const payload = { user: { id: user.id } };
      jwt.sign(payload, config.get("auth.jwtToken"), { expiresIn:3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      flush(err.stack);
      res.status(500).send("Server Error! Something got wrong when registering the user!");
    }
  },

  // @access Public
  // @route POST /users/login
  async login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await UserModel.checkPassword(email, password);

      if (user.checked) {
        const payload = { user: { id: user.id } };
        jwt.sign(payload, config.get("auth.jwtToken"), { expiresIn:3600 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      } else {
        return res.status(400).json({ errors: [{ message: user.message }] });
      }
    } catch (err) {
      flush(err.stack);
      res.status(500).send("Server Error! Something got wrong when login in the user!");
    }
  }
}
