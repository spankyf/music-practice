const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/").get(userController.getHome);

router
  .route("/setup")
  .get(userController.getSetup)
  .post(userController.postPractice)
  .patch(userController.patchPractice);
// .post(
//   exerciseController.markCompletedExercise,
//   exerciseController.addExercise
// );

module.exports = router;
