const Sequelize = require("sequelize");
const db = require("../db");

const Lesson = db.define("lesson", {
  name: {
    type: Sequelize.STRING,
  },
  level: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [["beginner", "intermediate", "advanced"]],
    },
  },
  visibleTo: {
    type: Sequelize.ENUM("Public", "Private", "Organization"),
    defaultValue: "Public",
  },
  published: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Lesson.changePublishStatus = async (lesson) => {
  await Lesson.create({ id: lesson.id });
  lesson.published = !lesson.published;
  await lesson.save();
};

module.exports = Lesson;
