const router = require("express").Router();
const {
  models: { Slide, Piano },
} = require("../db");
const Staff = require("../db/models/Staff");
const Note = require("../db/models/Note");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const singleSlide = await Slide.findByPk(req.params.id, {
      include: [
        {
          model: Staff,
          where: {
            slideId: req.params.id,
          },
        },
        {
          model: Piano,
          where: {
            slideId: req.params.id,
          },
        },
      ],
    });
    res.json(singleSlide);
  } catch (err) {
    next(err);
  }
});
