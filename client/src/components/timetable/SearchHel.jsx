import React from "react";
import Select from "react-select";
import ListCourse from "./ListCourse.jsx";
import * as TimeTableData from "../../Timetable.json";

const course = JSON.parse(JSON.stringify(TimeTableData)).default;
const hours = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];
const days = [
  { value: "M", label: "M W F" },
  { value: "T", label: "T Th S" },
];

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

const SearchHel = (props) => {
  const [searchResults, setSearchResults] = React.useState({
    initial: humCourses,
    current: humCourses,
    selectedDay: null,
    selectedHour: null,
  });
  const { initial, current, selectedDay, selectedHour } = searchResults;

  function filterItems(input) {
    console.log(input);
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
    let updatedlist = filterCourses(searchResults.initial);
    setSearchResults({ current: updatedlist });
  }
  return (
    <>
      <Select
        value={searchResults.selectedDay}
        onChange={filterItems}
        options={days}
      />
      <Select
        value={searchResults.selectedHour}
        onChange={filterItems}
        options={hours}
      />
      <ListCourse courses={searchResults.current} />
    </>
  );
};

export default SearchHel;
