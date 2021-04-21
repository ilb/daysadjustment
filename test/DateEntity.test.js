const { DateEntity } = require("../src/DateEntity.js");

// console.log(DateEntity);
test("getDates", () => {
  const de = new DateEntity();
  const limitDate = new Date(2006, 0, 1);
  const expected = [new Date(2004, 0, 5), new Date(2005, 0, 5)];
  de.parseRfcString("2004-01-05/P1Y", DateEntity.PRECISION_DAY);
  expect(de.getDates(limitDate)).toStrictEqual(expected);
});
