import Sequelize from "sequelize";
import bcrypt from "bcryptjs";
import fs from "fs-extra";
import jsyaml from "js-yaml";

let sqlize;
let SQUser;
let Op = Sequelize.Op;

async function connectDB() {
  if (typeof sqlize === "undefined") {
    const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
    const params = await jsyaml.safeLoad(YAML, "utf8");

    sqlize = new Sequelize(params.dbname, params.username, params.password, params.params);
  }

  if (SQUser) {
    return SQUser.sync();
  }

  SQUser = sqlize.define("Users", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: Sequelize.STRING,
    provider: Sequelize.STRING,
    avatar: Sequelize.STRING,
    timestamp: Sequelize.DATE
  });

  return SQUser.sync();
}

async function create(id, name, email, password, provider, avatar, timestamp) {
  const SQUser = await connectDB();
  const user = await SQUser.create({id, name, email, password, provider, avatar, timestamp });
  return user;
}

async function find(email) {
  const SQUser = await connectDB();
  const user = await SQUser.findOne({ where: { email: { [Op.eq]: email } } });
  if (!user) {
    return {
      found: false,
      email: email
    };
  } else {
    return {
      found: true,
      email: email,
      message: `User Already Exist!`,
      sanitize: sanitizer(user)
    };
  }
}

async function findById(id) {
  const SQUser = await connectDB();
  const user = await SQUser.findOne({ where: { id: { [Op.eq]: id } } });
  if (!user) {
    return {
      found: false,
      id: id
    };
  } else {
    return {
      found: true,
      id: id,
      sanitize: sanitizer(user)
    };
  }
}

async function findOrCreate(profile) {
  const SQUser = await connectDB();
  const user = await SQUser.findOne({ where: { id: { [Op.eq]: profile.id } } });
  if (user) {
    return sanitizer(user);
  }
  return await create(profile.id, profile.name, profile.email, profile.password,
    profile.provider, profile.avatar, profile.timestamp
  );
}

async function checkPassword(email, password) {
  const SQUser = await connectDB();
  const user = await SQUser.findOne({ where: { email: {[Op.eq]: email } } });
  if (!user) {
    return {
      checked: false,
      email: email,
      message: "Invalid Credentials"
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (user.email === email && isMatch) {
    return {
      checked: true,
      email: email,
      id: user.id
    };
  } else {
    return {
      checked: false,
      email: email,
      message: "Invaid Credentials"
    };
  }
}

async function destroy(email) {
  const SQUser = await connectDB();
  console.log(SQUser);
  const user = await SQUser.findOne({ where: { email: { [Op.eq]: email } } });
  if (!user) {
    throw new Error(`No user of email ${email} found here!`);
  }
  await user.destroy();
}

function sanitizer(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    avatar: user.avatar,
    timestamp: user.timestamp
  };
}

export { create, find, findById, checkPassword, findOrCreate, destroy}
