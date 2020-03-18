import React from "react";
import { connect } from "react-redux";
import { updateCurrentCourse } from "../../actions/UpdateCurrentCourse";

const ListCourse = props => {
  return (
    <ul className='courseSearch'>
      {Object.keys(props.courses).map(course => {
        return (
          <div
            className='searchItem'
            key={course}
            id={course}
            onClick={() => {
              props.addCourse(course, props.courses);
            }}
          >
            {course} {props.courses[course]["name"]}
          </div>
        );
      })}
    </ul>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addCourse: (course, currentCourses) =>
      dispatch(updateCurrentCourse(course, currentCourses))
  };
};

export default connect(null, mapDispatchToProps)(ListCourse);
