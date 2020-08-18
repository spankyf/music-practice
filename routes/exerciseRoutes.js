const express = require("express");
const exerciseController = require("../controllers/exerciseController");

const router = express.Router();

router.route("/").get(exerciseController.getExercises);
//.post(exerciseController.addExercise);

// router
//   .route("/:date")
//   .get(exerciseController.getexercise)
//   .delete(exerciseController.deleteexercise)
//   .patch(exerciseController.updateexercise);

module.exports = router;
