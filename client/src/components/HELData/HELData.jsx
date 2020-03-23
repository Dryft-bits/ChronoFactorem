import React from 'react'
import {connect} from 'react-redux'
import {Chart} from 'react-charts'
import { searchHEL } from '../../actions/helData';
import Search from '../Search';
class HELData extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = 
        {
            studentData: [],
            axes: [],
            courseData: [],
        };
        this.HELstats.bind(this);
        this.handleChange.bind(this);
    }
    handleChange(e)
    {
        this.setState({courseData: e.target.value.toLowerCase()});
        
    }
    HELstats(e)
    {
        e.preventDefault();
        this.setState({studentData: searchHEL(this.state.courseData)});
        //console.log(e);
        if(this.state.studentData === [])
            return false;
        const a =
              {
                label: 'Series 1',
                data: this.state.studentData
              }
          ;
        this.setState({studentData: a});
        this.setState({axes: 
            [
              { primary: true, type: 'ordinal', position: 'bottom' },
              { position: 'left', type: 'linear', stacked: false }
            ]
          });

        
        return true;
    };

    render()
    {
        const renderer = () => {
            let resp = "";
            let str =
            [
            <form className='form' onSubmit={e => {resp = this.HELstats(e)}}>
                <input type="text" placeholder="Get Stats" onChange={this.handleChange.bind(this)}/>
            </form>,
            ];
            if(resp == true)
            {
                str.push([
                    <Chart data={this.state.studentData} axes={this.state.axes}/>
                ]);
            }
            else if(resp === false)
            {
                str.push([
                    <div>
                        <h2>No data available for this course!</h2>
                    </div>
                ]);
            }
            return <>{str}</>;
        };
        return(renderer());
    }
}
export default connect(null,null)(HELData);