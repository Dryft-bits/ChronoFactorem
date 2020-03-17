import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAll } from "../../actions/UpdateTimeTable";
import * as TimeTableData from "../../Timetable.json";
import AddCourse from "./AddCourse.jsx";
import PreviewTT from "./PreviewTT.jsx";
import MidsemSched from "./MidsemSched.jsx";
import CompreSched from "./CompreSched.jsx";

const courses = JSON.parse(JSON.stringify(TimeTableData));

class CreateTimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0
    };
    this.showView = this.showView.bind(this);
    this.CustomButton = this.CustomButton.bind(this);
  }

  showView(input) {
    let id = parseInt(input.target.id);
    this.setState({ view: id });
  }

  CustomButton(type, id) {
    return (
      <button
        className="waves-effect waves-light btn"
        id={id}
        onClick={this.showView}
      >
        {this.state.view === 0 ? type : "Back"}
      </button>
    );
  }

  render() {
    return (
      <>
        {this.state.view === 0 ? (
          <>
            {this.CustomButton("Preview", 1)}
            {this.CustomButton("Midsem Schedule", 2)}
            {this.CustomButton("Compre Schedule", 3)}
            <button
              className="waves-effect waves-light btn"
              onClick={() => {
                this.props.clearAll();
              }}
            >
              Clear All Entries
            </button>
            <div>
              <div style={{ float: "right", width: "35vw" }}>
                <AddCourse allCourses={courses.default} />
              </div>
              <div style={{ float: "left", width: "60vw" }}>
                <PreviewTT style={{ float: "left" }} />
              </div>
            </div>
          </>
        ) : this.state.view === 1 ? (
          <>
            {this.CustomButton("Preview", 0)}
            <PreviewTT />
          </>
        ) : this.state.view === 2 ? (
          <>
            {this.CustomButton("Midsem Schedule", 0)}
            <MidsemSched />
          </>
        ) : this.state.view === 3 ? (
          <>
            {this.CustomButton("Compre Schedule", 0)}
            <CompreSched />
          </>
        ) : null}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearAll: () => dispatch(clearAll())
  };
};

export default connect(null, mapDispatchToProps)(CreateTimeTable);
