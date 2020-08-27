var { PythonShell } = require("python-shell");
const path = require("path");

exports.makeExercise = async () => {
  let options = {
    mode: "text",
    pythonPath: "C:/Users/dean/anaconda3/python.exe",
  };

  let message;
  await PythonShell.run(
    path.join(__dirname, "practice_2.0.py"),
    options,
    function (err, res) {
      if (err) {
        throw err;
      }
      message = JSON.parse(res);
      console.log("2", { message });
      return message;
    }
  );
};
