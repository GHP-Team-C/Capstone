const router = require("express").Router();
//const { models: { Staff }} = require('../db')
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const staff = Staff.findByPk(req.params.id);
    const notes = staff.getNotes();
    res.json(notes);
  } catch (err) {
    next(err);
  }
});
