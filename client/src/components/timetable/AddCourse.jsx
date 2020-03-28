import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearCurrentCourse } from "../../actions/UpdateCurrentCourse";
import Search from "../Search";
import ListCourse from "./ListCourse";
import SectionTabs from "./SectionTab";
import ToggleButton from "../ToggleButton";

class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: this.props.allCourses,
      current: this.props.allCourses
    };
    this.filterItems = this.filterItems.bind(this);
    this.getSections = this.getSections.bind(this);
    this.clearCourse = this.clearCourse.bind(this);
  }

  filterItems(input) {
    let filterCourses = obj =>
      Object.keys(obj)
        .filter(
          item =>
            item.toLowerCase().search(input.target.value.toLowerCase()) !==
              -1 ||
            obj[item]["name"]
              .toLowerCase()
              .search(input.target.value.toLowerCase()) !== -1
        )
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    let updatedlist = filterCourses(this.state.initial);
    this.setState({ current: updatedlist });
  }

  getSections(type) {
    let course = this.props.currentCourse;
    let code = Object.keys(course)[0];
    let selectSections = obj =>
      Object.keys(obj)
        .filter(item => item.charAt(0) === type)
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    return selectSections(this.props.currentCourse[code].sections);
  }

  clearCourse() {
    this.props.clearCurrentCourse();
    this.setState({ current: this.state.initial });
  }

  render() {
    return (
      <div>
        {!this.props.currentCourse ? (
          <div>
            <Search action={this.filterItems} />
            <ListCourse courses={this.state.current} />
          </div>
        ) : (
          <div>
            <h3>{Object.keys(this.props.currentCourse)}</h3>
            <ToggleButton action={this.clearCourse} title="Change Course" />
            <SectionTabs getSections={this.getSections} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentCourse: state.updateCC.currentCourse
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCurrentCourse: () => dispatch(clearCurrentCourse())
  };
};

AddCourse.propTypes = {
  allCourses: PropTypes.object.isRequired,
  clearCurrentCourse: PropTypes.func.isRequired,
  currentCourse: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
