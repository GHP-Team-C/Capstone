const router = require("express").Router();
const {
  models: { Lesson, LessonComment, Comment },
} = require("../db");
const Slide = require("../db/models/Slide");
const User = require("../db/models/User");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allLessons = await Lesson.findAll({ order: [["name", "ASC"]] });
    res.json(allLessons);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const lesson = await Lesson.create(req.body);
    const slide = await lesson.createSlide();
    const staff = await slide.createStaff();
    await slide.createPiano();
    await staff.createNote({
      noteName: "b",
      octave: "4",
      duration: "qr",
      domId: "1",
    });
    await staff.createNote({
      noteName: "b",
      octave: "4",
      duration: "qr",
      domId: "2",
    });
    await staff.createNote({
      noteName: "b",
      octave: "4",
      duration: "qr",
      domId: "3",
    });
    await staff.createNote({
      noteName: "b",
      octave: "4",
      duration: "qr",
      domId: "4",
    });
    res.json(lesson);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singleLesson = await Lesson.findByPk(req.params.id, {
      include: [
        {
          model: Slide,
          where: {
            lessonId: req.params.id,
          },
        },
        {
          model: Comment,
          through: {
            model: LessonComment,
            where: {
              lessonId: req.params.id,
            },
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [[{ model: Slide }, "id"]],
    });
    res.json(singleLesson);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    const slide = await lesson.createSlide();
    const staff = await slide.createStaff();
    await slide.createPiano();
    await staff.createNote({
      noteName: "b",
      octave: "4",
      duration: "qr",
      domId: "1",
    });
    await staff.createNote({
      noteName: "b",
      octave: "4",
      duration: "qr",
      domId: "2",
    });
    await staff.createNote({
      noteName: "b",
      octave: "4",
      duration: "qr",
      domId: "3",
    });
    await staff.createNote({
      noteName: "b",
      octave: "4",
      duration: "qr",
      domId: "4",
    });
    res.json(lesson);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/publish", async (req, res, next) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id, {
      include: [
        {
          model: Slide,
          where: {
            lessonId: req.params.id,
          },
        },
      ],
      order: [[{ model: Slide }, "id"]],
    });

    await lesson.update({ published: !lesson.published });
    res.json(lesson);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/name", async (req, res, next) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id, {
      include: [
        {
          model: Slide,
          where: {
            lessonId: req.params.id,
          },
        },
      ],
      order: [[{ model: Slide }, "id"]],
    });
    await lesson.update(req.body);
    res.json(lesson);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newLesson = await Lesson.create(req.body);
    res.json(newLesson);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    await lesson.destroy();
    res.send(lesson);
  } catch (err) {
    next(err);
  }
});
