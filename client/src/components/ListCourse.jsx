import React from "react";

const ListCourse = props => {
  return (
    <ul>
      {props.courses.map(course => {
        return (
          <option key={course.code} id={course.code} onClick={props.action}>
            {course.code} {course.name}
          </option>
        );
      })}
    </ul>
  );
};

export default ListCourse;
