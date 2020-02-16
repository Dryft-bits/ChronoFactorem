import { Component } from "react";
import React from "react";
import "../styles/Timetable.css";
class Timetable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [
                {
                    Name: "DBMS",
                    ID: "CS F212",
                    Days: "Monday Wednesday Friday",
                    Hours: "5",
                    Section: "L1"
                },
                {
                    Name: "MicroProcessors",
                    ID: "CS F241",
                    Days: "Monday Wednesday Friday",
                    Hours: "4",
                    Section: "L1"
                },
                {
                    Name: "Software Engineering",
                    ID: "IS F341",
                    Days: "Monday Wednesday Friday",
                    Hours: "7",
                    Section: "L1"
                },
                {
                    Name: "EVS",
                    ID: "BITS F225",
                    Days: "Tuesday Thursday Saturday",
                    Hours: "2",
                    Section: "L1"
                },
                {
                    Name: "Post Colonial Literature",
                    ID: "HSS F340",
                    Days: "Tuesday Thursday Saturday",
                    Hours: "3",
                    Section: "L1"
                },
                {
                    Name: "MicroProcessors",
                    ID: "CS F241",
                    Days: "Tuesday",
                    Hours: "1",
                    Section: "T11"
                },
                {
                    Name: "DSA",
                    ID: "CS F211",
                    Days: "Thursday",
                    Hours: "1",
                    Section: "T3"
                },

                {
                    Name: "DSA",
                    ID: "CS F211",
                    Days: "Tuesday Thursday Saturday",
                    Hours: "5 6 7 8",
                    Section: "L1"
                },

            ]
        }
        this.populateTimetable.bind(this);
        this.gridArray = this.populateTimetable(this.state.courses);
    }
    populateTimetable(coursesAdded) {
        var gridList = [
            ["Time", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            ["Monday", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ["Friday", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ["Saturday", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        let Map = {};
        Map['Monday'] = 1;
        Map['Tuesday'] = 2;
        Map['Wednesday'] = 3;
        Map['Thursday'] = 4;
        Map['Friday'] = 5;
        Map['Saturday'] = 6;

        //let each course have a day list, and a hours list, both space separated strings
        for (let course of coursesAdded) {

            let listOfDays = Array.from(course.Days.split(' '));
            let listOfHours = (Array.from(course.Hours.split(' ')));
            for (let i = 0; i < listOfHours.length; i++) {
                listOfHours[i] = parseInt(listOfHours[i]);
            }
            for (let i of listOfDays) {
                let divStyle = {};
                if (listOfHours.length > 1) {
                    divStyle = {
                        gridRowStart: `${listOfHours[0] + 1}`,
                        gridColumnStart: `${Map[i] + 1}`,
                        gridCoulmnEnd: `${Map[i] + 2}`,
                        gridRowEnd: `span ${listOfHours[listOfHours.length - 1] - listOfHours[0] + 1}`
                    }
                }
                let str =
                <div className="gridItem" style={divStyle}>
                    {course.ID}<br/>
                    {course.Section}<br/>
                </div>


                gridList[Map[i]][listOfHours[0]] = str;
                for (let j = listOfHours[0] + 1; j < listOfHours[0] + listOfHours.length; j++) {
                    gridList[Map[i]][j] = -1;
                }
            }
        }

        for (let i = 0; i <= 6; i++)
            for (let j = 0; j <= 10; j++) {
                if (gridList[i][j] === 0) {
                    gridList[i][j] =

                        <div style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {' '}<br></br>
                            {' '}<br></br>
                            {' '}<br></br>
                        </div>

                }
                else if (j === 0 || i === 0) {
                    gridList[i][j] =

                        <div style={{
                            backgroundColor: "rgba(252, 92, 101,1.0)",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color:'rgba(0, 0, 0, 0.8)',
                            'font-size':'18px',
                            'font-weight': '600'
                        }}>
                            {gridList[i][j]}
                        </div>

                }
            }


        return gridList;
    }
    render() {
        let divsToRender = [];
        for (let i = 0; i <= 10; i++) {
            for (let j = 0; j <= 6; j++) {
                if (this.gridArray[j][i] !== -1) {
                    divsToRender.push(
                        <>
                            {this.gridArray[j][i]}
                        </>
                    );
                }
            }
        }
        return (
            <div className="gridElement" >
                {divsToRender}
            </div>
        );
    }
}
export default Timetable;