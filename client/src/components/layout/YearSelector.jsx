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
          <FormControlLabel
            value='1'
            control={<Radio color='primary' />}
            label='First'
            className='text-black'
            onChange={handleYearChange}
            checked={year === "1"}
          />
          <FormControlLabel
            value='2'
            control={<Radio color='primary' />}
            label='Second'
            className='text-black'
            onChange={handleYearChange}
            checked={year === "2"}
          />
          <FormControlLabel
            value='3'
            control={<Radio color='primary' />}
            label='Third'
            className='text-black'
            onChange={handleYearChange}
            checked={year === "3"}
          />
          <FormControlLabel
            value='4'
            control={<Radio color='primary' />}
            label='Fourth'
            className='text-black'
            onChange={handleYearChange}
            checked={year === "4"}
          />
          <FormControlLabel
            value='5'
            control={<Radio color='primary' />}
            label='Fifth'
            className='text-black'
            onChange={handleYearChange}
            checked={year === "5"}
          />
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default YearSelector;
