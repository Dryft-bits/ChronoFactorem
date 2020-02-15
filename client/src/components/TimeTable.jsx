import { Component } from "react";
import React from "react";
import "../styles/Timetable.css";
class Timetable extends Component{
   //props needed: Specialized timetable for BITSIANS
   /*
        courses:
            code, name
        to render: CourseName, id, @hours, room
   */
  //States: 0
    constructor(props)
    {
        super(props);
        this.state = {
            courses: [
                
                {
                    Name: "DBMS",
                    ID: "CS F212",
                    Days: "Monday Wednesday Friday",
                    Hours:"5",
                    Section: "L1"
                },
                {
                    Name: "MicroProcessors",
                    ID: "CS F241",
                    Days: "Monday Wednesday Friday",
                    Hours:"4",
                    Section: "L1"
                },
                {
                    Name: "Software Engineering",
                    ID: "IS F341",
                    Days: "Monday Wednesday Friday",
                    Hours:"7",
                    Section: "L1"
                },
                {
                    Name: "EVS",
                    ID: "BITS F225",
                    Days: "Tuesday Thursday Saturday",
                    Hours:"2",
                    Section: "L1"
                },
                {
                    Name: "Post Colonial Literature",
                    ID: "HSS F340",
                    Days: "Tuesday Thursday Saturday",
                    Hours:"3",
                    Section: "L1"
                },
                {
                    Name: "MicroProcessors",
                    ID: "CS F241",
                    Days: "Tuesday",
                    Hours:"1",
                    Section: "T11"
                },
                {
                    Name: "DSA",
                    ID: "CS F211",
                    Days: "Thursday",
                    Hours:"1",
                    Section: "T3"
                },
                
                {
                    Name: "DSA",
                    ID: "CS F211",
                    Days: "Tuesday Thursday Saturday",
                    Hours:"5 6 7 8",
                    Section: "L1"
                },
                
            ]
        }
        this.populateTimetable.bind(this);
        this.gridArray = this.populateTimetable(this.state.courses); 
    }
    populateTimetable(coursesAdded)
    {
        var gridList = [
            ["Time",1,2,3,4,5,6,7,8,9,10],
            ["Monday",0,0,0,0,0,0,0,0,0,0],
            ["Tuesday",0,0,0,0,0,0,0,0,0,0],
            ["Wednesday",0,0,0,0,0,0,0,0,0,0],
            ["Thursday",0,0,0,0,0,0,0,0,0,0],
            ["Friday",0,0,0,0,0,0,0,0,0,0],
            ["Saturday",0,0,0,0,0,0,0,0,0,0]
        ];
        /*
        var to_not_render = [
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0]
        ];
        */
        var Map = {};
        Map['Monday'] = 0;
         Map[0] = 'Monday';
        Map['Tuesday'] = 1;
         Map[1] = 'Tuesday';
         Map['Wednesday'] = 2;
         Map[2] = 'Wednesday';
        Map['Thursday'] = 3;
         Map[3] = 'Thursday';
         Map['Friday'] = 4;
         Map[4] = 'Friday';
        Map['Saturday'] = 5;
         Map[5] = 'Saturday';
            
            //let each course have a day list, and a hours list, both space separated strings
            for(var course of coursesAdded)
            {    
                
                var listOfDays = Array.from(course.Days.split(' '));
                var listOfHours = (Array.from(course.Hours.split(' ')));
                for(var i = 0; i< listOfHours.length; i++)
                {
                    listOfHours[i] = +listOfHours[i];
                }
                //.forEach((elt)=> {return parseInt(elt);});
                var renderFlag;
                for(i of listOfDays)
                {
                    var divStyle = {};
                    renderFlag = 0;
                    if(listOfHours.length > 1)
                    { 
                        renderFlag = 1;
                         divStyle = {
                           
                           gridRowStart: `${listOfHours[0]+1}`,
                           gridColumnStart: `${Map[i]+1+1}`,
                           gridCoulmnEnd: `${Map[i]+1+2}`,
                           gridRowEnd: `span ${listOfHours[listOfHours.length-1]-listOfHours[0]+1}`
                        }
                    }
                    else
                    {
                        divStyle = {
                           
                           };  
                    }
                    let str = <>
                                <div className="gridItem" style={divStyle}>
                                    {course.Name}<br></br>
                                    {course.ID}<br></br>
                                    {course.Section}<br></br>
                                </div>
                            </>;
                    
                        gridList[Map[i]+1][listOfHours[0]] = str;
                        if(renderFlag)
                        {
                            for(var j = listOfHours[0]+1 ; j < listOfHours[0]+listOfHours.length;j++)
                            {
                                gridList[Map[i]+1][j] = -1;
                            }
                        }
                   // renderFlag = 1;
                    
                }
            }

            for(i = 0; i<=6; i++)
                for(j =0 ; j<= 10; j++)
                {
                    if(gridList[i][j] === 0)
                    {
                        gridList[i][j] =
                         <>
                        <div style={{backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'}}>
                            {' '}<br></br>
                            {' '}<br></br>
                            {' '}<br></br>
                        </div>
                        </>;  
                    }
                    else if(j === 0 || i === 0)
                    {
                        gridList[i][j] = 
                        <>
                        <div style={{backgroundColor: "#d6afc7",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'}}>
                            {gridList[i][j]}
                        </div>
                        </>;
                    }
                }
            
            
            return gridList;
    }
    render()
    {
       var divsToRender = [];
       for(var i = 0; i<= 10;i++)
       {
           for(var j = 0; j<=6; j++)
           {
               if(this.gridArray[j][i] === -1);
               else{
               divsToRender.push(
                   <>
                        {this.gridArray[j][i]}
                    </>
                    );
               }
            }
        }
        return (
            <div className = "gridElement" >
                {divsToRender}
            </div>
        );
    }
}
export default Timetable;