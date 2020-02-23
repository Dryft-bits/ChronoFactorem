import React, { Component } from "react";
import TimeTable from "../schemas/TimeTable.js";
import * as TimeTableData from "../Timetable.json";
import AddCourse from "./AddCourse.jsx";
import Entry from "../schemas/Entry";
import MyCourse from "../schemas/MyCourse";
import PreviewTT from "./PreviewTT.jsx";
import MidsemSched from "./MidsemSched.jsx";
import CompreSched from "./CompreSched.jsx";
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
const mapSection = { L: "Lecture", T: "Tutorial", P: "Practical" };

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
    this.checkClashorDelete = this.checkClashorDelete.bind(this);
    this.showView = this.showView.bind(this);
    this.checkLunchHour = this.checkLunchHour.bind(this);
    this.checkSection = this.checkSection.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  showView(input) {
    let id = parseInt(input.target.id);
    this.setState({ view: id });
  }

  checkClashorDelete(hours, days, room) {
    for (let day of days) {
      for (let hour of hours) {
        if (
          this.state.myTimeTable[day][ntw.toWords(hour)].sectionRoom === room
        ) {
          return "delete";
        } else if (
          this.state.myTimeTable[day][ntw.toWords(hour)].courseCode != null
        ) {
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
      if (freq === temp.length) {
        return day;
      }
    }
    return false;
  }

  checkSection(courseTemp, course, section) {
    let prev = courseTemp[course].sections.find(item => {
      return item.charAt(0) === section.charAt(0);
    });
    if (prev) {
      return prev;
    }
    return false;
  }

  addSection(input) {
    let courseCode = Object.keys(this.state.currentCourse);
    let day, hour;
    let section = input.target.parentNode.id;
    let hours = this.state.currentCourse[courseCode].sections[section].sched[0]
      .hours;
    let days = this.state.currentCourse[courseCode].sections[section].sched[0]
      .days;
    let room = this.state.currentCourse[courseCode].sections[section].sched[0]
      .room;
    let clash = this.checkClashorDelete(hours, days, room);
    let temp = this.state.myTimeTable;
    if (clash && clash !== "delete") {
      window.alert(
        "The selected section clashes with an already present course section! Please remove the previous course first!"
      );
      return;
    } else if (clash === "delete") {
      if (
        !window.confirm("Are You Sure That You Want To delete this Section?")
      ) {
        return;
      } else {
        for (let day of days) {
          for (let hour of hours) {
            temp[day][ntw.toWords(hour)] = new Entry();
          }
        }
        let courseTemp = Array.from(this.state.myCourses);
        let index = courseTemp.findIndex(item => {
          return Object.keys(item.course)[0] === courseCode[0];
        });

        let no = Array.from(
          courseTemp[index].sections.filter(item => {
            return item.charAt(0) !== section.charAt(0);
          })
        );
        if (!no.length) {
          courseTemp = courseTemp.filter(item => {
            return Object.keys(item.course)[0] !== courseCode[0];
          });
        } else {
          courseTemp[index].sections = no;
        }
        this.setState({ myTimeTable: temp, myCourses: courseTemp });
        return;
      }
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
    for (day of days) {
      for (hour of hours) {
        let entry = new Entry(
          courseCode,
          this.state.currentCourse[courseCode].name,
          room,
          hours.length
        );
        temp[day][ntw.toWords(hour)] = entry;
      }
    }
    let courseTemp = Array.from(this.state.myCourses);
    if (
      !courseTemp.length ||
      !courseTemp.find(item => {
        return Object.keys(item.course)[0] === courseCode[0];
      })
    ) {
      courseTemp.push(new MyCourse(this.state.currentCourse, section));
    } else {
      let index = courseTemp.findIndex(item => {
        return Object.keys(item.course)[0] === courseCode[0];
      });
      let duplicate = this.checkSection(courseTemp, index, section);
      if (duplicate === section) {
        return;
      }
      if (!duplicate) {
        courseTemp[index].sections.push(section);
      } else if (
        duplicate &&
        !window.confirm(
          "You have already chosen a " +
            mapSection[section.charAt(0)] +
            " for this course.Click ok to swap it with the selected section"
        )
      ) {
        return;
      } else {
        courseTemp[index].sections = courseTemp[index].sections.filter(item => {
          return item.charAt(0) !== section.charAt(0);
        });
        courseTemp[index].sections = Array.from(courseTemp[index].sections);
        courseTemp[index].sections.push(section);
        let hours = this.state.currentCourse[courseCode].sections[duplicate]
          .sched[0].hours;
        let days = this.state.currentCourse[courseCode].sections[duplicate]
          .sched[0].days;
        for (let day of days) {
          for (let hour of hours) {
            temp[day][ntw.toWords(hour)] = new Entry();
          }
        }
      }
    }
    this.setState({ myTimeTable: temp, myCourses: courseTemp });
  }

  updateCurrent(input) {
    this.setState({ currentCourse: input });
  }

  clearAll() {
    this.setState({ myTimeTable: new TimeTable(), myCourses: [] });
  }

  render() {
    let str = "";
    if (this.state.view === 0) {
      str = (
        <>
          <button
            className='waves-effect waves-light btn'
            id={1}
            onClick={this.showView}
          >
            {this.state.view === 0 ? "Preview" : "Back"}
          </button>
          <button
            className='waves-effect waves-light btn'
            id={2}
            onClick={this.showView}
          >
            {this.state.view === 0 ? "Midsem Schedule" : "Back"}
          </button>
          <button
            className='waves-effect waves-light btn'
            id={3}
            onClick={this.showView}
          >
            {this.state.view === 0 ? "Compre Schedule" : "Back"}
          </button>
          <button
            className='waves-effect waves-light btn'
            onClick={this.clearAll}
          >
            Clear All Entries
          </button>
          <div>
            <div style={{ float: "right", width: "35vw" }}>
              <AddCourse
                allCourses={courses.default}
                myCourses={this.state.myCourses}
                addSection={this.addSection}
                updateCurrent={this.updateCurrent}
              />
            </div>
            <div style={{ float: "left", width: "60vw" }}>
              <PreviewTT
                TimeTable={this.state.myTimeTable}
                style={{ float: "left" }}
              />
            </div>
          </div>
        </>
      );
    } else if (this.state.view === 1) {
      str = (
        <>
          <button
            className='waves-effect waves-light btn'
            id={0}
            onClick={this.showView}
          >
            {this.state.view === 0 ? "Preview" : "Back"}
          </button>
          <PreviewTT TimeTable={this.state.myTimeTable} />
        </>
      );
    } else if (this.state.view === 2) {
      str = (
        <>
          <button
            className='waves-effect waves-light btn'
            id={0}
            onClick={this.showView}
          >
            {this.state.view === 0 ? "Midsem Schedule" : "Back"}
          </button>
          <MidsemSched myCourses={this.state.myCourses} />
        </>
      );
    } else if (this.state.view === 3) {
      str = (
        <>
          <button
            className='waves-effect waves-light btn'
            id={0}
            onClick={this.showView}
          >
            {this.state.view === 0 ? "Compre Schedule" : "Back"}
          </button>
          <CompreSched myCourses={this.state.myCourses} />
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
