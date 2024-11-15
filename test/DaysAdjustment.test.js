const DaysAdjustment = require('../src/DaysAdjustment.js');

const limitDate = new Date(2022, 0, 1);
const da = new DaysAdjustment({ limitDate });

test('isHD', () => {
  expect(da.isHD(new Date(2021, 0, 1))).toStrictEqual(true);
  expect(da.isHD(new Date(2021, 4, 1))).toStrictEqual(true);
  expect(da.isHD(new Date(2021, 3, 30))).toStrictEqual(false);
  expect(da.isHD(new Date(2024, 4, 10))).toStrictEqual(true);
  expect(da.isHD(new Date('2024-05-09'))).toStrictEqual(true);
  expect(da.isHD(new Date('2024-05-01'))).toStrictEqual(true);
  expect(da.isHD(new Date('2025-01-08'))).toStrictEqual(true);
  expect(da.isHD(new Date('2025-04-29'))).toStrictEqual(false);
  expect(da.isHD(new Date('2025-04-30'))).toStrictEqual(false);
  expect(da.isHD(new Date('2025-05-01'))).toStrictEqual(true);
  expect(da.isHD(new Date('2025-05-02'))).toStrictEqual(true);
  expect(da.isHD(new Date('2025-05-03'))).toStrictEqual(false);
  expect(da.isHD(new Date('2025-05-08'))).toStrictEqual(true);
  expect(da.isHD(new Date('2025-05-09'))).toStrictEqual(true);
  expect(da.isHD(new Date('2025-06-12'))).toStrictEqual(true);
  expect(da.isHD(new Date('2025-06-13'))).toStrictEqual(true);
  expect(da.isHD(new Date('2025-11-03'))).toStrictEqual(true);
  expect(da.isHD(new Date('2025-11-04'))).toStrictEqual(true);
  expect(da.isHD(new Date('2025-12-31'))).toStrictEqual(true);
});

test('isWE', () => {
  expect(da.isWE(new Date(2021, 3, 24))).toStrictEqual(true);
  expect(da.isWE(new Date(2021, 3, 25))).toStrictEqual(true);
  expect(da.isWE(new Date(2021, 3, 23))).toStrictEqual(false);
  expect(da.isWE(new Date('2025-02-23'))).toStrictEqual(true);
  expect(da.isWE(new Date('2025-03-08'))).toStrictEqual(true);
});

test('getNextWorkDay', () => {
  expect(da.getNextWorkDay(new Date(2021, 3, 24))).toStrictEqual(
    new Date(2021, 3, 26)
  );
  expect(da.getNextWorkDay(new Date(2021, 3, 26))).toStrictEqual(
    new Date(2021, 3, 26)
  );
  expect(da.getNextWorkDay(new Date(2021, 0, 1))).toStrictEqual(
    new Date(2021, 0, 11)
  );
  expect(da.getNextWorkDay(new Date('2024-05-09'))).toStrictEqual(
    new Date('2024-05-13')
  );
  expect(da.getNextWorkDay(new Date('2024-05-01'))).toStrictEqual(
    new Date('2024-05-02')
  );
});

test('addWorkDay', () => {
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

test('countWorkDay', () => {
  expect(
    da.countWorkDay(new Date(2022, 2, 26), new Date(2022, 2, 27))
  ).toStrictEqual(0);
  expect(
    da.countWorkDay(new Date(2022, 2, 24), new Date(2022, 2, 25))
  ).toStrictEqual(2);
  expect(
    da.countWorkDay(new Date(2022, 3, 14), new Date(2022, 3, 20))
  ).toStrictEqual(5);
});
