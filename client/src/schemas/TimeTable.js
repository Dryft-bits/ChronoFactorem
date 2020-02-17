import WeekDay from "./WeekDay";

class TimeTable {
  constructor() {
    this.Monday = new WeekDay();
    this.Tuesday = new WeekDay();
    this.Wednesday = new WeekDay();
    this.Thursday = new WeekDay();
    this.Friday = new WeekDay();
    this.Saturday = new WeekDay();
  }
}

export default TimeTable;
