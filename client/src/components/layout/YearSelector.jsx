import React, { Fragment, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import "../../styles/HelForm.css";

const YearSelector = props => {
  const [yearData, setYear] = useState({
    year: props.initialYear
  });

  const { year } = yearData;

  const handleYearChange = e => {
    if (e.target.checked) {
      props.onYearChange(e.target.value);
    }
    setYear({ ...yearData, year: e.target.value });
  };

  let yearList = [
    ["1", "First"],
    ["2", "Second"],
    ["3", "Third"],
    ["4", "Fourth"],
    ["5", "Fifth"]
  ];
  let str = [];
  yearList.map(Year => {
    str.push(
      <FormControlLabel
        value={Year[0]}
        control={<Radio color='primary' />}
        label={Year[1]}
        className='text-black'
        onChange={handleYearChange}
        checked={year === Year[0]}
      />
    );
    return 0;
  });
  return (
    <Fragment>
      <p className='label-mod branch-inp'>Select year: </p>
      <FormControl component='fieldset' className='radio-grp'>
        <RadioGroup
          row
          aria-label='position'
          name='position'
          defaultValue='End'
          className='radio-grp'
        >
          {str}
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default YearSelector;
