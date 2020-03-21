import React from 'react'
import {Chart} from 'react-charts'
class HELData
{

    constructor(props)
    {
        super(props);
        this.state = 
        {
            searchData: true,
            showData: false,
            course = {}
        };
        this.HELstats.bind(this);
    }
    HELstats(courseData)
    {
        courseData = courseData.toLowerCase();
        const data = React.useMemo(
            
        );
    };

    render()
    {
        return(
            <>
            <div className="input-field">
                <input type="text" placeholder="Get Stats" onClick={this.courseData} />
            </div>
            </>
        )
    }
}
export default HELData