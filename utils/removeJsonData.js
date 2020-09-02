const fs = require("fs");

const data = JSON.parse(fs.readFileSync("todaysJson.json"));
const post = {
  datetime: "2020-09-01T17:34",
  exercise: "6/4 time",
  material: '["Bsus47","C#m","C#b97"]',
  mins: "5",
  category: "progressions",
  instrument: "guitar",
  exercise_number: "45",
};

// const data = JSON.parse(fs.readFileSync("todaysJson.json"));
const completedExerciseId = (element) =>
  element.exercise_number === Number(post.exercise_number);

data[post.instrument].find(completedExerciseId).practiced = true;

console.log(data[post.instrument].find(completedExerciseId));
