import React from "react";
const ListSection = props => {
  return (
    <ol className="courseWindow">
      {Object.keys(props.sections).map(section => {
        console.log(section);
        return (
          <h5 key={section} id={section} onClick={props.action}>
            <div className ="courseElement" style={{fontSize: "medium"}} id={section}>
              <div className = "courseItem">
                {section} 
              </div>
              <div className = "courseItem">
                {props.sections[section].instructors[0]}
              </div>
              <div className = "courseItem">
                {props.sections[section].sched[0].days}
              </div>
              <div className = "courseItem">
                {props.sections[section].sched[0].hours}
              </div>
              <div className = "courseItem">
                { props.sections[section].sched[0].room}
              </div>
            </div>
          </h5>
        );
      })}
    </ol>
  );
};

export default ListSection;
