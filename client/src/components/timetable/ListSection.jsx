import React from "react";

const ListSection = props => {
  return (
    <ul>
      {Object.keys(props.sections).map(section => {
        return (
          <option key={section} id={section} onClick={props.action}>
            {section} {props.sections[section].instructors}{" "}
            {props.sections[section].sched[0].days}
            {props.sections[section].sched[0].hours}
            {props.sections[section].sched[0].room}
          </option>
        );
      })}
    </ul>
  );
};

export default ListSection;
