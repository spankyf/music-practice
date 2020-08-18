const db = require("../models");

exports.getExercises = async (req, res) => {
  const exercises = await db.Exercise.findAll({ order: [["datetime", "ASC"]] });

  res.status(200).render("pages/exercises", {
    title: "All Exercises Report",
    data: exercises,
  });
};

exports.addExercise = async (req, res) => {
  //const reqBody = req.body;
  //req.body.duration = calculateSleepDuration(reqBody);

  const newExercise = await db.Exercise.create(req.body);
  console.log(req.body);
  res.status(201).render("pages/exercises", {
    status: "success",
    data: newExercise,
  });
};
