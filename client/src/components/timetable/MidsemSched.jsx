import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const MidsemSched = props => {
  return (
    <ol>
      {props.myCourses.map(myCourse => {
        let code = Object.keys(myCourse.course);
        return (
          <div>
            {!(myCourse.course[code].midsem === undefined) ? (
              <h5 key={code}>
                <div className='examElement' style={{ fontSize: "medium" }}>
                  <div className='courseItem'>{code}</div>
                  <div className='courseItem'>{myCourse.course[code].name}</div>
                  <div className='courseItem'>
                    {myCourse.course[code].midsem.date}
                  </div>
                  <div className='courseItem'>
                    {myCourse.course[code].midsem.time}
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

const mapStateToProps = state => {
  return {
    myCourses: state.updateTT.myCourses
  };
};

MidsemSched.propTypes = {
  myCourses: PropTypes.arrayOf(PropTypes.Object).isRequired
};

export default connect(mapStateToProps, null)(MidsemSched);
