const Sequelize = require("sequelize");
const db = require("../db");

const UserComment = db.define("user_comment", {
  text: {
    type: Sequelize.TEXT,
  },
})

module.exports = UserComment
