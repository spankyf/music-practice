const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/").get(userController.getHome);
// .post(
//   exerciseController.markCompletedExercise,
//   exerciseController.addExercise
// );

module.exports = router;
