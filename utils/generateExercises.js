var { PythonShell } = require("python-shell");
const path = require("path");

module.exports = function () {
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
      let message;
      message = JSON.parse(res);
      console.log(message);
      return message;
    }
  );
};
