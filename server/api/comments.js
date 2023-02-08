
const router = require("express").Router();
const {
  models: { Comment, Lesson, User },
} = require("../db");
module.exports = router;



//userId would be sent and lessonId would be put into the body, send as an object
router.post("/:id", async (req, res, next) => {
  try {
    const user = await UserComment.create({userId: req.params.id, lessonId: req.body.id, text: req.body.text});
    res.json(user);
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



