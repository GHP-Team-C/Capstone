const Sequelize = require("sequelize");
const db = require("../db");

const Note = db.define(
  "note",
  {
    noteName: {
      type: Sequelize.STRING,
    },
    octave: {
      type: Sequelize.STRING,
    },
    duration: {
      type: Sequelize.STRING,
    },
    domId: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);

module.exports = Note;
