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

function hello() {
  console.log("hello mon");
  return 11;
}
