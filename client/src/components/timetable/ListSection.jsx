import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSection } from "../../actions/UpdateTimeTable";

const ListSection = props => {
  return (
    <ol className="courseWindow">
      {Object.keys(props.sections).map(section => {
        return (
          <div>
            {props.sections[section].sched.length ? (
              <h5
                key={section}
                id={section}
                onClick={() => {
                  props.addSection(section);
                }}
              >
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

const mapDispatchToProps = dispatch => {
  return {
    addSection: section => dispatch(addSection(section))
  };
};

ListSection.propTypes = {
  sections: PropTypes.object.isRequired,
  addSection: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(ListSection);
