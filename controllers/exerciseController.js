const db = require("../models");
const moment = require("moment");
const path = require("path");
const fs = require("fs");
var { PythonShell } = require("python-shell");

exports.makeData = async (req, res, next) => {
  console.log(req.app.locals.makeData);
  if (!req.app.locals.makeData) {
    res.locals.data = JSON.parse(fs.readFileSync("todaysJson.json"));
    res.locals.now = moment().format(moment.HTML5_FMT.DATETIME_LOCAL);
    next();
  } else {
    let options = {
      mode: "text",
      pythonPath: "C:/Users/Dean/anaconda3/python",
      pythonOptions: ["-u"],
      scriptPath: path.join(__dirname, "..", "utils"),
    };
    let pyshell = new PythonShell("practice_1.9.py", options);

    pyshell.on("message", function (data) {
      console.log("                   Python was called...");
      res.locals.data = JSON.parse(data);

      next();
    });

    pyshell.end(function (err, code, signal) {
      if (err) throw err;
      console.log("The exit code was: " + code);
      console.log("The exit signal was: " + signal);
      console.log("finished");
    });
  }
};

exports.getExercises = (req, res) => {
  const data = res.locals.data;
  req.app.locals.now = moment().format(moment.HTML5_FMT.DATETIME_LOCAL);
  res.status(200).render("pages/exercises", {
    message: "Success",
    data,
  });
};

exports.markCompletedExercise = (req, res, next) => {
  console.log(req.body);
  const data = JSON.parse(fs.readFileSync("todaysJson.json"));
  const completedExerciseId = (element) =>
    element.exercise_number === Number(req.body.exercise_number);

  data[req.body.instrument].find(completedExerciseId).practiced = true;
  fs.writeFile("todaysJson.json", JSON.stringify(data), "utf8", function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
  req.app.locals.data = data;
  next();
};

exports.addExercise = async (req, res) => {
  const exercise = await db.Exercise.create(req.body);
  req.app.locals.makeData = false;

  console.log("Exercise added to db");
  res.status(201).render("pages/exercises", {
    message: "Success",
    data: req.app.locals.data,
  });
};
