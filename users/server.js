import restify from "restify";
import DBG from "debug";
import util from "util";
import usersRoutes from "./routes/";

const debug = DBG("sportspoll-users:server-service");
const flush = DBG("sportspoll-users:server-error");
debug.useColors = true;

// Hardcoded API Key authentication to grant access to the user server
const apiKeys = [{
  user: "unwhite",
  key: "FGLDK09O-DIH9-L10K-8ZIE-9R8ML09EIHT6"
}];

// Check for key in the request header
const check = (req, res, next) => {
  if (req.authorization && req.authorization.basic) {
    let BASIC_FOUND = false;
    for (let auth of apiKeys) {
      if (auth.key === req.authorization.basic.password
        && auth.user === req.authorization.basic.username) {
        BASIC_FOUND = true;
        break;
      }
    }
    if (BASIC_FOUND) {
      next();
      debug("Access Granted!");
    } else {
      res.send(401, new Error("Server Authentication Failed"));
      flush(`BASIC_FOUND = ${BASIC_FOUND} -- Access Denied`);
      next(false);
    }
  } else {
    res.send(500, new Error("No Authorization Key Found!"));
    flush(`Cannot find authorization key - ${util.inspect(req.authorization.basic)}`);
    next(false);
  }
};

// Create Restify Sever
const server = restify.createServer({
  name: "User-Auth-Service",
  version: "1.0.0"
});

// Configure handler functions to read HTTP basic headers & accept requests
server.use(restify.plugins.authorizationParser());
server.use(check);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
  mapParams: true
}));

process.on("uncaughtException", (err, req, res, next) => {
  flush(`Uncaught Exception -- I crashed ${err.stack}`);
});
process.on("unhandledRejection", (reason, p) => {
  flush(`Unhandled Promise Rejection at ${util.inspect(p)} -- Reason: ${reason}`);
});

usersRoutes(server);

export default check;
