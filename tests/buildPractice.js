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
  // essentials: "on",
  mode: "random",
  seed: 272,
  date: "9/28/2020",
};

// module.exports = function (params) {
const practice = function (params) {
  console.log(params);
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
  if (!!params.essentials) {
    exList = getEssential(exList);
  }
  // 3 pick random mode if unassigned
  let mode =
    params.mode === "random"
      ? randomMode(modes)
      : { [params.mode]: modes[params.mode] };

  // 4 make the scale, triads, chords, fourths, fifths

  // extend the array to get the upper extensions of 9, 11, 13 etc
  // let the intervals array be the mode indices.
  let intervals = [...Object.values(mode)[0]];

  const secondOctaveIndices = intervals.map((x) => x + 12);
  const thirdOctaveIndices = intervals.map((x) => x + 24);

  //  now we have 3 full octaves of indices to map to the notes
  // making 3 octaves of the scale allows us to map chords all the way up

  const fullScale = intervals
    .concat(secondOctaveIndices, thirdOctaveIndices)
    .map((ind) => notes[ind]);

  let chords = [];
  let triads = [];
  let fourths = [];
  let fifths = [];

  const firstChordIndices = [0, 2, 4, 6];
  const firstTriadIndices = [0, 2, 4];

  const firstSusIndices = [0, 1, 4];
  const firstSusSixthIndices = [0, 1, 5];
  const firstSixthIndices = [0, 2, 5];
  const firstSusSeventhIndices = [0, 4, 6];
  const firstFourthTriadIndices = [0, 3, 6];
  const firstFourthIndices = [0, 3, 6, 9];
  const firstFifthIndices = [0, 4, 8, 12];

  // the 7 below is because theres only 7 degrees of any scale (not doing half-whole or fully diminished for now)

  for (let i = 0; i < 7; i++) {
    let newTriad = firstTriadIndices.map((x) => x + i);
    let newChord = firstChordIndices.map((x) => x + i);
    let newFourth = firstFourthIndices.map((x) => x + i);
    let newFifth = firstFifthIndices.map((x) => x + i);
    let newSus = firstSusIndices.map((x) => x + i);
    let newSusSixth = firstSusSixthIndices.map((x) => x + i);
    let newSusSeventh = firstSusSeventhIndices.map((x) => x + i);
    let newSixth = firstSixthIndices.map((x) => x + i);
    let newFourthTriad = firstFourthTriadIndices.map((x) => x + i);

    triads.push(newTriad.map((ind) => fullScale[ind]));
    triads.push(newSus.map((ind) => fullScale[ind]));
    triads.push(newSusSixth.map((ind) => fullScale[ind]));
    triads.push(newSusSeventh.map((ind) => fullScale[ind]));
    triads.push(newSixth.map((ind) => fullScale[ind]));
    triads.push(newFourthTriad.map((ind) => fullScale[ind]));

    chords.push(newChord.map((ind) => fullScale[ind]));
    fourths.push(newFourth.map((ind) => fullScale[ind]));
    fifths.push(newFifth.map((ind) => fullScale[ind]));
  }

  console.log(exList);

  return;
};

practice(params);
