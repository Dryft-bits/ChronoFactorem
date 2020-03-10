import React from "react";

const ListSection = props => {
  return (
    <ol className="courseWindow">
      {Object.keys(props.sections).map(section => {
        return (
          <div>
            {props.sections[section].sched.length ? (
              <h5 key={section} id={section} onClick={props.action}>
                <div
                  className="courseElement"
                  style={{ fontSize: "medium" }}
                  id={section}
                >
                  <div className="courseItem">{section}</div>
                  <div className="courseItem">
                    {props.sections[section].instructors[0]}
                  </div>
                  {props.sections[section].sched.map(item => {
                    return (
                      <>
                        <div className="courseItem">{item.days}</div>
                        <div className="courseItem">{item.hours}</div>
                      </>
                    );
                  })}
                  <div className="courseItem">
                    {props.sections[section].sched[0].room}
                  </div>
                </div>
              </h5>
            ) : null}
          </div>
        );
      })}
    </ol>
  );
};

export default ListSection;
