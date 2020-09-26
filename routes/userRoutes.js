const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/").get(userController.checkSetup, userController.getHome);

router
  .route("/setup")
  .get(userController.getSetup)
  .post(userController.postPractice);

router.route("/setup/:date").patch(userController.patchPractice);

module.exports = router;
