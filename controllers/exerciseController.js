const db = require("../models");
var { PythonShell } = require("python-shell");

exports.getExercises = async (req, res) => {
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

      var locals = {
        logMe: function (val) {
          console.log(val.toUpperCase());
        },
      };

      console.log(obj);
      console.log(locals);
      res.status(200).render("pages/exercises", {
        message: "Success",
        data: obj,
        locals,
      });
    }
  );
};
