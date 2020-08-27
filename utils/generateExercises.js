var { PythonShell } = require("python-shell");
const path = require("path");

exports.makeExercise = function () {
  let message;
  PythonShell.run(
    path.join(__dirname, "practice_2.0.py"),
    {
      mode: "text",
      pythonPath: "C:/Users/dean/anaconda3/python.exe",
    },
    function (err, res) {
      if (err) {
        throw err;
      }

      message = JSON.parse(res);
      // return message;
    }
  );
  // console.log(obj);
  return message;
};
