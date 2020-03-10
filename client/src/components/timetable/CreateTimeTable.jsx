import React, { Component } from "react";
import TimeTable from "../../schemas/TimeTable.js";
import * as TimeTableData from "../../Timetable.json";
import * as utils from "../../utils/CreateTTUtils.js";
import AddCourse from "./AddCourse.jsx";
import PreviewTT from "./PreviewTT.jsx";
import MidsemSched from "./MidsemSched.jsx";
import CompreSched from "./CompreSched.jsx";

const courses = JSON.parse(JSON.stringify(TimeTableData));

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
    this.showView = this.showView.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.CustomButton = this.CustomButton.bind(this);
  }

  showView(input) {
    let id = parseInt(input.target.id);
    this.setState({ view: id });
  }

  updateCurrent(input) {
    this.setState({ currentCourse: input });
  }

  clearAll() {
    this.setState({ myTimeTable: new TimeTable(), myCourses: [] });
  }

  CustomButton(type, id) {
    return (
      <button
        className="waves-effect waves-light btn"
        id={id}
        onClick={this.showView}
      >
        {this.state.view === 0 ? type : "Back"}
      </button>
    );
  }

  addSection(input) {
    let courseCode = Object.keys(this.state.currentCourse);
    let temp = this.state.myTimeTable;
    let courseTemp = Array.from(this.state.myCourses);
    let section = input.target.parentNode.id;
    let sectionDict = this.state.currentCourse[courseCode].sections;
    let clash = false;
    sectionDict[section].sched.forEach(item => {
      clash =
        clash ||
        utils.checkClashOrDelete(
          temp,
          courseCode,
          utils.getSectionDetails(item)
        );
    });
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
        [temp, courseTemp] = utils.deleteSection(
          temp,
          courseTemp,
          courseCode,
          sectionDict,
          section
        );
        this.setState({ myTimeTable: temp, myCourses: courseTemp });
        return;
      }
    }
    let checkLunch = false;
    sectionDict[section].sched.forEach(item => {
      checkLunch =
        checkLunch || utils.checkLunchHour(temp, utils.getSectionDetails(item));
    });
    if (
      checkLunch &&
      !window.confirm(
        "Upon chosing this section you are not left with any lunch hour on " +
          utils.mapDay[checkLunch] +
          " Click ok to proceed anyway"
      )
    ) {
      return;
    }
    let duplicate = utils.checkSection(courseTemp, courseCode, section);
    if (
      duplicate &&
      !window.confirm(
        "You have already chosen a " +
          utils.mapSection[section.charAt(0)] +
          " for this course.Click ok to swap it with the selected section"
      )
    ) {
      return;
    } else if (duplicate) {
      [temp, courseTemp] = utils.deleteSection(
        temp,
        courseTemp,
        courseCode,
        sectionDict,
        duplicate
      );
    }
    [temp, courseTemp] = utils.updateTT(
      temp,
      courseTemp,
      courseCode,
      this.state.currentCourse,
      sectionDict,
      section
    );
    this.setState({ myTimeTable: temp, myCourses: courseTemp });
  }

  render() {
    let str = "";
    if (this.state.view === 0) {
      str = (
        <>
          {this.CustomButton("Preview", 1)}
          {this.CustomButton("Midsem Schedule", 2)}
          {this.CustomButton("Compre Schedule", 3)}
          <button
            className="waves-effect waves-light btn"
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
          {this.CustomButton("Preview", 0)}
          <PreviewTT TimeTable={this.state.myTimeTable} />
        </>
      );
    } else if (this.state.view === 2) {
      str = (
        <>
          {this.CustomButton("Midsem Schedule", 0)}
          <MidsemSched myCourses={this.state.myCourses} />
        </>
      );
    } else if (this.state.view === 3) {
      str = (
        <>
          {this.CustomButton("Compre Schedule", 0)}
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
