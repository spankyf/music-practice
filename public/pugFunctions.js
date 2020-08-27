const db = require("../models");

const hello = function hello(val) {
  console.log(val);
};

const addExercise = async (req, res) => {
  const newSleep = await db.Exercise.create(req.body);
  console.log(req.body);
  res.status(201).send({
    status: "success",
    data: newSleep,
  });
};
