import React, { Component } from "react";
import TimeTable from "../schemas/TimeTable.js";
import * as TimeTableData from "../Timetable.json";
import AddCourse from "./AddCourse.jsx";
import Entry from "../schemas/Entry";
import PreviewTT from "./PreviewTT.jsx";
import "../styles/CreateTimeTable.css";
const ntw = require("number-to-words");

const courses = JSON.parse(JSON.stringify(TimeTableData));
const mapDay = {
  M: "Monday",
  T: "Tuesday",
  W: "Wednesday",
  Th: "Thursday",
  F: "Friday",
  S: "Saturday"
};

class CreateTimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTimeTable: new TimeTable(),
      myCourses: [],
      currentCourse: null,
      view: 0
    };
    this.addSection = this.addSection.bind(this);
    this.updateCurrent = this.updateCurrent.bind(this);
    this.checkClash = this.checkClash.bind(this);
    this.showView = this.showView.bind(this);
    this.checkLunchHour = this.checkLunchHour.bind(this);
  }

  showView() {
    this.setState(() => ({
      view: 1 - this.state.view
    }));
  }

  checkClash(hours, days) {
    for (let day of days) {
      for (let hour of hours) {
        if (this.state.myTimeTable[day][ntw.toWords(hour)].courseCode != null) {
          return true;
        }
      }
    }
    return false;
  }

  checkLunchHour(hours, days) {
    let lunchHours = [4, 5, 6];
    for (let day of days) {
      let temp = lunchHours;
      for (let hour of hours) {
        temp = temp.filter(item => item !== hour);
      }
      let freq = 0;
      for (let hour of temp) {
        if (this.state.myTimeTable[day][ntw.toWords(hour)].courseCode != null) {
          freq++;
        }
      }
      if (freq == temp.length) {
        return day;
      }
    }
    return false;
  }

  addSection(input) {
    var courseCode = Object.keys(this.state.currentCourse);
    var day, hour;
    var section = input.target.id;
    var hours = this.state.currentCourse[courseCode].sections[section].sched[0]
      .hours;
    var days = this.state.currentCourse[courseCode].sections[section].sched[0]
      .days;
    if (
      this.checkClash(hours, days) &&
      !window.confirm(
        "The selected section clashes with an already present course section! Click ok to force use the current one!"
      )
    ) {
      return;
    }
    let checkLunch = this.checkLunchHour(hours, days);
    if (
      checkLunch &&
      !window.confirm(
        "Upon chosing this section you are not left with any lunch hour on " +
          mapDay[checkLunch] +
          " Click ok to proceed anyway"
      )
    ) {
      return;
    }
    var room = this.state.currentCourse[courseCode].sections[section].sched[0]
      .room;
    var temp = this.state.myTimeTable;
    for (day of days) {
      for (hour of hours) {
        var entry = new Entry(
          courseCode,
          this.state.currentCourse[courseCode].name,
          room,
          hours.length
        );
        temp[day][ntw.toWords(hour)] = entry;
      }
    }
    var courseTemp = this.setState.myCourses;
    if (!courseTemp || !courseTemp.includes(this.currentCourse)) {
      courseTemp += this.state.currentCourse;
    }
    this.setState({ myTimeTable: temp, myCourses: courseTemp });
  }

  updateCurrent(input) {
    this.setState({ currentCourse: input });
  }

  render() {
    let str = "";
    if (this.state.view === 0) {
      str = (
        <>
          <button onClick={this.showView}>
            {this.state.view === 0 ? "Preview" : "Back"}
          </button>
          <div>
            <div style={{ float: "left" }}>
              <AddCourse
                allCourses={courses.default}
                myCourses={this.state.myCourses}
                addSection={this.addSection}
                updateCurrent={this.updateCurrent}
              />
            </div>
            <div style={{ float: "right" }}>
              <PreviewTT
                TimeTable={this.state.myTimeTable}
                style={{ float: "right" }}
              />
            </div>
          </div>
        </>
      );
    } else {
      str = (
        <>
          <button onClick={this.showView}>
            {this.state.view === 0 ? "Preview" : "Back"}
          </button>
          <PreviewTT TimeTable={this.state.myTimeTable} />
        </>
      );
    }
    return (
      <>
        <>{str}</>
      </>
    );
  }
}
export default CreateTimeTable;
