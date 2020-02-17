import React from "react";

const ListSection = props => {
  return (
    <ul>
      {Object.keys(props.sections).map(section => {
        return (
          <option key={section} id={section} onClick={props.action}>
            {section} {props.sections[section].instructors}{" "}
          </option>
        );
      })}
    </ul>
  );
};

export default ListSection;
