import React, { Component } from "react";
import TimeTable from "./schemas/TimeTable.js";
import * as TimeTableData from "./Timetable.json";
import AddCourse from "./components/AddCourse.jsx";
import Entry from "./schemas/Entry";

const courses = JSON.parse(JSON.stringify(TimeTableData));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTimeTable: new TimeTable(),
      myCourses: [],
      currentCourse: null
    };
    this.addSection = this.addSection.bind(this);
    this.updateCurrent = this.updateCurrent.bind(this);
    this.checkClash = this.checkClash.bind(this);
  }

  checkClash(hours, days) {
    var day, hour;
    for (day in days) {
      for (hour in hours) {
        if (this.state.myTimeTable.day.toWords(hour) != null) {
          return true;
        }
      }
    }
    return false;
  }

  addSection(input) {
    var day, hour;
    var section = input.target.id;
    var hours = this.state.currentCourse.sections[section].sched[0].hours;
    var days = this.state.currentCourse.sections[section].sched[0].days;
    var clash = this.checkClash(hours, days);
    if (clash) {
      alert("You got a damn clash!!");
      return;
    }

    var room = this.state.currentCourse.sections[section].sched[0].room;
    for (day in days) {
      for (hour in hours.split("/[A-Z]/")) {
        // this.state.setState({
        // myTimeTable: new Entry(
        // courses[this.state[this.state.currentCourse]],
        // courses[this.state[this.state.currentCourse]].name,
        //  room
        // )
        //});
      }
    }
  }

  updateCurrent(input) {
    this.setState({ currentCourse: input });
  }

  render() {
    return (
      <div>
        {this.state[this.state.currentCourse] ? (
          <div>
            <h1>{Object.keys(this.state.currentCourse)}</h1>
          </div>
        ) : null}
        <AddCourse
          allCourses={courses.default}
          TimeTable={this.state.selected}
          myCourses={this.state.myCourses}
          addSection={this.addSection}
          updateCurrent={this.updateCurrent}
        />
      </div>
    );
  }
}

export default App;
