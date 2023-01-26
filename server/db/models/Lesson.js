const Sequelize = require("sequelize");
const db = require("../db");

const Lesson = db.define("lesson", {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  level: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Lesson;
