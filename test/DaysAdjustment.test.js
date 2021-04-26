const DaysAdjustment = require("../src/DaysAdjustment.js");

const limitDate = new Date(2022, 0, 1);
const da = new DaysAdjustment({ limitDate });
test("isHD", () => {
  expect(da.isHD(new Date(2021, 0, 1))).toStrictEqual(true);
  expect(da.isHD(new Date(2021, 4, 1))).toStrictEqual(true);
  expect(da.isHD(new Date(2021, 3, 30))).toStrictEqual(false);
});

test("isWE", () => {
  expect(da.isWE(new Date(2021, 3, 24))).toStrictEqual(true);
  expect(da.isWE(new Date(2021, 3, 25))).toStrictEqual(true);
  expect(da.isWE(new Date(2021, 3, 23))).toStrictEqual(false);
});

test("getNextWorkDay", () => {
  expect(da.getNextWorkDay(new Date(2021, 3, 24))).toStrictEqual(
    new Date(2021, 3, 26)
  );
  expect(da.getNextWorkDay(new Date(2021, 3, 26))).toStrictEqual(
    new Date(2021, 3, 26)
  );
  expect(da.getNextWorkDay(new Date(2021, 0, 1))).toStrictEqual(
    new Date(2021, 0, 11)
  );
});

test("addWorkDay", () => {
  expect(da.addWorkDay(new Date(2021, 3, 24), 1)).toStrictEqual(
    new Date(2021, 3, 26)
  );
  expect(da.addWorkDay(new Date(2021, 3, 24), 2)).toStrictEqual(
    new Date(2021, 3, 27)
  );

  expect(da.addWorkDay(new Date(2021, 0, 1), 12)).toStrictEqual(
    new Date(2021, 0, 26)
  );
});
