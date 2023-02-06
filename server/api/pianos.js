const router = require("express").Router();
const {
  models: { Piano },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const piano = await Piano.findByPk(req.params.id);
    res.json(piano);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const piano = await Piano.findByPk(req.params.id);
    await piano.update(req.body);
    res.json(piano);
  } catch (err) {
    next(err);
  }
});
