/* Query the User Authentication Server */
import request from "superagent";
import util from "util";
import url from "url";
import DBG from "debug";
import config from "config";

const URL = url.URL;
const debug = DBG("sportspoll:user-superagent");
debug.useColors = true;

const reqURL = path => {
  const requrl = new URL(process.env.USER_MICROSERVICE_URL);
  requrl.pathname = path;
  return requrl.toString();
};

// Query the User Microservice for CRUD actions
async function create(id, name, email, password, provider, avatar, timestamp) {
  let res = await request
    .post(reqURL(config.get("routes.user.register")))
    .withCredentials()
    .send({id, name, email, password, provider, avatar, timestamp})
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "FGLDK09O-DIH9-L10K-8ZIE-9R8ML09EIHT6");
  debug(`Create -- id: ${id}, name: ${name}, email: ${email}, password: ${password},
    provider: ${provider}, avatar: ${avatar}, timestamp: ${timestamp}`);
  return res.body;
}

async function find(email) {
  let res = await request
    .get(reqURL(`${config.get("routes.user.find")}/${email}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "FGLDK09O-DIH9-L10K-8ZIE-9R8ML09EIHT6");
  debug(`Find user by Email -- ${util.inspect(res.body)}`);
  return res.body;
}

async function findById(id) {
  let res = await request
    .get(reqURL(`${config.get("routes.user.findById")}/${id}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "FGLDK09O-DIH9-L10K-8ZIE-9R8ML09EIHT6");
  debug(`Find user by Id -- ${util.inspect(res.body)}`);
  return res.body;
}

async function findOrCreate(profile) {
  let res = await request
    .post(reqURL(`${config.get("routes.user.findOrCreate")}`))
    .withCredentials()
    .send({
      id: profile.id,
      name: profile.name,
      email: profile.email,
      password: profile.password,
      provider: profile.provider,
      avatar: profile.avatar,
      timestamp: profile.timestamp
    })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("team", "DHKHJ98N-UHG9-K09J-7YHD-8Q7LK98DHGS7");
    debug(`findOrCreate:${util.inspect(res.body)}`);
  return res.body;
}

async function checkPassword(email, password) {
  let res = await request
  .post(reqURL(`${config.get("routes.user.checkPassword")}`))
  .withCredentials()
  .send({ email, password })
  .set("Content-Type", "application/json")
  .set("Accept", "application/json")
  .auth("unwhite", "FGLDK09O-DIH9-L10K-8ZIE-9R8ML09EIHT6");
  debug(`CheckPassword -- ${util.inspect(res.body)}`);
  return res.body;
}

async function destroy(email) {
  let res = await request
    .del(reqURL(`${config.get("routes.user.destroy")}/${email}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "FGLDK09O-DIH9-L10K-8ZIE-9R8ML09EIHT6");
  debug(`delete -- ${util.inspect(res.body)}`);
  return res.body;
}

export { create, find, findById, findOrCreate, checkPassword, destroy };
