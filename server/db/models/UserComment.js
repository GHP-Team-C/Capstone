const Sequelize = require("sequelize");
const db = require("../db");

const UserComment = db.define("user_comment", {})

module.exports = UserComment
