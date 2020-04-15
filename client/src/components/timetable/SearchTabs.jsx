import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchHel from "./SearchHel.jsx";
import Search from "../Search.jsx";
import ListCourse from "./ListCourse.jsx";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class SearchTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: this.props.allCourses,
      current: this.props.allCourses,
    };
    this.filterItems = this.filterItems.bind(this);
  }

  filterItems(input) {
    let filterCourses = (obj) =>
      Object.keys(obj)
        .filter(
          (item) =>
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

  componentDidMount() {
    M.Tabs.init(this.Tabs);
  }

  render() {
    return (
      <>
        <div className='col s12'>
          <ul
            ref={(Tabs) => {
              this.Tabs = Tabs;
            }}
            className='tabs'
          >
            <li className='tab col s6'>
              <a href='#SearchAll'>Browse All Courses</a>
            </li>
            <li className='tab col s6'>
              <a href='#SearchHel'>Browse Humanities</a>
            </li>
          </ul>
        </div>
        <div id='SearchAll' className='col s12'>
          <Search action={this.filterItems} />
          <ListCourse courses={this.state.current} />
        </div>
        <div id='SearchHel' className='col s12'>
          <SearchHel />
        </div>
      </>
    );
  }
}

export default SearchTabs;
