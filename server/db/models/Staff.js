const Sequelize = require("sequelize");
const db = require("../db");

const Staff = db.define("staff", {
  timeSig: {
    type: Sequelize.STRING
  },
  clef: {
    type: Sequelize.STRING
  }
})

module.exports = Staff
