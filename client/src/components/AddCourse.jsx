import React, { Component } from "react";
import Search from "./Search";
import ListCourse from "./ListCourse";
import CollapsibleList from "./CollapsibleList";

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
    this.handleSectionAddition = this.handleSectionAddition.bind(this);
    this.getSections = this.getSections.bind(this);
  }

  filterItems(input) {
    var filterCourses = obj =>
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
    var updatedlist = filterCourses(this.state.initial);
    this.setState({ current: updatedlist });
  }

  handleCourseAddition(input) {
    var selectedCode = input.target.id;
    var selectCourse = obj =>
      Object.keys(obj)
        .filter(course => course === selectedCode)
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    var selectedCourse = selectCourse(this.state.current);
    this.setState({
      selectedCourse: selectedCourse
    });
  }

  getSections(type) {
    var course = this.state.selectedCourse;
    var code = Object.keys(course)[0];
    var selectSections = obj =>
      Object.keys(obj)
        .filter(item => item.charAt(0) === type)
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    var list = selectSections(this.state.selectedCourse[code].sections);
    return list;
  }

  handleSectionAddition(input) {
    //var selectedCode = input.target.id;
    console.log("Section Selected");
  }

  render() {
    if (!this.state.selectedCourse) {
      return (
        <div>
          <Search action={this.filterItems} />
          <ListCourse
            courses={this.state.current}
            action={this.handleCourseAddition}
          />
        </div>
      );
    } else {
      return (
        <div>
          <CollapsibleList
            title="Lecture"
            action={this.handleSectionAddition}
            getSections={this.getSections}
            type="L"
          />
          <CollapsibleList
            title="Tutorial"
            action={this.handleSectionAddition}
            getSections={this.getSections}
            type="T"
          />
          <CollapsibleList
            title="Practical"
            action={this.handleSectionAddition}
            getSections={this.getSections}
            type="P"
          />
        </div>
      );
    }
  }
}
export default AddCourse;
