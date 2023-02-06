const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/staves", require("./staves"));
router.use("/lessons", require("./lessons"));
router.use("/slides", require("./slides"));
router.use("/pianos", require("./pianos"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
