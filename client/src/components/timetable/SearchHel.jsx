import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import ListCourse from "./ListCourse.jsx";
import * as TimeTableData from "../../Timetable.json";

const course = JSON.parse(JSON.stringify(TimeTableData)).default;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "pink" : "blue",
    padding: 20,
  }),
  control: (provided) => ({
    ...provided,
    height: "4vw",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

let selectedDay = null;
let selectedHour = null;

let humCourses = Object.keys(course)
  .filter(
    (code) =>
      code.startsWith("GS") ||
      code.startsWith("HSS") ||
      code.startsWith("BITS F214") ||
      code.startsWith("BITS F385") ||
      code.startsWith("BITS F399")
  )
  .reduce((res, key) => ((res[key] = course[key]), res), {});

let hours = [{ value: null, label: "None" }];
for (let i = 1; i <= 10; i++) {
  hours.push({ value: i, label: i.toString() });
}

let days = [
  { value: null, label: "None" },
  { value: "M", label: "M W F" },
  { value: "T", label: "T Th S" },
];

const SearchHel = (props) => {
  const [searchResults, setSearchResults] = React.useState({
    initial: humCourses,
    current: props.currentHels ? props.currentHels : humCourses,
  });
  const { initial, current } = searchResults;

  function filterItems() {
    let removeCourses = (obj) =>
      Object.keys(obj)
        .filter((item) => obj[item]["sections"]["L1"].sched.length)
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    let filterCourses = (obj) =>
      Object.keys(obj)
        .filter((item) =>
          selectedHour
            ? selectedDay
              ? selectedDay ===
                  obj[item]["sections"]["L1"]["sched"][0].days[0] &&
                selectedHour ===
                  obj[item]["sections"]["L1"]["sched"][0].hours[0]
              : selectedHour ===
                obj[item]["sections"]["L1"]["sched"][0].hours[0]
            : selectedDay
            ? selectedDay === obj[item]["sections"]["L1"]["sched"][0].days[0]
            : true
        )
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    let filteredlist = removeCourses(initial);
    let updatedlist = filterCourses(filteredlist);
    props.onSelect(updatedlist);
    setSearchResults({ ...searchResults, current: updatedlist });
  }

  return (
    <>
      <Select
        onChange={(input) => {
          selectedDay = input.value;
          filterItems();
        }}
        options={days}
        styles={customStyles}
        placeholder='Select Day'
      />
      <Select
        onChange={(input) => {
          selectedHour = input.value;
          filterItems();
        }}
        options={hours}
        styles={customStyles}
        placeholder='Select Hour'
      />
      <ListCourse courses={current} />
    </>
  );
};

SearchHel.propTypes = {
  currentHels: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
};

export default SearchHel;
