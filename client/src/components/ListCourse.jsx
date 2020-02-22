import React from "react";
const ListCourse = props => {
  return (
    <ul className="courseSearch">
      {Object.keys(props.courses).map(course => {
        return (
          <div key={course} id={course} onClick={props.action}>
            {course} {props.courses[course]["name"]}
          </div>
        );
      })}
    </ul>
  );
};

export default ListCourse;
