const fs = require("fs");
const path = require("path");

function getEssential(state) {
  return Object.fromEntries(
    Object.entries(state).map(([k, v]) => [
      k,
      Object.fromEntries(Object.entries(v).filter(([, val]) => val.essential)),
    ])
  );
}

function pickRandom(obj) {
  var keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}

const params = {
  timeSig: "4/4",
  key: "random",
  instrument: "all",
  time: "61",
  days: "4",
  essentials: "on",
  mode: "locrian",
  seed: 272,
  date: "9/28/2020",
};

// module.exports = function (params) {
const practice = function (params) {
  let exList = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "tests", "exercises.json"))
  );
  let modes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "tests", "modes.json"))
  );

  //   1 filter by instruments
  if (params.instrument !== "all") {
    exList = exList[params.instrument];
  }
  //  2 filter by essentials
  if (!!params.essential) {
    exList = getEssential(exList);
  }
  // 3 pick random mode if unassigned
  let mode;
  if (params.mode !== "random") {
    mode = pickRandom(modes);
  } else {
    mode = params.mode;
  }

  console.log(getEssential(exList));
  console.log(mode);
  return;
};

practice(params);
