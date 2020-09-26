var { PythonShell } = require("python-shell");
const path = require("path");

exports.getHome = (req, res) => {
  res.status(200).render("pages/home", {
    message: "Success",
  });
};

exports.checkSetup = (req, res, next) => {
  if (typeof req.app.locals.todayMade === "undefined") {
    console.log("You need to enter your params to start the practice today!");
  } else {
    console.log("Youre ready to go. Lets send the info to python");
    // Send it to python and get back a load of exercises

    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      args: JSON.stringify(req.app.locals.setupParams),
      scriptPath: path.join(__dirname, "..", "tests"),
    };

    PythonShell.run(
      "py_spawn_test.py",
      options,

      function (err, res) {
        if (err) {
          throw err;
        }
        let message;
        // message = JSON.parse(res);
        console.log(JSON.parse(res));
        console.log(res);
        // return message;
      }
    );
  }
  next();
};
exports.getSetup = (req, res) => {
  res.status(200).render("pages/setup", {
    message: "Success",
  });
};

exports.postPractice = (req, res) => {
  function daysIntoYear() {
    const date = new Date();
    return (
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
        Date.UTC(date.getFullYear(), 0, 0)) /
      24 /
      60 /
      60 /
      1000
    );
  }

  req.body.seed = daysIntoYear();

  req.app.locals.todayMade = true;
  req.app.locals.setupParams = req.body;
  const date = new Date();
  req.app.locals.setupParams.date = date.toLocaleDateString();
  console.log(req.app.locals.setupParams);
  // must post to db here
  res.status(201).render("pages/setup", {
    message: "Success",
  });
};
exports.patchPractice = (req, res) => {
  // patch to db
  req.app.locals.setupParams = req.body;
  console.log(req.body);
  res.status(200).render("pages/setup", {
    message: "Success",
  });
};
