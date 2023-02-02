const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const Lesson = require("../db/models/Lesson");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
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
    });
    console.log("singleUser from api: ", singleUser)
    res.json(singleUser);
  } catch (err) {
    next(err);
  }
});
