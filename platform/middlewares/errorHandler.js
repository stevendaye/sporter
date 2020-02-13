/* Handle Errors and 404 Requests */
import util from "util";
import DBG from "debug";

const flush = DBG("sportspoll:error-handler");
flush.useColors = true;

const notFound = (req, res, next) => {
  res.status(404).json({
    title: "404! NOT FOUND",
    message: "You May Have Taken A Wrong Turn!"
  });
};

const err = (err, req, res) => {
  util.log(err.message);
  flush(`${err.status || 500} -- ${error.message}`);
  res.status(err.status || 500).json({ message: err.message, err: {} });
};

export { notFound, err };