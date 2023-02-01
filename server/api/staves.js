const router = require("express").Router();
const {
  models: { Staff },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    const notes = await staff.getNotes({order: ['domId']});
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


router.put("/:id", async (req, res, next) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    const note = await staff.getNotes({where:{id: req.body.id}})
    await note[0].update(req.body)
    res.json(note);
  } catch (err) {
    next(err);
  }
});



