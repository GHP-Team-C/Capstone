const router = require("express").Router();
const {
  models: { Slide },
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
      ],
    });
    res.json(singleSlide);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const slide = await Slide.findByPk(req.params.id);
    await slide.update(req.body);
    res.json(slide);
  } catch (err) {
    next(err);
  }
});
