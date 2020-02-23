import React, { Component } from "react";
import Search from "./Search";
import ListCourse from "./ListCourse";
import SectionTabs from "./SectionTab";
import ToggleButton from "./ToggleButton";

class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: this.props.allCourses,
      current: this.props.allCourses,
      selectedCourse: null
    };
    this.filterItems = this.filterItems.bind(this);
    this.handleCourseAddition = this.handleCourseAddition.bind(this);
    this.getSections = this.getSections.bind(this);
    this.changeCourse = this.changeCourse.bind(this);
  }

  filterItems(input) {
    let filterCourses = obj =>
      Object.keys(obj)
        .filter(
          item =>
            item.toLowerCase().search(input.target.value.toLowerCase()) !==
              -1 ||
            obj[item]["name"]
              .toLowerCase()
              .search(input.target.value.toLowerCase()) !== -1
        )
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    let updatedlist = filterCourses(this.state.initial);
    this.setState({ current: updatedlist });
  }

  handleCourseAddition(input) {
    let selectedCode = input.target.id;
    let selectCourse = obj =>
      Object.keys(obj)
        .filter(course => course === selectedCode)
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    let selectedCourse = selectCourse(this.state.current);
    this.props.updateCurrent(selectedCourse);
    this.setState({
      selectedCourse: selectedCourse
    });
  }

  getSections(type) {
    let course = this.state.selectedCourse;
    let code = Object.keys(course)[0];
    let selectSections = obj =>
      Object.keys(obj)
        .filter(item => item.charAt(0) === type)
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    let list = selectSections(this.state.selectedCourse[code].sections);
    return list;
  }

  changeCourse() {
    this.setState({ selectedCourse: null, current: this.props.allCourses });
  }

  render() {
    return (
      <div>
        {!this.state.selectedCourse ? (
          <div>
            <Search action={this.filterItems} />
            <ListCourse
              courses={this.state.current}
              action={this.handleCourseAddition}
            />
          </div>
        ) : (
          <div>
            <h3>{Object.keys(this.state.selectedCourse)}</h3>
            <ToggleButton action={this.changeCourse} title="Change Course" />
            <SectionTabs
              action={this.props.addSection}
              getSections={this.getSections}
            />
          </div>
        )}
      </div>
    );
  }
}

export default AddCourse;
