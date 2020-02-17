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
    Object.filter = obj =>
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
    var updatedlist = Object.filter(this.state.initial);
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
    Object.filter = obj =>
      Object.keys(obj)
        .filter(item => Object.keys(obj[item].sections)[0].charAt(0) === type)
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    var list = Object.filter(course[code].sections);
    console.log("yee");
    console.log(list);
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
            list={this.getSections("L")}
          />
          <CollapsibleList
            title="Tutorial"
            action={this.handleSectionAddition}
            list={this.getSections("T")}
          />
          <CollapsibleList
            title="Practical"
            action={this.handleSectionAddition}
            list={this.getSections("P")}
          />
        </div>
      );
    }
  }
}
export default AddCourse;
