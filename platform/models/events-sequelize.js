import Sequelize from "sequelize";
import fs from "fs-extra";
import jsyaml from "js-yaml";

let sqlize;
let SQEvent;
let Op = Sequelize.Op;

async function connectDB() {
  if (typeof sqlize === "undefined") {
    const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
    const params = await jsyaml.safeLoad(YAML, "utf8");

    sqlize = new Sequelize(params.dbname, params.username, params.password, params.params);
  }

  if (SQEvent) {
    return SQEvent.sync();
  }

  SQEvent = sqlize.define("Events", {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true
    },
    objectId: {
      type: Sequelize.STRING,
      unique: true
    },
    sport: Sequelize.STRING,
    name: Sequelize.STRING,
    awayName: Sequelize.STRING,
    homeName: Sequelize.STRING,
    country: Sequelize.STRING,
    group: Sequelize.STRING,
    state: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    votes: Sequelize.STRING
  });

  return SQEvent.sync();
}

async function store(id, objectId, sport, name, awayName, homeName, country,
  group, state, createdAt, votes) {
  const SQEvent = await connectDB();
  const event = await SQEvent.create({id, objectId, sport, name, awayName,
    homeName, country, group, state, createdAt, votes: JSON.stringify(votes)});
  return event;
}

async function fetchAll() {
  const SQEvent = await connectDB();
  const events = await SQEvent.findAll({});
  return events;
}

async function vote(userid, objectId, poll) {
  const SQEvent = await connectDB();
  const sport_event = await SQEvent.findOne({ where: { objectId: { [Op.eq]: objectId } } });
  if (!sport_event) {
    throw new Error(`No event of objectId ${objectId} found!`);
  }
  const votes = JSON.parse(sport_event.votes);
  let newVotes = [
    {
      userid,
      poll
    }
  ];
  newVotes = [ ...votes, ...newVotes ];
  await sport_event.update({ votes: JSON.stringify(newVotes) });
  return sport_event;
}

async function find(objectId) {
  const SQEvent = await connectDB();
  const sport_event = await SQEvent.findOne({ where: { objectId: { [Op.eq]: objectId } } });
  if (!sport_event) {
    return {
      found: false,
      message: `No event of objectId of ${objectId} found`
    }
  } else {
    return {
      found: true,
      sport_event,
      message: "Event exists"
    };
  }
}

export { store, fetchAll, vote, find };
