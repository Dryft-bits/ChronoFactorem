import { Component } from "react";
import React from "react";
import "../styles/Timetable.css";

const ntw=require("number-to-words");
class PreviewTT extends Component{
    constructor(props)
    {
        super(props);  
        //console.log(this.props.TimeTable);
        this.populateTimetable.bind(this);
        this.gridArray = []; 
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
       
        var Map = {};
         Map['M'] =1;
         //Map[1] = 'Monday';
         Map['T'] = 2;
         //Map[2] = 'Tuesday';
         Map['W'] = 3;
         //Map[3] = 'Wednesday';
         Map['Th'] = 4;
         //Map[4] = 'Thursday';
         Map['F'] = 5;
         //Map[5] = 'Friday';
         Map['S'] = 6;
         //Map[6] = 'Saturday';
            
            //let each course have a day list, and a hours list, both space separated strings
            /*
            for(var course of coursesAdded)
            {    
                
                var listOfDays = this.props.TimeTable;
                
                var listOfHours = (Array.from(course.Hours.split(' ')));
                for(var i = 0; i< listOfHours.length; i++)
                {
                    listOfHours[i] = +listOfHours[i];
                }
                
               
               
                for(let i of listOfDays)
                {
                   
                    
                    for(let j of i)
                    {
                        counter++;
                        if(j !== null)
                        {
                            listOfHours.push(counter);
                        }
                    }
                    if(listOfHours.length > 1)
                    {
                         divStyle = {
                           gridRowStart: `${listOfHours[0]+1}`,
                           gridColumnStart: `${Map[i]+1}`,
                           gridCoulmnEnd: `${Map[i]+2}`,
                           gridRowEnd: `span ${listOfHours[listOfHours.length-1]-listOfHours[0]+1}`
                        }
                    }
                    let str = <>
                                <div className="gridItem" style={divStyle}>
                                    {course.Name}<br></br>
                                    {course.ID}<br></br>
                                    {course.Section}<br></br>
                                </div>
                            </>;
                    
                   
                    //gridList[][listOfHours[0]] = str;
                    
                    for(var j = listOfHours[0]+1 ; j < listOfHours[0]+listOfHours.length;j++)
                    {
                        gridList[Map[i]][j] = -1;
                    }
                    

                }
                */
               let divStyle = {};
               //let listOfHours = [];
               //let counter = 0;
                var days=['M','T','W','Th','F','S'];
                var hours= [1,2,3,4,5,6,7,8,9,10];
                var day,hour;
                for(day of days){
                    for(hour of hours){
                        var section=this.props.TimeTable[day][ntw.toWords(hour)];
                        console.log(section);
                        let str = "";
                        if(!section.courseCode)
                        {
                           str = <div style={{
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                                }}>
                                {' '}<br></br>
                                {' '}<br></br>
                                {' '}<br></br>
                            </div>
                        }
                        else
                        {
                        str =
                        <div className="gridItem" style={divStyle}>
                            {section.courseName[0]}<br></br>
                            {section.courseCode}<br></br>
                            {section.sectionRoom}<br></br>
                        </div>;
                        }
                    
                        gridList[Map[day]][hour] = str;
                    }
                }
                for(let i = 0; i <=6; i++)
                    for(let j = 0; j <=10;j++)
                    {
                     if(j === 0 || i === 0)
                     {
                        gridList[i][j] = 
                        <>
                            <div style={{
                                        backgroundColor: "#d6afc7",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                }}>
                                {gridList[i][j]}
                            </div>
                        </>;
                        }
                    }

            /*
            for(let i = 0; i<=6; i++)
                for(let j =0 ; j<= 10; j++)
                {
                    if(gridList[i][j] === 0)
                    {
                        gridList[i][j] =
                         <>
                            <div style={{
                                        backgroundColor: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                        }}>
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
                            <div style={{
                                        backgroundColor: "#d6afc7",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                }}>
                                {gridList[i][j]}
                            </div>
                        </>;
                    }
                }
            
            */
            return gridList;
    }
    render()
    {
       console.log(this.props.TimeTable);
       this.gridArray = this.populateTimetable();
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
        console.log(divsToRender);
        return (
            <div className = "gridElement" >
                {divsToRender}
            </div>
        );
    }
}
export default PreviewTT;