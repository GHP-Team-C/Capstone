const Sequelize = require("sequelize");
const db = require("../db");

const UserLesson = db.define("user_lesson", {});

module.exports = UserLesson;
