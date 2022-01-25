import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearAll, saveTimeTable } from "../../redux/actions/UpdateTimeTable";
import * as TimeTableData from "../../Timetable.json";
import AddCourse from "./AddCourse.jsx";
import PreviewTT from "./PreviewTT.jsx";
import MidsemSched from "./MidsemSched.jsx";
import CompreSched from "./CompreSched.jsx";
import ExportPage from "./ExportPage.jsx";
import AlertBox from "../utils/AlertBox.jsx";
import AlertDialog from "../utils/AlertDialog.jsx";
import { openAlertDialog } from "../../redux/actions/dialogs";

const courses = JSON.parse(JSON.stringify(TimeTableData));

class CreateTimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
    };
    this.showView = this.showView.bind(this);
    this.CustomButton = this.CustomButton.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  showView(input) {
    let id = parseInt(input.target.id);
    this.setState({ view: id });
  }

  CustomButton(type, id) {
    return (
      <div
        className="toolbar-button waves-effect waves-light btn"
        id={id}
        onClick={this.showView}
      >
        {this.state.view === 0 ? type : "Back"}
      </div>
    );
  }

  onSave() {
    if (this.props.myCourses.length === 0) {
      this.props.openDialog(
        "Please Choose Some Courses before saving the timetable!",
        null,
        null
      );
      return;
    }
    if (!this.props.id) {
      this.props.openDialog(
        "Would You like to give this TimeTable a name?",
        "form",
        { success: "save", fail: "save" }
      );
    } else {
      this.props.openDialog(
        "Would You like to Save it as a new TimeTable?",
        "confirm",
        { success: "newName", fail: "updateName", todo: "updateId" }
      );
    }
  }

  render() {
    return (
      <>
        <AlertDialog />
        <AlertBox />
        {this.state.view === 0 ? (
          <>
            <div className="create-timetable-container">
              <div className="timetable-preview">
                
                <div className="create-timetable-toolbar">
                  {this.CustomButton("Preview", 1)}
                  {this.CustomButton("Midsem Schedule", 2)}
                  {this.CustomButton("Compre Schedule", 3)}
                  {this.CustomButton("Export PNG", 4)}
                  <button
                    className="waves-effect waves-light btn"
                    onClick={() => {
                      this.props.clearAll();
                    }}
                  >
                    Clear All Entries
                  </button>
                  <button
                    className="waves-effect waves-light btn"
                    onClick={this.onSave}
                  >
                    Save TimeTable
                  </button>
                </div>
                <br />
                <PreviewTT />
                <br />
              </div>

              <div className="courses-list">
                <AddCourse allCourses={courses.default} />
              </div>
            </div>
          </>
        ) : this.state.view === 1 ? (
          <>
            {this.CustomButton("Preview", 0)}
            <br />
            <br />
            <PreviewTT />
          </>
        ) : this.state.view === 2 ? (
          <>
            {this.CustomButton("Midsem Schedule", 0)}
            <br />
            <br />
            <MidsemSched />
          </>
        ) : this.state.view === 3 ? (
          <>
            {this.CustomButton("Compre Schedule", 0)}
            <br />
            <br />
            <CompreSched />
          </>
        ) : this.state.view === 4 ? (
          <>
            {this.CustomButton("Export As PNG", 0)}
            <br />
            <ExportPage />
          </>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.updateTT.id,
    myCourses: state.updateTT.myCourses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearAll: () => dispatch(clearAll()),
    save: () => dispatch(saveTimeTable()),
    openDialog: (msg, type, next) => dispatch(openAlertDialog(msg, type, next)),
  };
};

CreateTimeTable.propTypes = {
  id: PropTypes.string,
  myCourses: PropTypes.array,
  openDialog: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTimeTable);
