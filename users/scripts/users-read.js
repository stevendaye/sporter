/* Test the Authentication User Server by reading a user/voter */
"use strict";

import restify from "restify-clients";
import util from "util";
import DBG from "debug";

const debug = DBG("sportspoll-users:test-read");
const flush = DBG("sportspoll-users:read-error");
debug.useColors = true;

var client = restify.createJsonClient({
  url: `http://127.0.0.1:${process.env.PORT}`,
  version: "*"
});

client.basicAuth("unwhite", "FGLDK09O-DIH9-L10K-8ZIE-9R8ML09EIHT6");

client.get(`/users/find/${process.argv[2]}`, (err, req, res, obj) => {
  err
  ? flush(`find -- Someting got wrong while reading user of email ${process.argv[2]} \n ${err.stack}`)
  : debug(`find user successfully: ${util.inspect(obj)}`);
});
