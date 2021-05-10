const DaysAdjustment = require("../src/DaysAdjustment.js");

const limitDate = new Date(2025, 0, 1);
const da = new DaysAdjustment({ limitDate });
let date = new Date(2021, 0, 1);
while (date < limitDate) {
  console.log(`${formatISO(date)};${da.isFreeDay(date) ? 0 : 1}`);
  date.setDate(date.getDate() + 1);
}

function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

function formatISO(date) {
  return (
    date.getUTCFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate())
  );
}
