const db = require("./db");

const User = require("./models/User");
const Lesson = require("./models/Lesson");
const UserLesson = require("./models/UserLesson");
const Note = require("./models/Note");
const Staff = require("./models/Staff");
const StaffNote = require("./models/StaffNote");
const Slide = require("./models/Slide");
const Piano = require("./models/Piano");
const UserComment = require("./models/UserComment");
const Comment = require("./models/Comment");
const LessonComment = require("./models/LessonComment");

User.hasMany(Lesson);
Lesson.belongsTo(User);
Note.belongsToMany(Staff, { through: StaffNote });
Staff.belongsToMany(Note, { through: StaffNote });

Slide.belongsTo(Lesson);
Lesson.hasMany(Slide);

Staff.belongsTo(Slide);
Slide.hasOne(Staff);

Piano.belongsTo(Slide);
Slide.hasOne(Piano);

Lesson.belongsToMany(Comment, { through: LessonComment });
User.belongsToMany(Comment, { through: UserComment });

module.exports = {
  db,
  models: {
    User,
    Lesson,
    UserLesson,
    Note,
    Staff,
    StaffNote,
    Slide,
    Piano,
    Comment,
    UserComment,
    LessonComment,
  },
};
