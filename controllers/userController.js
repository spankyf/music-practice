exports.getHome = (req, res) => {
  res.status(200).render("pages/home", {
    message: "Success",
  });
};
exports.getSetup = (req, res) => {
  // if (!req.app.locals.todayMade) {
  //   const setupParams = { timeSig: "7/4" };
  //   console.log(" no params yet");
  // }

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

  // console.log(day, daysIntoYear());
  req.body.seed = daysIntoYear();
  console.log(req.body);

  req.app.locals.todayMade = true;
  req.app.locals.setupParams = req.body;

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
