interface IStat {
  addStat: Function;
  getStatData: Function;
}

class Stat implements IStat {
  range: string[];
  statCollection: {};
  constructor() {
    this.range = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.statCollection = {};
  }

  addStat(timeStamp: Date, data: number) {
    timeStamp;
    data;
  }
  getStatData() {
    let data = this.range.map(day =>
      // @ts-ignore
      this.statCollection[day] ? this.statCollection[day] : 0,
    );
    let label = this.range;
    return {
      data,
      label,
    };
  }
}
class WeekStat extends Stat {
  constructor() {
    super();
    this.range = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    this.statCollection = {};
  }

  addStat(timeStamp: Date, data: Number) {
    let day = this.range[new Date(timeStamp).getUTCDay()];
    // @ts-ignore
    if (this.statCollection[day]) {
      // @ts-ignore
      this.statCollection[day] += data;
    } else {
      // @ts-ignore
      this.statCollection[day] = data;
    }
  }
}

class YearStat extends Stat {
  constructor() {
    super();
    this.statCollection = {};
  }

  addStat(timeStamp: Date, data: Number) {
    let month = this.range[new Date(timeStamp).getUTCMonth()];
    // @ts-ignore
    if (this.statCollection[month]) {
      // @ts-ignore
      this.statCollection[month] += data;
    } else {
      // @ts-ignore
      this.statCollection[month] = data;
    }
  }
}
class MonthStat extends Stat {
  constructor() {
    super();
    let date = new Date();
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let numOfDays = new Date(`${year}-${month + 2}`).getUTCDate();

    this.range = [];
    for (let i = 1; i <= numOfDays; i++) {
      this.range.push(`${i}`);
    }
    this.statCollection = {};
  }
  addStat(timeStamp: Date, data: Number) {
    let day = this.range[new Date(timeStamp).getUTCDate() - 1];
    // @ts-ignore
    if (this.statCollection[day]) {
      // @ts-ignore
      this.statCollection[day] += data;
    } else {
      // @ts-ignore
      this.statCollection[day] = data;
    }
  }
}

export default function(range: String) {
  switch (range.toLocaleLowerCase()) {
    case 'year':
      return new YearStat();
      break;
    case 'month':
      return new MonthStat();
      break;
    case 'week':
      return new WeekStat();
      break;
    default:
      return null;
      break;
  }
}
