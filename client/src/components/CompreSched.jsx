import React from "react";
const CompreSched = props => {
  return (
    <ol>
      {props.myCourses.map(myCourse => {
        let code = Object.keys(myCourse.course);
        return (
          <div>
            {!(myCourse.course[code].midsem === undefined) ? (
              <h5 key={code}>
                <div className="examElement" style={{ fontSize: "medium" }}>
                  <div className="courseItem">{code}</div>
                  <div className="courseItem">{myCourse.course[code].name}</div>
                  <div className="courseItem">
                    {myCourse.course[code].compre.date}
                  </div>
                  <div className="courseItem">
                    {myCourse.course[code].compre.time}
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

export default CompreSched;
