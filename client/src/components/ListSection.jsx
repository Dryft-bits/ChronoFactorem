import React from "react";

const ListSection = props => {
  return (
    <ul>
      {props.sections.map(section => {
        return (
          <option key={section.code} id={section.code} onClick={props.action}>
            {section.code} {section.teacher} {section.hours} {section.room}{" "}
            {section.days}
          </option>
        );
      })}
    </ul>
  );
};

export default ListSection;
