var { PythonShell } = require("python-shell");
const path = require("path");

module.exports = function (req) {
  let options = {
    mode: "text",
    // pythonOptions: ["-u"],
    pythonPath: "python",
    args: JSON.stringify(req.app.locals.setupParams),
    scriptPath: path.join(__dirname),
  };

  let result;
  PythonShell.run(
    "py_spawn_test.py",
    options,

    function (err, res) {
      if (err) {
        console.log(err);
        throw err;
      }
      let message;
      message = JSON.parse(res);
      //   console.log(JSON.parse(res));
      //   console.log(res);
      //   console.log(message);
      //   console.log("This is the python message");
      result = message;
    }
  );
  return result;
  //   next();
};
