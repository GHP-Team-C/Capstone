const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const Lesson = require("../db/models/Lesson");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id, {
      include: [
        {
          model: Lesson,
          where: {
            userId: req.params.id,
          },
          required: false,
        },
      ],
      order: [[{ model: Lesson }, "id"]],
    });
    res.json(singleUser);
  } catch (err) {
    next(err);
  }
});
