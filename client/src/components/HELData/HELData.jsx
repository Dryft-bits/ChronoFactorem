import React, { useState } from "react";
import { Chart } from "react-charts";
import { searchHEL } from "../../utils/helData";
import Search from "../Search";
import ItemList from "../ItemList";
import * as TimeTableData from "../../Timetable.json";
import { useGetData } from "use-axios-react";
import axios from "axios";
const course = JSON.parse(JSON.stringify(TimeTableData)).default;

let axes = [];
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



const HELData = () => {
    
    const [studentData,setStudentData] = useState([]);
    let result = ""; 

    const HELstats = (e) => {
        let et = e.target.innerHTML.toLowerCase();
        let event = et.split(" ");
        event = event[0] + " " + event[1];
        console.log(event);
        let finished = false;
        
        
        try {
             axios.get("/api/helData/searchHEL", {
                params: {
                    "courseData": event
                }
            }
            ).then(res => {
                result = res.data.studentsInterestedInAllSlots;
            })
        }
        catch (err) {
            console.log("DB RETRIEVAL ERROR:", err);
        }
    
        console.log("in util "+result);
    
        console.log(result);
        if (result === []) return false;
        
        courseData = et;
        
        axes = [
                { primary: true, type: "ordinal", position: "bottom" },
                { position: "left", type: "linear", stacked: false }
            ]
        console.log("nice ");
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
    
    
    let resp = "";
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
                    setStudentData(a);
                }}
            />
        </>
    ];
    const [userInfo, loading] = useGetData("/api/heldata/searchHEL");
    console.log(loading);
    console.log(result);
    if (!loading) {
        if (resp == true) {
            console.log("Heldata " + resp);
            str.push([
                <Chart data={studentData} axes={axes} />
            ]);
        } else if (resp == "") {
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