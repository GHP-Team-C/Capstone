const Sequelize = require("sequelize");
const db = require("../db");

const UserLesson = db.define("userLesson", {
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = UserLesson;
