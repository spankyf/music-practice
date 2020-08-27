const db = require("../models");
const moment = require("moment");
const generateExercises = require("../utils/generateExercises");

exports.getExercises = async (req, res) => {
  let locals = {};
  locals.hello = "hello";
  locals.now = moment().format(moment.HTML5_FMT.DATETIME_LOCAL);

  const obj = await generateExercises.makeExercise();
  console.log(obj);
  // .then((obj) =>
  res.status(200).render("pages/exercises", {
    message: "Success",
    data: obj,
    localObj: locals,
  });
  // );
};

exports.addExercise = async (req, res) => {
  let options = {
    mode: "text",
    pythonPath: "C:/Users/dean/anaconda3/python.exe",
  };

  PythonShell.run(
    "C:/Users/dean/Desktop/coding/music-practice/practice_2.0.py",
    options,
    function (err, results) {
      if (err) {
        res.status(500).send({
          error: err,
        });
        console.log(err);
        return;
      }
      let obj = JSON.parse(results);

      let locals = {};
      locals.hello = "hello";
      locals.now = moment().format(moment.HTML5_FMT.DATETIME_LOCAL);

      res.status(200).render("pages/exercises", {
        message: "Success",
        data: obj,
        localObj: locals,
      });
    }
  );
  const exercise = await db.Exercise.create(req.body);
  console.log("Exercise added to db");
  res.status(200).render("pages/exercises", {
    message: "Success",
    data: obj,
    localObj: locals,
  });
};
