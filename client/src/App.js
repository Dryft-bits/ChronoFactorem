import React, { Component } from "react";
import TimeTable from "./schemas/TimeTable.js";
import * as TimeTableData from "./Timetable.json";
import AddCourse from "./components/AddCourse.jsx";

const courses = JSON.parse(JSON.stringify(TimeTableData));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { myTimeTable: new TimeTable(), myCourses: [] };
  }
  render() {
    return (
      <AddCourse
        allCourses={courses.default}
        TimeTable={this.state.selected}
        myCourses={this.state.myCourses}
      />
    );
  }
}

export default App;
