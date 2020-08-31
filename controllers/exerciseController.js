const db = require("../models");
const moment = require("moment");
var { PythonShell } = require("python-shell");

exports.makeData = async (req, res, next) => {
  let options = {
    mode: "text",
    pythonPath: "C:/Users/Dean/anaconda3/python",
    pythonOptions: ["-u"],
    scriptPath: "C:/Users/Dean/Desktop/coding/music-practice/utils",
  };
  let pyshell = new PythonShell("practice_1.9.py", options);

  pyshell.on("message", function (data) {
    // received a message sent from the Python script (a simple "print" statement)
    // console.log(data);
    res.locals.messages = { data };
    res.locals.now = moment().format(moment.HTML5_FMT.DATETIME_LOCAL);
    next();
  });

  // end the input stream and allow the process to exit
  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log("The exit code was: " + code);
    console.log("The exit signal was: " + signal);
    console.log("finished");
  });
};

exports.getExercises = (req, res) => {
  const data = JSON.parse(res.locals.messages.data);
  // console.log(Object.getOwnPropertyNames(data));
  // console.log(typeof data);
  res.status(200).render("pages/exercises", {
    message: "Success",
    data,
  });
};

exports.addExercise = async (req, res) => {
  const exercise = await db.Exercise.create(req.body);
  console.log("Exercise added to db");
  res.status(201).redirect("back");
};
