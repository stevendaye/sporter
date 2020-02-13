/* Test the Authentication User Server by deleting a user/voter */
"use strict";

import restify from "restify-clients";
import util from "util";
import DBG from "debug";

const debug = DBG("sportspoll-users:test-delete");
const flush = DBG("sportspoll-users:delete-error");
debug.useColors = true;

var client = restify.createJsonClient({
  url: `http://127.0.0.1:${process.env.PORT}`,
  version: "*"
});

client.basicAuth("unwhite", "FGLDK09O-DIH9-L10K-8ZIE-9R8ML09EIHT6");

client.del(`/users/destroy/${process.argv[2]}`, (err, req, res, obj) => {
  err
    ? flush(`delete user -- Something got worng while deleting user of email ${process.argv[2]} \n ${err.stack}`)
    : debug(`delete user successfully: ${util.inspect(obj)}`);
});
