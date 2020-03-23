import React from "react";
import { Chart } from "react-charts";
import { searchHEL } from "../../utils/helData";
import Search from "../Search";
import ItemList from "../ItemList";
import * as TimeTableData from "../../Timetable.json";
class HELData extends React.Component {
  constructor(props) {
    super(props);
    let course = JSON.parse(JSON.stringify(TimeTableData)).default;
    this.state = {
      studentData: [],
      axes: [],
      courseData: [],
      humCourses: Object.keys(course)
        .filter(
          code =>
            code.startsWith("GS") ||
            code.startsWith("HSS") ||
            code.startsWith("BITS F214") ||
            code.startsWith("BITS F385") ||
            code.startsWith("BITS F399")
        )
        .reduce((res, key) => ((res[key] = course[key]), res), {})
    };
    this.HELstats.bind(this);
    this.filterItems.bind(this);
  }
  HELstats(e) {
  
    let et = e.target.innerHTML.toLowerCase();
    let event = et.split(" ");
    event = event[0]+" "+event[1];
    console.log(event);
    let finished = false;
    let result = [];
    //searchHEL async
    searchHEL(event).then((res,err) => {
      result = res;
      finished = true;
    })
    let intv = setInterval(function()
    {
      if(finished === true)
      {
        clearInterval(intv);
      }
    },100);
    console.log(result);
    if (result === []) return false;
    const a = {
      label: "Series 1",
      data: result
    };
  
    this.setState({
      courseData: et,
      studentData: result,
      studentData: a,
      axes: [
        { primary: true, type: "ordinal", position: "bottom" },
        { position: "left", type: "linear", stacked: false }
      ]
    });
    console.log("nice ");
    return true;

  }

  filterItems(input) {
    console.log(input.target.value);
    let courses = JSON.parse(JSON.stringify(TimeTableData)).default;
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
        .filter(
          code =>
            code.startsWith("GS") ||
            code.startsWith("HSS") ||
            code.startsWith("BITS F214") ||
            code.startsWith("BITS F385") ||
            code.startsWith("BITS F399")
        )
        .reduce((res, key) => ((res[key] = obj[key]), res), {});

    this.setState({ humCourses: filterCourses(courses) });
  }

  render() {
    const renderer = () => {
      let resp = "";
      let str = [
        /*
            <form className='form' onSubmit={e => {resp = this.HELstats(e)}}>
                <input type="text" placeholder="Get Stats" onChange={this.handleChange.bind(this)}/>
            </form>,
            */
        <>
          <Search action={this.filterItems.bind(this)} />
          <ItemList
            items={this.state.humCourses}
            action={e => {
              resp = this.HELstats(e);
            }}
          />
        </>
      ];
      if (resp == true) {
        console.log("Heldata " +resp);
        str.push([
          <Chart data={this.state.studentData} axes={this.state.axes} />
        ]);
      } else if (resp === false) {
        str.push([
          <div>
            <h2>No data available for this course!</h2>
          </div>
        ]);
      }
      return <>{str}</>;
    };
    return renderer();
  }
}
export default HELData;
