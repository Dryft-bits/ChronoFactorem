import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PropTypes from "prop-types";
import SearchHel from "./SearchHel.jsx";
import Search from "../utils/Search.jsx";
import ListCourse from "./ListCourse.jsx";

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

  render() {
    return (
      <>
        <Tabs defaultIndex={this.props.current === "all" ? 0 : 1}>
          <TabList>
            <Tab
              onClick={() => {
                this.props.onChangeTab("all");
              }}
            >
              Browse All Courses
            </Tab>
            <Tab
              onClick={() => {
                this.props.onChangeTab("hum");
              }}
            >
              Browse Humanity Electives
            </Tab>
          </TabList>

          <TabPanel>
            <Search action={this.filterItems} />
            <ListCourse courses={this.state.current} />
          </TabPanel>
          <TabPanel>
            <SearchHel
              currentHels={this.props.currentHels}
              onSelect={this.props.onSelectOption}
            />
          </TabPanel>
        </Tabs>
      </>
    );
  }
}

SearchTabs.propTypes = {
  allCourses: PropTypes.object.isRequired,
  current: PropTypes.string.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  currentHels: PropTypes.object,
  onSelectOption: PropTypes.func.isRequired,
};

export default SearchTabs;
