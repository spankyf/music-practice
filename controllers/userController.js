exports.getHome = (req, res) => {
  req.app.locals.makeData = true;
  res.status(200).render("pages/home", {
    message: "Success",
  });
};
