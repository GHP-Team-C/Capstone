const router = require("express").Router();
const {
  models: { Staff },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    const notes = await staff.getNotes();
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const staff = await Staff.create(req.body.staff);
    req.body.notes.forEach(async (note) => await staff.addNote(note));
    res.json(staff);
  } catch (err) {
    next(err);
  }
});
