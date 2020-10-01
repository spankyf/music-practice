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
// Math.floor(Math.random() * array.length)
function randomMode(obj) {
  let num = Math.floor(Math.random() * Object.keys(obj).length);
  return { [Object.keys(obj)[num]]: obj[Object.keys(obj)[num]] };
}

const params = {
  timeSig: "4/4",
  key: "random",
  instrument: "all",
  time: "61",
  days: "4",
  essentials: "on",
  mode: "random",
  seed: 272,
  date: "9/28/2020",
};

// module.exports = function (params) {
const practice = function (params) {
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

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
  let mode =
    params.mode === "random"
      ? randomMode(modes)
      : { [params.mode]: modes[params.mode] };

  // extend the array to get the upper extensions of 9, 11, 13 etc
  let intervals = [...Object.values(mode)[0]];

  let chords = [];
  let triads = [];
  let fourths = [];
  let fifths = [];

  for (let i = 0; i < 7; i++) {
    intervals.push(Object.values(mode)[0][i] + 12);
  }

  const twoModeOctaves = intervals.map((ind) => notes[ind]);

  console.log(twoModeOctaves);
  // for (let i = 0; i < intervals.length; i ++){
  //   chords.push()
  // }
  // 4 make chords - up to down on scale

  // 5 make triads - up to down on scale
  // 6 make pentatonics - up to down on scale
  // 7 make fourths
  // 8 make fifths
  // console.log(intervals);
  // console.log(notes);

  return;
};

practice(params);
