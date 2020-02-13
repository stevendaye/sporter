import http from "http";
import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import DBG from "debug";
import util from "util";
import path from "path";
import config from "config";
import { notFound, err } from "./middlewares/errorHandler";
import * as logs from "./middlewares/logs";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import eventsRoutes from "./routes/events";

const app = express();
const server = http.createServer(app);
const port = normalizePort(process.env.PORT || config.get("port"));

const debug = DBG("sportspoll:platform-app");
const flush = DBG("sportspoll:error-app");
debug.useColors = flush.useColors = true;

app.set("port", port);

app.use(logger(process.env.REQUEST_LOG_FILE || "dev", {
  stream: logs.logStream ? logs.logStream : process.stdout
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enabling CORS Access from the server to be used by the user microservice server
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", config.get("host.platform"));
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

process.on("uncaughtException", err => {
  flush(`I crashed! - ${(err.stack || err)}`);
});
process.on("unhandledRejection", (reason, p) => {
  flush(`Unhandled Promise Rejection at: ${util.inspect(p)} -- Reason: ${reason}`);
});

authRoutes(app);
usersRoutes(app);
eventsRoutes(app);

// Prepare server static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(notFound);
app.use(err);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port
  }
  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  // Handling specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      flush(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      flush(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "Pipe " + addr : addr.port;
  debug(`Server listening at http://localhost:${bind}`);
}
