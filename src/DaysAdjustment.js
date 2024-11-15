const { DateEntity, plusDays } = require('./DateEntity.js');

const config = {
  weekend: ['2004-01-04/P7D', '2013-03-30/P7D'],
  holiday: [
    '2004-01-01',
    '2013-01-01/P1Y',
    '2025-01-01',
    '2004-01-02/P1Y',
    '2025-01-02',
    '2004-01-03/P1Y',
    '2025-01-03',
    '2004-01-04/P1Y',
    '2025-01-04',
    '2004-01-05/P1Y',
    '2025-01-05',
    '2004-01-06/P1Y',
    '2025-01-06',
    '2004-01-07/P1Y',
    '2025-01-07',
    '2004-01-08/P1Y/2011-12-01',
    '2025-01-08',
    '2024-01-08/P1Y/2024-12-01',
    '2004-01-09/P1Y/2012-12-01',
    '2004-02-23/P1Y',
    '2004-03-08/P1Y',
    '2024-04-29',
    '2024-04-30',
    '2004-05-01/P1Y/2026-05-09',
    '2013-05-02',
    '2025-05-02',
    '2013-05-03',
    '2019-05-02/P1Y/2023-12-01',
    '2019-05-03/P1Y/2023-12-01',
    '2023-05-08',
    '2025-05-08',
    '2004-05-09/P1Y/2026-05-09',
    '2013-05-10',
    '2019-05-10/P1Y/2022-12-01',
    '2024-05-10/P1Y/2024-12-01',
    '2004-06-12/P1Y',
    '2025-06-12',
    '2025-06-13',
    '2025-11-03',
    '2004-11-04/P1Y',
    '2025-11-04',
    '2024-12-30',
    '2024-12-31',
    '2025-12-31',
  ],
};

function DaysAdjustment({ limitDate }) {
  /** weekends */
  this.WE = {};
  /** holidays */
  this.HD = {};
  if (!limitDate) {
    limitDate = new Date();
    // лимит 1 год
    limitDate.setFullYear(limitDate.getFullYear() + 1);
  }

  var sundays = [];
  var saturdays = [];

  for (const rfc3339_value of config.holiday) {
    const de = new DateEntity();
    de.parseRfcString(rfc3339_value, DateEntity.PRECISION_DAY);
    //this.HD = this.HD.concat(de.getDates(curr30));
    dates = de.getDates(limitDate);
    for (j = 0; j < dates.length; ++j) {
      this.HD[dates[j].getTime()] = rfc3339_value;
      // запоминаем воскресенья, пришедшиеся на праздники
      if (dates[j].getDay() == 0) {
        sundays.push(dates[j]);
      }
      // T86436 запоминаем субботы, пришедшиеся на праздники
      if (dates[j].getDay() == 6) {
        saturdays.push(dates[j]);
      }
    }

    for (j = 0; j < sundays.length; ++j) {
      // переносим выходные, пришедшиеся на праздники
      while (this.isHD(sundays[j])) {
        sundays[j] = plusDays(sundays[j], 1);
      }
      this.WE[sundays[j].getTime()] = rfc3339_value;
    }
    for (j = 0; j < saturdays.length; ++j) {
      // переносим выходные, пришедшиеся на праздники
      while (this.isHD(saturdays[j])) {
        saturdays[j] = plusDays(saturdays[j], 2);
      }
      this.WE[saturdays[j].getTime()] = rfc3339_value;
    }
  }
}
/**
 * Попадает ли дата на выходной день
 * @return true - выходной день<br/>false - не выходной день
 */
DaysAdjustment.prototype.isWE = function (date) {
  var res = false;

  if (date.getDay() == 0 || date.getDay() == 6) {
    // если воскресенье - сразу true
    res = true;
  } else {
    var d = new Date(date.getTime());
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    if (this.WE[d.getTime()] != null) {
      res = true;
    }
  }
  // console.log(res);
  return res;
};

/**
 * Попадает ли дата на праздничный день
 * @return true - выходной день<br/>false - не выходной день
 */
DaysAdjustment.prototype.isHD = function (date) {
  var res = false;
  var d = new Date(date.getTime());

  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  if (this.HD[d.getTime()] != null) {
    res = true;
  }
  return res;
};

/**
 * Является ли дата праздничным или выходным днем
 * @return
 */
DaysAdjustment.prototype.isFreeDay = function (date) {
  return this.isHD(date) || this.isWE(date);
};

/**
 * Является ли дата рабочим днем
 * @return
 */
DaysAdjustment.prototype.isWorkDay = function (date) {
  return !this.isFreeDay(date);
};

/**
 * получить следующий рабочий день
 * @param {*} date
 * @returns
 */
DaysAdjustment.prototype.getNextWorkDay = function (date) {
  date = new Date(date);
  while (this.isFreeDay(date)) {
    date.setDate(date.getDate() + 1);
  }
  return date;
};

/**
 * добавить count рабочих дней
 * @param {*} date
 * @returns
 */
DaysAdjustment.prototype.addWorkDay = function (date, count) {
  date = new Date(date);
  let added = 0;
  while (added < count) {
    date.setDate(date.getDate() + 1);
    if (this.isWorkDay(date)) {
      added++;
    }
  }
  return date;
};

/**
 * посчитать количество рабочих дней в промежутке между датами (обе даты интервала - включительно)
 * @param {*} date дата начала интервала
 * @param {*} endDate дата конца интервала
 * @returns
 */
DaysAdjustment.prototype.countWorkDay = function (date, endDate) {
  date = new Date(date);
  endDate = new Date(endDate);
  let workDayCount = 0;
  while (date <= endDate) {
    if (this.isWorkDay(date)) {
      workDayCount++;
    }
    date.setDate(date.getDate() + 1);
  }
  return workDayCount;
};
module.exports = DaysAdjustment;
