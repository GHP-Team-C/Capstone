//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Lesson = require("./models/Lesson");
const UserLesson = require("./models/UserLesson");
const Note=require("./models/Note")
const Staff = require("./models/Staff")
const StaffNote = require("./models/StaffNote")

//associations could go here!
User.belongsToMany(Lesson, { through: UserLesson });
Lesson.belongsToMany(User, { through: UserLesson });
Note.belongsToMany(Staff, {through: StaffNote });
Staff.belongsToMany(Note, {through: StaffNote})

module.exports = {
  db,
  models: {
    User,
    Lesson,
    UserLesson,
    Note,
    Staff,
    StaffNote
  },
};
