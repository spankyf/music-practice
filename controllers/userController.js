exports.getHome = (req, res) => {
  res.status(200).render("pages/home", {
    message: "Success",
  });
};
