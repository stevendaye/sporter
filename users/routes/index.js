import config from "config";
import DBG from "debug";
import user from "../controllers";

const debug = DBG('sportspoll-users:server-routes');
debug.useColors = true;

const usersRoutes = server => {
  server.post(config.get("routes.user.register"), user.register);
  server.get(config.get("routes.user.find"), user.find);
  server.post(config.get("routes.user.checkPassword"), user.checkPassword);
  server.get(config.get("routes.user.findById"), user.findById);
  server.get(config.get("routes.user.findOrCreate"), user.findOrCreate);
  server.del(config.get("routes.user.destroy"), user.destroy);

  server.listen(process.env.PORT || config.get("port"), "localhost", () => {
    debug(`User Authentication Server ${server.name} running at ${server.url}`);
  });
};

export default usersRoutes;
