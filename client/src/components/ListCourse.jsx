import React, { Component } from "react";

class ListCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ul>
        {this.props.courses.map(function(course) {
          return (
            <li key={course.code}>
              {course.code} {course.name}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ListCourse;
