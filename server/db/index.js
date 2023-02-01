//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Lesson = require("./models/Lesson");
const UserLesson = require("./models/UserLesson");
const Note=require("./models/Note")
const Staff = require("./models/Staff")
const StaffNote = require("./models/StaffNote")
const Slide = require("./models/Slide")

//associations could go here!
User.hasMany(Lesson);
Lesson.belongsTo(User);
Note.belongsToMany(Staff, {through: StaffNote });
Staff.belongsToMany(Note, {through: StaffNote});

Slide.belongsTo(Lesson);
Lesson.hasMany(Slide);

Staff.belongsTo(Slide)


module.exports = {
  db,
  models: {
    User,
    Lesson,
    UserLesson,
    Note,
    Staff,
    StaffNote,
    Slide
  },
};
