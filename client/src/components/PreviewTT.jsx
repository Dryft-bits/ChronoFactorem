import React,{Component} from React
import Timetable from 'react-timetable-events'

class PreviewTT extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            events:{
                monday:[],
                tuesday:[],
                wednesday:[],
                thursday:[],
                friday:[],
                saturday:[]
            }
        }
    }
    setEvent(event)
    {
        this.setState(event);
    }
    render()
    {
        return (
            <Timetable events = {this.state.events} />
        )
    }
}