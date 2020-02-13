import util from "util";
import DBG from "debug";
import config from "config";
import * as UserModel from "../models/users-sequelize";

const debug = DBG("sportspoll-users:server-controllers");
const flush = DBG("sportspoll-users:controllers-error");
debug.useColors = true;

export default {
  // @access Public
  // @route POST /users/register
  async register(req, res, next) {
    try {
      let user = await UserModel.create(
        req.params.id, req.params.name, req.params.email, req.params.password,
        req.params.provider, req.params.avatar, req.params.timestamp
      );
      debug(`register user -- ${util.inspect(user)}`);
      res.send(user);
      next(false);
    } catch (err) {
      res.send(500, err);
      flush(`${config.get("routes.user.register")}: ${err.stack}`);
      next(false);
    }
  },

  // @access Public
  // @route GET /users/find/:email
  async find(req, res, next) {
    try {
      const user = await UserModel.find(req.params.email);
      if (user.found) {
        debug(`find user -- ${util.inspect(user)}`);
        res.contentType = "json";
        res.send(user);
        next(false);
      } else {
        debug(`found no user of email ${req.params.email}`);
        res.contentType = "json";
        res.send(user);
        next(false);
      }
    } catch (err) {
      res.send(500, err);
      flush(`${config.get("routes.user.find")}: ${err.stack}`);
      next(false);
    }
  },

  // @access Private
  // @route GET /users/find/:id
  async findById(req, res, next) {
    try {
      const user = await UserModel.findById(req.params.id);
      if (user.found) {
        debug(`find user -- ${util.inspect(user)}`);
        res.contentType = "json";
        res.send(user);
        next(false);
      } else {
        debug(`find no user of id ${req.params.id}`);
        res.send(404, new Error(`Cannot find user of id ${req.params.id}`))
        next(false);
      }
    } catch (err) {
      res.send(500, err);
      flush(`${config.get("routes.user.findById")}: ${err.stack}`);
      next(false);
    }
  },

  // @access Public
  // @route POST /users/check/password
  async checkPassword(req, res, next) {
    try {
      const checked = await UserModel.checkPassword(req.params.email, req.params.password);
      debug(`checkPassword -- ${util.inspect(checked)}`);
      res.contentType = "json";
      res.send(checked);
      next(false);
    } catch (err) {
      res.send(500, err);
      flush(`${config.get("routes.user.checkPassword")}: ${err.stack}`);
      next(false);
    }
  },

  // @access Public
  // @route GET /users/find/create
  async findOrCreate(req, res, next) {
    debug(`findOrCreate -- ${util.inspect(req.params)}`);
    try {
      const user = await UserModel.findOrCreate({
        id: req.params.id,
        name: req.params.name,
        email: req.params.email,
        password: req.params.password,
        provider: req.params.provider,
        avatar: req.params.avatar,
        timestamp: req.params.timestamp
      });
      debug(`findOrCreate -- ${util.inspect(req.params)}`);
      res.send(user);
      next(false);
    } catch (err) {
      res.send(500, err);
      flush(`${config.get("routes.user.findOrCreate")}: ${err.stack}`);
      next(false);
    }
  },
  // @access Private
  // @route DELETE /users/destroy/:email
  async destroy(req, res, next) {
    try {
      await UserModel.destroy(req.params.email);
      debug(`destroy user of id ${req.params.email}`);
      res.send({});
      next(false);
    } catch (err) {
      res.send(500, err);
      flush(`${config.get("routes.user.destroy")}: ${err.stack}`);
      next(false);
    }
  }
}
