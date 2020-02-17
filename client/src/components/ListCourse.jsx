import React from "react";

const ListCourse = props => {
  return (
    <ul>
      {Object.keys(props.courses).map(course => {
        return (
          <option key={course} id={course} onClick={props.action}>
            {course} {props.courses[course]["name"]}
          </option>
        );
      })}
    </ul>
  );
};

export default ListCourse;
