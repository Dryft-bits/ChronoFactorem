import React,{Component} from "react"
import Timetable from 'react-timetable-events'

class PreviewTT extends Component
{
    constructor(props)
    {
        numEventsPerWeek = [0,0,0,0,0,0];
        super(props);
        this.state = {
            hoursInterval: [8,18],
            events:{
                monday:[],
                tuesday:[],
                wednesday:[],
                thursday:[],
                friday:[],
                saturday:[]
            },
        }
        
    }
    setEvent(event)
    {
        this.setState(event);
    }
    translateHoursToTime(hours) {
        let str = hours.split();
        str.forEach(element => parseInt(element));
        return str;
    }
    render()
    {
        return (
            <Timetable events = {this.state.events} hoursInterval = {this.state.hoursInterval} />
        )
    }
}
export default PreviewTT;