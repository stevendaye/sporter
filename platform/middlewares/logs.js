/* Set up Logging Requests to log to a file if requested ## */
import path from "path";
import DBG from "debug";
import fs from "fs-extra";
import rfs from "rotating-file-stream";

const flush = DBG("sportspoll:logger");
flush.useColors = true;

let logStream;
if (process.env.REQUEST_LOG_FILE) {
  (async () => {
    let logDirectory = path.dirname(process.env.REQUEST_LOG_FILE);
    await fs.ensureDir(logDirectory);
    logStream = rfs(process.env.REQUEST_LOG_FILE, {
      size: "10M",
      interval: "1d",
      compress: "gzip"
    });
  })().catch(err => flush(err));
}

export { logStream };