const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const db = require("./models");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const exerciseRouter = require("./routes/exerciseRoutes");

db.sequelize.sync({ force: true }).then(() => {
  app.locals.makeData = true;
  console.log("Drop and re-sync db.");
});

app.locals.moment = require("moment");
app.locals.makeData = true;

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(morgan("dev"))
  .use(express.static(path.join(__dirname, "public")))
  .use("/exercise", exerciseRouter)
  .use(express.json({ limit: "10kb" }))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "pug");

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
