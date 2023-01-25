//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Lesson = require("./models/Lesson");
const UserLesson = require("./models/UserLesson");

//associations could go here!
User.belongsToMany(User, { through: UserLesson });

module.exports = {
  db,
  models: {
    User,
    Lesson,
    UserLesson,
  },
};
