import WeekDay from "./WeekDay";

class TimeTable {
  constructor() {
    this.M = new WeekDay();
    this.T = new WeekDay();
    this.W = new WeekDay();
    this.Th = new WeekDay();
    this.F = new WeekDay();
    this.S = new WeekDay();
  }
}

module.export = TimeTable;
