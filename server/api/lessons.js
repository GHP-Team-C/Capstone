const router = require("express").Router();
const {
  models: { Lesson },
} = require("../db");
const Slide = require("../db/models/Slide");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allLessons = await Lesson.findAll();
    res.json(allLessons);
  } catch (err) {
    next(err);
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
      ],
      order: [[{ model: Slide }, "id"]],
    });
    res.json(singleLesson);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/publish", async (req, res, next) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);

  await lesson.update({published: !lesson.published})
  res.json(lesson);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next)=> {
  try {
    const lesson = await Lesson.findByPk(req.params.id)
    await lesson.destroy();
    res.send(lesson);
  }catch (err) {
    next (err)
  }
})
