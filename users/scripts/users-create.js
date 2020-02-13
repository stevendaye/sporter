/* Test User Authentication Server by creating a new user/voter */
"use strict";

import restify from "restify-clients";
import DBG from "debug";
import bcrypt from "bcryptjs";
import util from "util";
import config from "config";
import gravatar from "gravatar";
import uuid from "uuid";

const debug = DBG("sportspoll-users:test-create");
const flush = DBG("sportspoll-users:add-error");
debug.useColors = true;

// Create Client Object
var client = restify.createJsonClient({
  url: `http://127.0.0.1:${process.env.PORT}`,
  version: "*"
});

// Set the HTTP basic Auth to be read in req.authorization.basic
client.basicAuth("unwhite", "FGLDK09O-DIH9-L10K-8ZIE-9R8ML09EIHT6");

const avatar = gravatar.url("annah-dallas@yahoo.com", { s: 200, r: "pg", d: "mm" });
const timestamp = new Date();
const password = "annahDallas";

async function encryption() {
  try {
    const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(password, salt);
    return encrypted;
  } catch (err) {
    flush(`Password Enryption failed -- ${err.stack}`);
  }
}

(async () => {
  client.post(config.get("routes.user.register"), {
    id: uuid(), name: "Annah Dallas", email: "annah-dallas@yahoo.com",
    password: await encryption(), avatar: avatar, timestamp: timestamp
  }, (err, req, res, obj) => {
    err
      ? flush("add user -- Something got wrong when registering the user")
      : debug(`add user successfully -- ${util.inspect(obj)}`);
  });
})().catch(err => flush(err));
