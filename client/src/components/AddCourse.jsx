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
  }

  filterItems(input) {
    var updatedlist = this.state.initial;
    updatedlist = updatedlist.filter(item => {
      return (
        item.code.toLowerCase().search(input.target.value.toLowerCase()) !==
          -1 ||
        item.name.toLowerCase().search(input.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ current: updatedlist });
  }

  handleCourseAddition(input) {
    var selectedCode = input.target.id;
    var selectedCourse = this.state.current.find(course => {
      return course.code === selectedCode;
    });
    this.setState({
      selectedCourse: selectedCourse
    });
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
            list={this.state.selectedCourse.lectures}
          />
          <CollapsibleList
            title="Tutorial"
            action={this.handleSectionAddition}
            list={this.state.selectedCourse.tutorials}
          />
          <CollapsibleList
            title="Practical"
            action={this.handleSectionAddition}
            list={this.state.selectedCourse.labs}
          />
        </div>
      );
    }
  }
}
export default AddCourse;
