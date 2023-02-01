const Sequelize = require("sequelize");
const db = require("../db");

const Slide = db.define("slide", {
  text: {
    type: Sequelize.TEXT
  }
});



module.exports = Slide;
