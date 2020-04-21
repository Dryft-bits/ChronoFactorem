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
        className='waves-effect waves-light btn'
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
        {this.props.loading ? <h2>Loading...</h2> : null}
        {this.state.view === 0 ? (
          <>
            {this.CustomButton("Preview", 1)}
            {this.CustomButton("Midsem Schedule", 2)}
            {this.CustomButton("Compre Schedule", 3)}
            {this.CustomButton("Export As PNG", 4)}
            <button
              className='waves-effect waves-light btn'
              onClick={() => {
                this.props.clearAll();
              }}
            >
              Clear All Entries
            </button>
            <button
              className='waves-effect waves-light btn'
              onClick={() => {
                this.props.save();
              }}
            >
              Save TimeTable
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
        ) : this.state.view === 4 ? (
          <>
            {this.CustomButton("Export As PNG", 0)}
            <ExportPage />
          </>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.updateTT.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearAll: () => dispatch(clearAll()),
    save: () => dispatch(saveTimeTable())
  };
};

CreateTimeTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  clearAll: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTimeTable);
