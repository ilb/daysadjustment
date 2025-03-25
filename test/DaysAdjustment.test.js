const DaysAdjustment = require('../src/DaysAdjustment.js');

const limitDate = new Date('2026-01-01');
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

test('isHD 2025', () => {
  // Новогодние каникулы
  expect(da.isHD(new Date('2025-01-01'))).toBe(true);
  expect(da.isHD(new Date('2025-01-02'))).toBe(true);
  expect(da.isHD(new Date('2025-01-03'))).toBe(true);
  expect(da.isHD(new Date('2025-01-04'))).toBe(true);
  expect(da.isHD(new Date('2025-01-05'))).toBe(true);
  expect(da.isHD(new Date('2025-01-06'))).toBe(true);

  expect(da.isHD(new Date('2025-01-07'))).toBe(true); // Рождество Христово
  expect(da.isHD(new Date('2025-01-08'))).toBe(true); // Доп. выходной
  expect(da.isHD(new Date('2025-02-23'))).toBe(true); // День защитника Отечества
  expect(da.isHD(new Date('2025-03-08'))).toBe(true); // Международный женский день
  expect(da.isHD(new Date('2025-05-01'))).toBe(true); // 1 мая – Праздник Весны и Труда
  expect(da.isHD(new Date('2025-05-02'))).toBe(true); // 2 мая – Перенос выходного дня
  expect(da.isHD(new Date('2025-05-08'))).toBe(true); // 8 мая – Перенос выходного дня
  expect(da.isHD(new Date('2025-05-09'))).toBe(true); // 9 мая – День Победы
  expect(da.isHD(new Date('2025-06-12'))).toBe(true); // День России
  expect(da.isHD(new Date('2025-06-13'))).toBe(true); // Перенос выходного дня
  expect(da.isHD(new Date('2025-11-03'))).toBe(true); // Перенос выходного дня
  expect(da.isHD(new Date('2025-11-04'))).toBe(true); // День народного единства
  expect(da.isHD(new Date('2025-12-31'))).toBe(true); // Перенос выходного дня
});

describe('tests 2025', () => {
  describe('isWE', () => {
    test('Должен вернуть true для субботы', () => {
      const date = new Date('2025-03-22'); // Суббота
      expect(da.isWE(date)).toBe(true);
    });

    test('Должен вернуть true для воскресенья', () => {
      const date = new Date('2025-03-23'); // Воскресенье
      expect(da.isWE(date)).toBe(true);
    });

    test('Должен вернуть false для буднего дня', () => {
      const date = new Date('2025-03-24'); // Понедельник
      expect(da.isWE(date)).toBe(false);
    });

    test('Должен вернуть false для буднего дня', () => {
      expect(da.isWE(new Date('2025-02-24'))).toBe(false);
    });

    test('Должен вернуть false для рабочей субботы', () => {
      const date = new Date('2025-11-01'); // Суббота
      expect(da.isWE(date)).toBe(false);
    });
  });

  describe('isFreeDay', () => {
    test('Должен вернуть true для праздничного дня', () => {
      const date = new Date('2025-01-01'); // Новый год
      expect(da.isFreeDay(date)).toBe(true);
    });

    test('Должен вернуть true для выходного дня', () => {
      const date = new Date('2025-03-22'); // Суббота
      expect(da.isFreeDay(date)).toBe(true);
    });

    test('Должен вернуть false для рабочего дня', () => {
      const date = new Date('2025-03-24'); // Понедельник
      expect(da.isFreeDay(date)).toBe(false);
    });

    test('Должен вернуть false для рабочего дня', () => {
      const date = new Date('2025-11-01'); // Суббота
      expect(da.isFreeDay(date)).toBe(false);
    });
  });

  describe('isWorkDay', () => {
    test('Должен вернуть false для праздничного дня', () => {
      const date = new Date('2025-01-07'); // Рождество
      expect(da.isWorkDay(date)).toBe(false);
    });

    test('Должен вернуть false для выходного дня', () => {
      const date = new Date('2025-03-22'); // Суббота
      expect(da.isWorkDay(date)).toBe(false);
    });

    test('Должен вернуть true для рабочего дня', () => {
      const date = new Date('2025-03-25'); // Вторник
      expect(da.isWorkDay(date)).toBe(true);
    });

    test('Должен вернуть true для рабочего дня', () => {
      const date = new Date('2025-11-01'); // Суббота
      expect(da.isWorkDay(date)).toBe(true);
    });
  });

  describe('getNextWorkDay', () => {
    test('Должен вернуть следующий рабочий день после выходного', () => {
      const date = new Date('2025-03-22'); // Суббота
      const nextWorkDay = da.getNextWorkDay(date);
      expect(nextWorkDay).toEqual(new Date('2025-03-24')); // Понедельник
    });

    test('Должен вернуть следующий рабочий день после праздничного', () => {
      const date = new Date('2025-01-07'); // Рождество (вторник)
      const nextWorkDay = da.getNextWorkDay(date);
      expect(nextWorkDay).toEqual(new Date('2025-01-09')); // Четверг
    });

    test('Должен вернуть следующий рабочий день', () => {
      const date = new Date('2025-01-01'); // Среда
      const nextWorkDay = da.getNextWorkDay(date);
      expect(nextWorkDay).toEqual(new Date('2025-01-09')); // Четверг
    });
  });

  describe('addWorkDay', () => {
    test('Должен корректно добавить рабочие дни, пропуская выходные', () => {
      const date = new Date('2025-03-21'); // Пятница
      const resultDate = da.addWorkDay(date, 1);
      expect(resultDate).toEqual(new Date('2025-03-24')); // Понедельник
    });

    test('Должен корректно добавить рабочие дни, учитывая праздничные дни', () => {
      const date = new Date('2025-01-06'); // Понедельник
      const resultDate = da.addWorkDay(date, 1);
      expect(resultDate).toEqual(new Date('2025-01-09')); // Четверг
    });

    test('Должен корректно добавить рабочие дни', () => {
      const date = new Date('2025-10-31'); // Пятница
      const resultDate = da.addWorkDay(date, 2);
      expect(resultDate).toEqual(new Date('2025-11-05')); // Среда
    });
  });

  describe('countWorkDay', () => {
    test('Должен корректно посчитать количество рабочих дней между двумя датами', () => {
      const startDate = new Date('2025-03-17'); // Понедельник
      const endDate = new Date('2025-03-23'); // Воскресенье
      const workDays = da.countWorkDay(startDate, endDate);
      expect(workDays).toBe(5);
    });

    test('Должен корректно посчитать количество рабочих дней', () => {
      const startDate = new Date('2025-01-01'); // Среда
      const endDate = new Date('2025-01-10'); // Пятница
      const workDays = da.countWorkDay(startDate, endDate);
      expect(workDays).toBe(2);
    });

    test('Должен корректно посчитать количество рабочих дней', () => {
      const startDate = new Date('2025-02-01');
      const endDate = new Date('2025-02-28');
      const workDays = da.countWorkDay(startDate, endDate);
      expect(workDays).toBe(20);
    });

    test('Должен корректно посчитать количество рабочих дней в году', () => {
      const startDate = new Date('2025-01-01');
      const endDate = new Date('2025-12-31');
      const workDays = da.countWorkDay(startDate, endDate);
      expect(workDays).toBe(247);
    });
  });
});
