const Sequelize = require("sequelize");
const db = require("../db");

const Piano = db.define("piano", {
  keys: {
    type: Sequelize.TEXT,
    defaultValue: "",
  },
});

module.exports = Piano;
