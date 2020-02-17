import React, { Component } from "react";
//import TimeTable from "./schemas/TimeTable.js";
import AddCourse from "./components/AddCourse.jsx";

//var TimeTableData = require("./Timetable.json");
//const courses = JSON.parse(TimeTableData);
const courses = [
  {
    code: "CS F211",
    name: "DSA",
    lectures: [
      {
        code: "L1",
        teacher: "BHANUMURTHY",
        hours: " 6 7",
        room: "ht",
        days: "hk"
      },
      { code: "L2", teacher: "MITRA", hours: " 6 7", room: "ht", days: "hk" }
    ],
    tutorials: [
      { code: "T1", teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
      { code: "T2", teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
    ],
    labs: [
      { code: "P1", teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
      { code: "P2", teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
    ],
    mcodesem: "3 Mar",
    compre: "4 May"
  },
  {
    code: "CS F212",
    name: "OOPS",
    lectures: [
      { code: "L1", teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
      { code: "L2", teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
    ],
    tutorials: [
      { code: "T1", teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
      { code: "T2", teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
    ],
    labs: [
      { code: "P1", teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
      { code: "P2", teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
    ],
    midsem: "3 Mar",
    compre: "4 May"
  }
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { myTimeTable: [], myCourses: [] };
  }
  render() {
    return (
      <AddCourse
        allCourses={courses}
        TimeTable={this.state.selected}
        myCourses={this.state.myCourses}
      />
    );
  }
}

export default App;
