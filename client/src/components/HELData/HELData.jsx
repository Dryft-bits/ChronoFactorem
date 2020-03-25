import React from "react";
import * as V from 'victory';
import { VictoryBar } from 'victory';

//import { searchHEL } from "../../utils/helData";
import Search from "../Search";
import ItemList from "../ItemList";
import * as TimeTableData from "../../Timetable.json";
import { useGetData } from "use-axios-react";
import axios from "axios";
const course = JSON.parse(JSON.stringify(TimeTableData)).default;

let axes = [
    { primary: true, type: "ordinal", position: "bottom" },
    { primary: false, position: "left", type: "linear", stacked: false }
];
let courseData = [];
let humCourses = Object.keys(course)
    .filter(
        code =>
            code.startsWith("GS") ||
            code.startsWith("HSS") ||
            code.startsWith("BITS F214") ||
            code.startsWith("BITS F385") ||
            code.startsWith("BITS F399")
    )
    .reduce((res, key) => ((res[key] = course[key]), res), {});

const Chartfunc = (cS, ax) => {
    console.log(ax);
    if (cS !== undefined) {
        return <>
            <VictoryBar data={courseData} />
        </>;
    }
    else {
        return <></>;
    }
}

const HELData = () => {

    const [studentData, setStudentData] = React.useState({
        courseStats: []
    });
    const { courseStats } = studentData;
    let result = "";

    const HELstats = (e) => {
        e.preventDefault();
        let et = e.target.innerHTML.toLowerCase();
        let event = et.split(" ");
        event = event[0] + " " + event[1];
        //console.log(event);

        try {
            axios
                .get("/api/helData/searchHEL", {
                    params: {
                        courseData: event
                    }
                })
                .then(res => {
                    // console.log("here");
                    resp = true;
                    result = res.data.studentsInterestedInAllSlots;
                    // console.log(result);
                    let newCSarray = [];
                    if (result) {
                        for (let i = 0; i < 8; i++) {
                            newCSarray.push({ x: i, y: result[i] });
                        }
                    }
                    setStudentData({ ...studentData, courseStats: newCSarray });
                });
        }
        catch (err) {
            console.log("DB RETRIEVAL ERROR:", err);
        }

        console.log("in util " + courseStats);

        // console.log(result);
        if (courseStats.length === 0) return false;

        courseData = et;



        // console.log("nice ");
        return true;
    }

    function filterItems(input) {
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

        humCourses = filterCourses(courses);
    }


    let resp = true;
    let str = [
        /*
            <form className='form' onSubmit={e => {resp = this.HELstats(e)}}>
                <input type="text" placeholder="Get Stats" onChange={this.handleChange.bind(this)}/>
            </form>,
            */
        <>
            <Search action={filterItems} />
            <ItemList
                items={humCourses}
                action={e => {
                    HELstats(e);
                    const a = {
                        label: "Series 1",
                        data: result
                    };
                    //setStudentData(a);
                }}
            />
        </>
    ];
    const [userInfo, loading] = useGetData("/api/heldata/searchHEL");


    let columnChart = <VictoryBar data={courseStats} />;

    if (!loading) {
        if (resp === true && courseStats.length > 0) {
            console.log("Heldata " + resp);
            str.push([
                <>
                    {columnChart}
                </>
            ]);
        } else if (resp === false) {
            str.push([
                <div>
                    <h2>No data available for this course!</h2>
                </div>
            ]);
        }
    }
    else {
        str.push([
            <h2>LOADING....</h2>
        ]);
    }
    //console.log("ohshit");
    return <>{str}</>;
};
export default HELData;