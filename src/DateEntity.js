function getEndOfMonth(date) {
  const d = new Date(date.getTime());
  const days = d.getMonthDays(d.getMonth());
  d.setDate(days);
  return d;
}

function getMaxDayOfYear(date) {
  return date.getMonthDays(1) > 28 ? 366 : 365;
}

function plusDays(date, days) {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

function minusDays(date, days) {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() - days);
  return d;
}

function plusMonths(date, months) {
  const d = new Date(date.getTime());
  d.setMonth(d.getMonth() + months, d.getDate());
  return d;
}

function daysInMonth(date) {
  const d = new Date(date.getTime());
  return 33 - new Date(d.getFullYear(), d.getMonth(), 33).getDate();
}

function plusMonthsAsSql(date, months) {
  const d = new Date(date.getTime());
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + months);
  const max = daysInMonth(d);
  d.setDate(day > max ? max : day);
  return d;
}

function plusYears(date, years) {
  const d = new Date(date.getTime());
  d.setFullYear(d.getFullYear() + years);
  return d;
}

function getAddMonthForSoglasie(startDate, loanPeriod) {
  loanPeriod = parseInt(loanPeriod, 10);
  //дата начала действия договора страхования
  const startIns = plusDays(startDate, 1);
  //дата окончания действия договора страхования
  const endDate = plusMonthsAsSql(startDate, loanPeriod);

  const endDate2 = getEndOfMonth(endDate);

  const dateCalcStr =
    endDate.getFullYear() +
    "/" +
    (endDate.getMonth() + 1) +
    "/" +
    (startIns.getDate() < endDate2.getDate()
      ? startIns.getDate()
      : endDate2.getDate());

  const dateCalc = new Date(dateCalcStr);

  const ceilMonth =
    (dateCalc.getFullYear() - startIns.getFullYear()) * 12 +
    (dateCalc.getMonth() - startIns.getMonth());

  const endDate3 = plusDays(endDate, 1);

  let addMonth;

  if (endDate3 > dateCalc) {
    addMonth = 1;
  } else if (endDate3 < dateCalc) {
    addMonth = -1;
  } else {
    addMonth = 0;
  }

  return ceilMonth + addMonth;
}

function round(value, scale) {
  return (
    Math.round(
      (Math.round(value * Math.pow(10, scale + 3)) / Math.pow(10, scale + 3)) *
        Math.pow(10, scale)
    ) / Math.pow(10, scale)
  );
}

function mathRound(value, scale) {
  let d = 1;
  if (scale > 0) {
    for (let i = 1; i <= scale; i++) {
      d = d * 10;
    }
  }
  return Math.round(value * d) / d;
}

function roundHalfUpPrecise(value, scale) {
  let j;
  const sc = scale < 0 ? 0 : scale;
  const strs = value.toString().split(".");
  if (strs.length < 2) {
    strs[1] = "";
  }
  const fr_len = strs[1].length;
  let res = value;
  if (fr_len > scale) {
    res = parseInt(strs[0] + strs[1], 10);
    for (j = fr_len - 1; j >= sc; --j) {
      res = Math.round(res / 10);
    }
    res = res / Math.pow(10, scale);
  }
  return res;
}
//оставим знаки после запятой, не округляя
function breakDigits(value, scale) {
  let out = null;
  const strs = value.toString().split(".");
  if (strs.length < 2) {
    out = parseInt(strs[0], 10);
  } else {
    out = parseFloat(strs[0] + "." + strs[1].substr(0, scale));
  }
  return out;
}

/**
 * P1Y1M1DT1H1M1S
 */
function Period(period_string) {
  //this.weeks = 0;
  this.years = 0;
  this.months = 0;
  this.days = 0;
  this.hours = 0;
  this.minutes = 0;
  this.seconds = 0;
  this.millis = 0;

  const a = period_string.split("T");
  let val = "";
  let i;
  if (a[0].length > 0) {
    for (i = 1; i < a[0].length; ++i) {
      if (a[0].charAt(i) == "Y") {
        this.years = parseInt(val, 10);
        val = "";
      } else if (a[0].charAt(i) == "M") {
        this.months = parseInt(val, 10);
        val = "";
      } else if (a[0].charAt(i) == "D") {
        this.days = parseInt(val, 10);
        val = "";
      } else {
        val = val + a[0].charAt(i);
      }
    }
  }

  if (a.length > 1 && a[1].length > 0) {
    for (i = 0; i < a[1].length; ++i) {
      if (a[1].charAt(i) == "H") {
        this.hours = parseInt(val, 10);
        val = "";
      } else if (a[1].charAt(i) == "M") {
        this.minutes = parseInt(val, 10);
        val = "";
      } else if (a[1].charAt(i) == "S") {
        this.seconds = parseInt(val, 10);
        val = "";
      } else {
        val = val + a[1].charAt(i);
      }
    }
  }
}

//Period.prototype.getWeeks = function() {return this.weeks;}
Period.prototype.getYears = function () {
  return this.years;
};
Period.prototype.getMonths = function () {
  return this.months;
};
Period.prototype.getDays = function () {
  return this.days;
};
Period.prototype.getHours = function () {
  return this.hours;
};
Period.prototype.getMinutes = function () {
  return this.minutes;
};
Period.prototype.getSeconds = function () {
  return this.seconds;
};
Period.prototype.getMillis = function () {
  return this.millis;
};

function isInt(str_value) {
  let i;
  this.cipher = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let res = true;
  for (i = 0; i < str_value.length; ++i) {
    if (!this.cipher.hasOwnProperty(str_value.charAt(i))) {
      res = false;
      break;
    }
  }
  return res;
}

function parseISODateTimeString(str) {
  let res = null;
  const a = str.split("T");
  if (a[0].length > 0) {
    const d = a[0].split("-");
    if (d.length == 3) {
      if (isInt(d[0]) && isInt(d[1]) && isInt(d[2])) {
        res = new Date();
        /*
         * По умолчанию new Date() создает текущую дату, соответственно, может получиться,
         * что текущий день месяца > 28 и при дальнейшем setMonth(2) получится не февраль, а март.
         * Поэтому сначала устанавливаем 1-е число, а уж потом все остальное
         */
        res.setDate(1);
        res.setFullYear(parseInt(d[0], 10));
        res.setMonth(parseInt(d[1], 10) - 1);
        res.setDate(parseInt(d[2], 10));
        if (a.length > 1) {
          const t = a[1].split(":");
          if (t.length == 3) {
            const sec = t[2].split(".");
            if (sec.length > 1) {
              t[2] = sec[0];
              t[3] = sec[1];
            } else {
              t[3] = "0";
            }
            if (isInt(t[0]) && isInt(t[1]) && isInt(t[2]) && isInt(t[3])) {
              res.setHours(parseInt(t[0], 10));
              res.setMinutes(parseInt(t[1], 10));
              res.setSeconds(parseInt(t[2], 10));
              res.setMilliseconds(parseInt(t[3], 10));
            } else {
              res = null;
            }
          }
        } else {
          res.setHours(0);
          res.setMinutes(0);
          res.setSeconds(0);
          res.setMilliseconds(0);
        }
      }
    }
  }
  return res;
}

/**
 * класс с базовыми методами парсинга по rfc3339
 * @author Alexander Soklakov
 */
function DateEntity() {
  this.START = null; //DateTime
  this.END = null; //DateTime
  this.PERIOD = null; //Period
  this.PRECISION = DateEntity.PRECISION_MILLISECOND;
}
DateEntity.PRECISION_DAY = 0;
DateEntity.PRECISION_HOUR_OF_DAY = 1;
DateEntity.PRECISION_MINUTE = 2;
DateEntity.PRECISION_SECOND = 3;
DateEntity.PRECISION_MILLISECOND = 4;

DateEntity.prototype.round = function (date, precision) {
  if (date == null) {
    throw new Error("date parameter of DateEntity.prototype.round is null !");
  }
  const lprecision =
    typeof precision != "undefined" && !isNaN(precision) && precision != null
      ? precision
      : this.PRECISION;
  const d = new Date(date.getTime());
  if (lprecision == DateEntity.PRECISION_DAY) {
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
  } else if (lprecision == DateEntity.PRECISION_HOUR_OF_DAY) {
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
  } else if (lprecision == DateEntity.PRECISION_MINUTE) {
    d.setSeconds(0);
    d.setMilliseconds(0);
  } else if (lprecision == DateEntity.PRECISION_SECOND) {
    d.setMilliseconds(0);
  }
  return d;
};

DateEntity.prototype.parseDate = function (date, precision) {
  if (date == null) {
    throw new Error(
      "date parameter of DateEntity.prototype.parseDate is null !"
    );
  }
  if (precision != null) {
    this.PRECISION = precision;
  }
  this.START = this.round(parseISODateTimeString(date));
  this.END = null; //Date
  this.PERIOD = null; //Period
};

DateEntity.prototype.parseRfcString = function (str, precision) {
  if (precision != null) {
    this.PRECISION = precision;
  }
  const d = parseISODateTimeString(str);
  if (d != null) {
    this.START = this.round(d);
  } else {
    // Разбор периода
    // строка периода - start/duration/end
    const tmp = str.split("/");
    if (tmp.length == 3) {
      this.START = this.round(parseISODateTimeString(tmp[0]));
      this.PERIOD = new Period(tmp[1]);
      this.END = this.round(parseISODateTimeString(tmp[2]));
    } else if (tmp.length == 2) {
      if (str.charAt(0) != "P") {
        this.START = this.round(parseISODateTimeString(tmp[0]));
        this.PERIOD = new Period(tmp[1]);
      } else {
        this.PERIOD = new Period(tmp[0]);
        this.END = this.round(parseISODateTimeString(tmp[1]));
      }
    } else {
      this.PERIOD = new Period(tmp[0]);
    }
  }
};

DateEntity.prototype.toString = function () {
  let res = this.START != null ? this.START.print("%Y-%m-%d") : "";
  res =
    res + this.PERIOD != null
      ? (res.equals("") ? "" : "/") + this.PERIOD.toString()
      : "";
  res =
    res + this.END != null
      ? (res.equals("") ? "" : "/") + this.END.print("%Y-%m-%d")
      : "";
  return res;
};

/**
 * Получить массив дат из периода. Возвращает значения, в зависимости от того, как задан DateEntity:
 * <li>date или time или datetime - одну дату
 * <li>start/period/end - с даты старта по дату завершения, в соответствии с периодом
 * <li>start/period - с даты старта по limit, в соответствии с периодом
 * <li>period/end - с limit по дату завершения, в соответствии с периодом; периоды отсчитываются
 * от даты завершения
 * <li>period - если limit больше текущей даты, то с текущей даты по limit, в соответствии с периодом;
 * если limit меньше текущей даты, то с limit по текущую дату, в соответствии с периодом, периоды
 * в этом случае отсчитываются от текущей даты
 *
 * @param limit предельная дата, в случае когда не указан один из пределов; если limit == null, то в качестве
 * предельной используется текущая дата
 * @return массив дат
 */
DateEntity.prototype.getDates = function (limit) {
  const curr = this.round(new Date());
  const lim = limit == null ? new Date(curr.getTime()) : this.round(limit);
  const dates = [];

  if (this.PERIOD == null) {
    if (this.START != null) {
      dates.push(this.START);
    }
  } else {
    let use_next = true;
    let start;
    let end;
    if (this.START != null && this.END != null) {
      start = this.START;
      end = this.END;
    } else if (this.START != null && this.END == null) {
      start = this.START;
      end = lim;
    } else if (this.START == null && this.END != null) {
      start = lim;
      end = this.END;
      use_next = false;
    } else {
      if (lim > curr) {
        start = curr;
        end = lim;
      } else {
        start = lim;
        end = curr;
        use_next = false;
      }
    }

    let i = 0;
    let gc;
    if (use_next) {
      gc = new Date(start.getTime());
      while (gc <= end) {
        dates.push(gc);
        gc = this.next(start, ++i);
      }
    } else {
      gc = new Date(end.getTime());
      while (gc >= start) {
        dates.push(gc);
        gc = this.previous(end, ++i);
      }
    }
  }

  return dates;
};

//    /**
//     * Проверить принадлежит ли дата диапазону
//     * @return true - если да
//     */
//    public boolean inRange(Calendar date) {
//        Calendar[] da = getDates(date);
//        // Проверить наличие даты в массиве дат
//        for(int i=0; i < da.length; i++) {
//            if(da[i].compareTo(date) == 0) return true;
//        }
//        return false;
//    }
//
/**
 * Получить дату через i периодов от date
 */
DateEntity.prototype.next = function (date, i) {
  if (this.PERIOD == null) {
    return null;
  }
  const gc = new Date(date.getTime());

  gc.setMilliseconds(gc.getMilliseconds() + this.PERIOD.getMillis() * i);
  gc.setSeconds(gc.getSeconds() + this.PERIOD.getSeconds() * i);
  gc.setMinutes(gc.getMinutes() + this.PERIOD.getMinutes() * i);
  gc.setHours(gc.getHours() + this.PERIOD.getHours() * i);
  gc.setDate(gc.getDate() + this.PERIOD.getDays() * i);
  gc.setMonth(gc.getMonth() + this.PERIOD.getMonths() * i);
  gc.setFullYear(gc.getFullYear() + this.PERIOD.getYears() * i);

  return gc;
};

/**
 * Получить дату на i периодов меньше date
 */
DateEntity.prototype.previous = function (date, i) {
  return this.next(date, -i);
};

module.exports = { DateEntity, plusDays };
